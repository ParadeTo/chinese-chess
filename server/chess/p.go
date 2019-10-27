package chess

type P Piece

func (p *P) GetNextPositions(board *Board) [][2]int {
	currentX := p.Pos[0]
	currentY := p.Pos[1]
	cells := board.Cells

	var positions [][2]int

	i := currentX - 1
	for i >= 0 {
		piece1 := cells[i][currentY]
		if piece1 != nil {
			j := i - 1
			for j >= 0 {
				piece2 := cells[j][currentY]
				if piece2 != nil {
					if piece2.Color != p.Color {
						positions = append(positions, [2]int{j, currentY})
					}
					break
				}
				j--
			}
			break
		}
		positions = append(positions, [2]int{i, currentY})
		i--
	}

	i = currentX + 1
	for i < WIDTH {
		piece1 := cells[i][currentY]
		if piece1 != nil {
			j := i + 1
			for j < WIDTH {
				piece2 := cells[j][currentY]
				if piece2 != nil {
					if piece2.Color != p.Color {
						positions = append(positions, [2]int{j, currentY})
					}
					break
				}
				j++
			}
			break
		}
		positions = append(positions, [2]int{i, currentY})
		i++
	}

	i = currentY - 1
	for i >= 0 {
		piece1 := cells[currentX][i]
		if piece1 != nil {
			j := i - 1
			for j >= 0 {
				piece2 := cells[currentX][j]
				if piece2 != nil {
					if piece2.Color != p.Color {
						positions = append(positions, [2]int{currentX, j})
					}
					break
				}
				j--
			}
			break
		}
		positions = append(positions, [2]int{currentX, i})
		i--
	}

	i = currentY + 1
	for i < HEIGHT {
		piece1 := cells[currentX][i]
		if piece1 != nil {
			j := i + 1
			for j < HEIGHT {
				piece2 := cells[currentX][j]
				if piece2 != nil {
					if piece2.Color != p.Color {
						positions = append(positions, [2]int{currentX, j})
					}
					break
				}
				j++
			}
			break
		}
		positions = append(positions, [2]int{currentX, i})
		i++
	}

	return positions
}

func (p *P) CanMove(dest [2]int, board *Board) bool {
	origX := p.Pos[0]
	origY := p.Pos[1]
	destX := dest[0]
	destY := dest[1]
	cells := board.Cells
	destPiece := board.GetPieceByPos(dest)

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
		barriers := 0
		for i := startY; i <= endY; i++ {
			if cells[origX][i] != nil {
				barriers++
			}
			if barriers > 1 {
				return false
			}
		}

		if barriers == 1 {
			return destPiece != nil && destPiece.Color != p.Color
		} else {
			return destPiece == nil
		}
	}

	if destY == origY {
		startX := origX + 1
		endX := destX - 1
		if destX < origX {
			startX = destX + 1
			endX = origX - 1
		}
		barriers := 0
		for i := startX; i <= endX; i++ {
			if cells[i][origY] != nil {
				barriers++
			}
			if barriers > 1 {
				return false
			}
		}

		if barriers == 1 {
			return destPiece != nil && destPiece.Color != p.Color
		} else {
			return destPiece == nil
		}
	}

	return false
}

func NewP(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("p", color, pos, side, key)
	p := (*P)(piece)
	piece.IPiece = p
	return piece
}
