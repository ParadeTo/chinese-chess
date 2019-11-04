package minimax

import (
	"chinese-chess/server/ai/minimax/eval"
	"chinese-chess/server/chess"
	"chinese-chess/server/shared"
	"chinese-chess/server/worker"
	"fmt"
	"math"
	"time"
)

type Move struct {
	From [2]int `json:"from"`
	To   [2]int `json:"to"`
}

type BestMove struct {
	move  Move
	value int
}

type BestMoveWorker struct {
	board         *chess.Board
	piecesMoves   []chess.PieceMoves
	resultChannel chan BestMove
	search        func(board *chess.Board) int
}

func (bmw *BestMoveWorker) Task() {
	bestMove := BestMove{
		move:  Move{},
		value: -shared.INFINITE,
	}

	for _, pieceNodes := range bmw.piecesMoves {
		x := pieceNodes.From[0]
		y := pieceNodes.From[1]
		nodes := pieceNodes.Nodes
		piece := bmw.board.Cells[x][y]
		for _, node := range nodes {
			bmw.board.UpdatePiece(piece, node.To)
			value := bmw.search(bmw.board)
			bmw.board.BackMoves(1)
			if value > bestMove.value {
				bestMove.value = value
				bestMove.move.From = piece.Pos
				bestMove.move.To = node.To
			}
		}
	}

	bmw.resultChannel <- bestMove
}

type MiniMax struct {
	depth     int
	evalModel eval.IEvalModel
	cutOff    bool
}

const workerNum = 1

func getColor(isMax bool, color chess.Color) chess.Color {
	if isMax {
		return color
	} else {
		if color == chess.Red {
			return chess.Black
		} else {
			return chess.Red
		}
	}
}

func (miniMax *MiniMax) search(board *chess.Board, color chess.Color, depth int, isMax bool, alpha int, beta int) int {
	if depth == 0 || board.IsFinish() {
		return miniMax.evalModel.Eval(board, color)
	}

	piecesNodes := board.GenerateMoves(getColor(isMax, color))

	len := len(piecesNodes)
	n := int(math.Floor(float64(len) / float64(workerNum)))
	remainder := len - workerNum*n

	valueChannel := make(chan int)
	lastEnd := 0
	for i := 0; i < workerNum; i++ {
		start := lastEnd
		if start > len-1 {
			break
		}
		offset := n
		if remainder > 0 {
			offset += 1
		}
		subArr := piecesNodes[start : start+offset]
		lastEnd = start + offset
		go func(subPiecesNodes []chess.PieceMoves, board *chess.Board) {
			var value int
			if isMax {
				value = -shared.INFINITE
			} else {
				value = shared.INFINITE
			}
			isBreak := false
			for _, pieceNodes := range subPiecesNodes {
				x := pieceNodes.From[0]
				y := pieceNodes.From[1]
				nodes := pieceNodes.Nodes
				piece := board.Cells[x][y]
				for _, node := range nodes {
					board.UpdatePiece(piece, node.To)
					_value := miniMax.search(board.Clone(), color, depth-1, !isMax, alpha, beta)
					board.BackMoves(1)
					if isMax {
						value = shared.Max(value, _value)
						if miniMax.cutOff {
							alpha = shared.Max(alpha, value)
							if alpha >= beta {
								valueChannel <- alpha
								isBreak = true
								break
							}
						}
					} else {
						value = shared.Min(value, _value)
						if miniMax.cutOff {
							beta = shared.Min(beta, value)
							if alpha >= beta {
								valueChannel <- beta
								isBreak = true
								break
							}
						}
					}
					if isBreak {
						break
					}
				}
			}
			valueChannel <- value
		}(subArr, board.Clone())
	}

	var reducedValue int
	if isMax {
		reducedValue = -shared.INFINITE
		for i := 0; i < workerNum; i++ {
			value := <-valueChannel
			if value > reducedValue {
				reducedValue = value
			}
		}
	} else {
		reducedValue = shared.INFINITE
		for i := 0; i < workerNum; i++ {
			value := <-valueChannel
			if value < reducedValue {
				reducedValue = value
			}
		}
	}

	return reducedValue
}

func (miniMax *MiniMax) GetBestMove(board *chess.Board, color chess.Color, piecesMoves []chess.PieceMoves) BestMove {
	len := len(piecesMoves)
	n := int(math.Floor(float64(len) / float64(workerNum)))
	remainder := len - workerNum*n
	p := worker.New(workerNum)

	maxChannel := make(chan BestMove)
	lastEnd := 0
	for i := 0; i < workerNum; i++ {
		start := lastEnd
		offset := n
		if remainder > 0 {
			offset += 1
		}
		subArr := piecesMoves[start : start+offset]
		lastEnd = start + offset
		p.Run(&BestMoveWorker{board: board.Clone(), piecesMoves: subArr, search: func(board *chess.Board) int {
			return miniMax.search(board, color, miniMax.depth-1, false, -shared.INFINITE, shared.INFINITE)
		}, resultChannel: maxChannel})
	}

	bestMove := BestMove{
		move:  Move{},
		value: -shared.INFINITE,
	}
	for i := 0; i < workerNum; i++ {
		subBestMove := <-maxChannel
		if subBestMove.value > bestMove.value {
			bestMove = subBestMove
		}
	}
	p.Shutdown()

	return bestMove
}

func (miniMax *MiniMax) GetNextMove(board *chess.Board, color chess.Color) Move {
	fmt.Sprintf("GetNextMove start: %d\n", time.Now().Unix())
	piecesMoves := board.GenerateMoves(color)
	bestMove := miniMax.GetBestMove(board, color, piecesMoves)
	fmt.Sprintf("GetNextMove end: %d\n", time.Now().Unix())
	return bestMove.move
}

func NewMiniMax(depth int, evalModel eval.IEvalModel, cutOff bool) *MiniMax {
	return &MiniMax{depth, evalModel, cutOff}
}
