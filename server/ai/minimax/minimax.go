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

type BestMove struct {
	move  chess.Move
	value int
}

type BestMoveWorker struct {
	board         *chess.Board
	moves         []chess.Move
	resultChannel chan BestMove
	search        func(board *chess.Board) int
}

func (bmw *BestMoveWorker) Task() {
	len := len(bmw.moves)

	fmt.Printf("BestMoveWorker Task (%d) start: %d\n", len, time.Now().Unix())

	bestMove := BestMove{
		move:  chess.Move{},
		value: -shared.INFINITE,
	}

	for _, move := range bmw.moves {
		x := move.From[0]
		y := move.From[1]
		piece := bmw.board.Cells[x][y]
		bmw.board.UpdatePiece(piece, move.To)
		value := bmw.search(bmw.board)
		bmw.board.BackMoves(1)
		if value > bestMove.value {
			bestMove.value = value
			bestMove.move.From = piece.Pos
			bestMove.move.To = move.To
		}
	}
	fmt.Printf("BestMoveWorker Task (%d) end: %d\n", len, time.Now().Unix())

	bmw.resultChannel <- bestMove
}

type MiniMax struct {
	depth     int
	evalModel eval.IEvalModel
	cutOff    bool
}

const WORKER_NUM = 1600

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

	var value int
	if isMax {
		value = -shared.INFINITE
	} else {
		value = shared.INFINITE
	}

	moves := board.GenerateMoves(getColor(isMax, color))
	for _, move := range moves {
		x := move.From[0]
		y := move.From[1]
		piece := board.Cells[x][y]
		board.UpdatePiece(piece, move.To)
		_value := miniMax.search(board, color, depth-1, !isMax, alpha, beta)
		board.BackMoves(1)
		if isMax {
			value = shared.Max(value, _value)
			if miniMax.cutOff {
				alpha = shared.Max(alpha, value)
				if alpha >= beta {
					return alpha
				}
			}
		} else {
			value = shared.Min(value, _value)
			if miniMax.cutOff {
				beta = shared.Min(beta, value)
				if alpha >= beta {
					return beta
				}
			}
		}
	}
	return value
}

func (miniMax *MiniMax) GetBestMove(board *chess.Board, color chess.Color, moves []chess.Move) BestMove {
	// // 单线程
	// return miniMax.search(board, color, miniMax.depth-1, false, -shared.INFINITE, shared.INFINITE)

	// 多线程
	len := len(moves)
	workerNum := WORKER_NUM
	if workerNum > len {
		workerNum = len
	}
	n := int(math.Floor(float64(len) / float64(workerNum)))
	remainder := len - workerNum*n

	p := worker.New(workerNum)
	maxChannel := make(chan BestMove)
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
		remainder -= 1
		subArr := moves[start : start+offset]
		lastEnd = start + offset
		p.Run(&BestMoveWorker{board: board.Clone(), moves: subArr, search: func(board *chess.Board) int {
			return miniMax.search(board, color, miniMax.depth-1, false, -shared.INFINITE, shared.INFINITE)
		}, resultChannel: maxChannel})
	}

	bestMove := BestMove{
		move:  chess.Move{},
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

func (miniMax *MiniMax) GetNextMove(board *chess.Board, color chess.Color) chess.Move {
	fmt.Printf("GetNextMove start: %d\n", time.Now().Unix())
	piecesMoves := board.GenerateMoves(color)
	bestMove := miniMax.GetBestMove(board, color, piecesMoves)
	fmt.Printf("GetNextMove end: %d\n", time.Now().Unix())
	return bestMove.move
}

func NewMiniMax(depth int, evalModel eval.IEvalModel, cutOff bool) *MiniMax {
	return &MiniMax{depth, evalModel, cutOff}
}
