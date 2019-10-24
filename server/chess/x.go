package chess

import "fmt"

type X Piece

func (x *X) GetNextPositions(board *Board) [][2]int {
	currentX := x.Pos[0]
	currentY := x.Pos[1]

	var moves = [][2]int{{-2, -2}, {2, 2}, {-2, 2}, {2, -2}}
	var positions [][2]int

	for _, move := range moves {
		pos := [2]int{currentX + move[0], currentY + move[1]}
		if x.CanMove(pos, board) {
			positions = append(positions, pos)
		}
	}
	return positions
}

func (x *X) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := x.Pos[0]
	origY := x.Pos[1]
	cells := board.Cells

	fmt.Sprintf("origX=%d,origY=%d destX=%d,destY=%d\n", origX, origY, destX, destY)
	fmt.Sprintf("%+v\n", cells)

	if InOwnSide([2]int{destX, destY}, x.Side) &&
		((destY-origY == 2 && destX-origX == 2 && cells[origX+1][origY+1] == nil) ||
			(destY-origY == 2 && destX-origX == -2 && cells[origX-1][origY+1] == nil) ||
			(destY-origY == -2 && destX-origX == 2 && cells[origX+1][origY-1] == nil) ||
			(destY-origY == -2 && destX-origX == -2 && cells[origX-1][origY-1] == nil)) {
		return (*Piece)(x).CanPlaceAtDest([2]int{destX, destY}, board)
	}

	return false
}

func NewX(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("x", color, pos, side, key)
	x := (*X)(piece)
	piece.IPiece = x
	return piece
}
