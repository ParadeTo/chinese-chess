package chess

import "math"

type Z Piece

func (z *Z) isCrossedRiver() bool {
	return (z.Side == "b" && z.Pos[1] <= 4) || (z.Side == "t" && z.Pos[1] >= 5)
}

func (z *Z) GetNextPositions(board *Board) [][2]int {
	var moves [][2]int
	var positions [][2]int
	currentX := z.Pos[0]
	currentY := z.Pos[1]

	if z.Side == "b" {
		if currentY > 4 {
			moves = append(moves, [2]int{0, -1})
		} else {
			if currentY-1 >= 0 {
				moves = append(moves, [2]int{0, -1})
			}
			if currentX-1 >= 0 {
				moves = append(moves, [2]int{-1, 0})
			}
			if currentX+1 < WIDTH {
				moves = append(moves, [2]int{1, 0})
			}
		}
	} else {
		if currentY < 5 {
			moves = append(moves, [2]int{0, 1})
		} else {
			if currentY+1 < HEIGHT {
				moves = append(moves, [2]int{0, 1})
			}
			if currentX-1 >= 0 {
				moves = append(moves, [2]int{-1, 0})
			}
			if currentX+1 < WIDTH {
				moves = append(moves, [2]int{1, 0})
			}
		}
	}

	for _, move := range moves {
		dest := [2]int{currentX + move[0], currentY + move[1]}
		if z.CanMove(dest, board) {
			positions = append(positions, dest)
		}
	}

	return positions
}

func (z *Z) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := z.Pos[0]
	origY := z.Pos[1]

	if z.Side == "b" && destY == origY-1 ||
		z.Side == "t" && destY == origY+1 ||
		z.isCrossedRiver() && math.Abs(float64(destX-origX)) == 1 {
		return (*Piece)(z).CanPlaceAtDest(dest, board)
	}

	return false
}

func NewZ(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("z", color, pos, side, key)
	z := (*Z)(piece)
	piece.IPiece = z
	return piece
}
