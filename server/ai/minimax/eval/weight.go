package eval

import "chinese-chess/server/chess"

type WeightEvalModel struct{}

var pieceVal = map[chess.Role]int{
	"b": 1000000,
	"s": 110,
	"x": 110,
	"m": 300,
	"j": 600,
	"p": 300,
	"z": 70,
}

var posVal = map[chess.Role][chess.HEIGHT][chess.WIDTH]int{
	"p": {
		{6, 4, 0, -10, -12, -10, 0, 4, 6},
		{2, 2, 0, -4, -14, -4, 0, 2, 2},
		{2, 2, 0, -10, -8, -10, 0, 2, 2},
		{0, 0, -2, 4, 10, 4, -2, 0, 0},
		{0, 0, 0, 2, 8, 2, 0, 0, 0},
		{-2, 0, 4, 2, 6, 2, 4, 0, -2},
		{0, 0, 0, 2, 4, 2, 0, 0, 0},
		{4, 0, 8, 6, 10, 6, 8, 0, 4},
		{0, 2, 4, 6, 6, 6, 4, 2, 0},
		{0, 0, 2, 6, 6, 6, 2, 0, 0},
	},
	"m": {
		{4, 8, 16, 12, 4, 12, 16, 8, 4},
		{4, 10, 28, 16, 8, 16, 28, 10, 4},
		{12, 14, 16, 20, 18, 20, 16, 14, 12},
		{8, 24, 18, 24, 20, 24, 18, 24, 8},
		{6, 16, 14, 18, 16, 18, 14, 16, 6},
		{4, 12, 16, 14, 12, 14, 16, 12, 4},
		{2, 6, 8, 6, 10, 6, 8, 6, 2},
		{4, 2, 8, 8, 4, 8, 8, 2, 4},
		{0, 2, 4, 4, -2, 4, 4, 2, 0},
		{0, -4, 0, 0, 0, 0, 0, -4, 0},
	},
	"j": {
		{14, 14, 12, 18, 16, 18, 12, 14, 14},
		{16, 20, 18, 24, 26, 24, 18, 20, 16},
		{12, 12, 12, 18, 18, 18, 12, 12, 12},
		{12, 18, 16, 22, 22, 22, 16, 18, 12},
		{12, 14, 12, 18, 18, 18, 12, 14, 12},
		{12, 16, 14, 20, 20, 20, 14, 16, 12},
		{6, 10, 8, 14, 14, 14, 8, 10, 6},
		{4, 8, 6, 14, 12, 14, 6, 8, 4},
		{8, 4, 8, 16, 8, 16, 8, 4, 8},
		{-2, 10, 6, 14, 12, 14, 6, 10, -2},
	},
	"z": {
		{0, 3, 6, 9, 12, 9, 6, 3, 0},
		{18, 36, 56, 80, 120, 80, 56, 36, 18},
		{14, 26, 42, 60, 80, 60, 42, 26, 14},
		{10, 20, 30, 34, 40, 34, 30, 20, 10},
		{6, 12, 18, 18, 20, 18, 18, 12, 6},
		{2, 0, 8, 0, 8, 0, 8, 0, 2},
		{0, 0, -2, 0, 4, 0, -2, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0, 0, 0},
	},
}

func evalPieceVal(r chess.Role) int {
	return pieceVal[r]
}

func evalPosVal(r chess.Role, pos [2]int) int {
	x := pos[0]
	y := pos[1]
	if arr, ok := posVal[r]; ok {
		return arr[y][x]
	}
	return 0
}

func (w *WeightEvalModel) eval(board *chess.Board, color chess.Color) int {
	selfPieceVal := 0
	selfPosVal := 0
	opponentPieceVal := 0
	opponentPosVal := 0

	pieces := board.Pieces[color]
	for _, piece := range pieces {
		selfPieceVal += evalPieceVal(piece.Role)
		reversedPos := [2]int{chess.WIDTH - piece.Pos[0] - 1, chess.HEIGHT - piece.Pos[1] - 1}
		selfPosVal += evalPosVal(piece.Role, reversedPos)
	}

	var opponentColor chess.Color
	if color == "r" {
		opponentColor = "b"
	} else {
		opponentColor = "r"
	}
	pieces = board.Pieces[opponentColor]
	for _, piece := range pieces {
		opponentPieceVal += evalPieceVal(piece.Role)
		opponentPosVal += evalPosVal(piece.Role, piece.Pos)
	}

	return selfPieceVal + selfPosVal - opponentPieceVal - opponentPosVal
}

func NewWeightEvalModel() *WeightEvalModel {
	return &WeightEvalModel{}
}
