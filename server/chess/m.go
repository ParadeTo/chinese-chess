package chess

import "math"

type M Piece

func (m *M) GetNextPositions(board *Board) [][2]int {
	currentX := m.Pos[0]
	currentY := m.Pos[1]

	var moves = [][2]int{{-2, -1}, {2, -1}, {-2, 1}, {2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}}
	var positions [][2]int

	for _, move := range moves {
		pos := [2]int{currentX + move[0], currentY + move[1]}
		if m.CanMove(pos, board) {
			positions = append(positions, pos)
		}
	}

	return positions
}

func (m *M) CanMove(dest [2]int, board *Board) bool {
	origX := m.Pos[0]
	origY := m.Pos[1]
	destX := dest[0]
	destY := dest[1]
	cells := board.Cells

	if !InBoard([2]int{destX, destY}) {
		return false
	}

	if (destY-origY == 2 && math.Abs(float64(destX-origX)) == 1 && cells[origX][origY+1] == nil) ||
		(destY-origY == -2 && math.Abs(float64(destX-origX)) == 1 && cells[origX][origY-1] == nil) ||
		(destX-origX == 2 && math.Abs(float64(destY-origY)) == 1 && cells[origX+1][origY] == nil) ||
		(destX-origX == -2 && math.Abs(float64(destY-origY)) == 1 && cells[origX-1][origY] == nil) {
		return (*Piece)(m).CanPlaceAtDest(dest, board)
	}

	return false
}

func NewM(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("m", color, pos, side, key)
	m := (*M)(piece)
	piece.IPiece = m
	return piece
}
