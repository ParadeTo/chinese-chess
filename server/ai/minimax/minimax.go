package minimax

import (
	"chinese-chess/server/ai/minimax/eval"
	"chinese-chess/server/chess"
)

type MiniMax struct {
	depth     int
	evalModel eval.IEvalModel
	cutOff    bool
}

func (miniMax *MiniMax) search(board chess.Board, color chess.Color, depth int, isMax bool, alpha int, beta int) int {
	return 0
}

func NewMiniMax(depth int, evalModel eval.IEvalModel, cutOff bool) *MiniMax {
	return &MiniMax{depth, evalModel, cutOff}
}
