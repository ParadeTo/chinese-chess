package chess

type J Piece

func (j *J) GetNextPositions(board *Board) [][2]int {
	var positions [][2]int
	currentX := j.Pos[0]
	currentY := j.Pos[1]
	cells := board.Cells

	i := currentX - 1
	for i >= 0 {
		pos := [2]int{i, currentY}
		piece := cells[i][currentY]
		if piece != nil {
			if piece.Color != j.Color {
				positions = append(positions, pos)
			}
			break
		}
		positions = append(positions, pos)
		i--
	}

	i = currentX + 1
	for i < WIDTH {
		pos := [2]int{i, currentY}
		piece := cells[i][currentY]
		if piece != nil {
			if piece.Color != j.Color {
				positions = append(positions, pos)
			}
			break
		}
		positions = append(positions, pos)
		i++
	}

	i = currentY - 1
	for i >= 0 {
		pos := [2]int{currentX, i}
		piece := cells[currentX][i]
		if piece != nil {
			if piece.Color != j.Color {
				positions = append(positions, pos)
			}
			break
		}
		positions = append(positions, pos)
		i--
	}

	i = currentY + 1
	for i < HEIGHT {
		pos := [2]int{currentX, i}
		piece := cells[currentX][i]
		if piece != nil {
			if piece.Color != j.Color {
				positions = append(positions, pos)
			}
			break
		}
		positions = append(positions, pos)
		i++
	}

	return positions
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
		endY := destY
		if destY < origY {
			startY = destY + 1
			endY = origY
		}
		for i := startY; i < endY; i++ {
			if cells[origX][i] != nil {
				return false
			}
		}
	}

	if destY == origY {
		startX := origX + 1
		endX := destX
		if destX < origX {
			startX = destX + 1
			endX = origX
		}
		for i := startX; i < endX; i++ {
			if cells[i][origY] != nil {
				return false
			}
		}
	}

	return (*Piece)(j).CanPlaceAtDest(dest, board)
}

func (j *J) Clone() *Piece {
	return NewJ(j.Color, j.Pos, j.Side, j.Key)
}

func NewJ(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("j", color, pos, side, key)
	j := (*J)(piece)
	piece.IPiece = j
	return piece
}
