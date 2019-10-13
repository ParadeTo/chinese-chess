package chess

import "math"

type Z struct {
	*Piece
}

func (z *Z) isCrossedRiver() bool {
	return (z.Side == "b" && z.Pos[1] <= 4) || (z.Side == "t" && z.Pos[1] >= 5)
}

func (z *Z) GetNextPositions(board *Board) [][2]int {
	var a [][2]int
	return a
}

func (z *Z) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := z.Pos[0]
	origY := z.Pos[1]

	if z.Side == "b" && destY == origY-1 ||
		z.Side == "t" && destY == origY+1 ||
		z.isCrossedRiver() && math.Abs(float64(destX-origX)) == 1 {
		return z.CanPlaceAtDest(dest, board)
	}

	return false
}

func NewZ(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("z", color, pos, side, key)
	z := &Z{piece}
	piece.IPiece = z
	return piece
}
