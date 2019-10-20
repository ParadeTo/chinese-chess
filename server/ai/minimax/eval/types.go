package eval

import "chinese-chess/server/chess"

type IEvalModel interface {
	eval(board *chess.Board, color chess.Color) int
}
