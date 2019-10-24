package eval

import "chinese-chess/server/chess"

type IEvalModel interface {
	Eval(board *chess.Board, color chess.Color) int
}
