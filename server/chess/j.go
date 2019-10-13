package chess

type J struct {
	*Piece
}

func (j *J) GetNextPositions(board *Board) [][2]int {
	var a [][2]int
	return a
}

func (j *J) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := j.Pos[0]
	origY := j.Pos[1]
	cells := board.Cells

	if (destX == origX && destY == origY) || (destX != origX && destY != origY) {
		return false
	}

	if destX == origX {
		startY := origY + 1
		endY := destY - 1
		if destY < origY {
			startY = destY + 1
			endY = origY - 1
		}
		for i := startY; i <= endY; i++ {
			if cells[origX][i] != nil {
				return false
			}
		}
	}

	if destY == origY {
		startX := origX + 1
		endX := destX - 1
		if destX < origX {
			startX = destX + 1
			endX = origX - 1
		}
		for i := startX; i <= endX; i++ {
			if cells[i][origY] != nil {
				return false
			}
		}
	}

	return j.CanPlaceAtDest(dest, board)
}

func NewJ(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("j", color, pos, side, key)
	j := &J{piece}
	piece.IPiece = j
	return piece
}
