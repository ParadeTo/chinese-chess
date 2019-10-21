package minimax

import (
	"chinese-chess/server/ai/minimax/eval"
	"chinese-chess/server/chess"
	"chinese-chess/server/shared"
)

type Move struct {
	From [2]int
	To   [2]int
}

type BestMove struct {
	bestMove Move
	value    int
}

type MiniMax struct {
	depth     int
	evalModel eval.IEvalModel
	cutOff    bool
}

func (miniMax *MiniMax) search(board chess.Board, color chess.Color, depth int, isMax bool, alpha int, beta int) int {
	return 0
}

func (miniMax *MiniMax) GetBestMove(board chess.Board, color chess.Color, piecesMoves []chess.PieceMoves) BestMove {
	var move Move
	max := -shared.INFINITE

	for _, pieceNodes := range piecesMoves {
		x := pieceNodes.From[0]
		y := pieceNodes.From[1]
		nodes := pieceNodes.Nodes
		piece := board.Cells[x][y]
		for _, node := range nodes {
			boards
		}
	}
}

func NewMiniMax(depth int, evalModel eval.IEvalModel, cutOff bool) *MiniMax {
	return &MiniMax{depth, evalModel, cutOff}
}
