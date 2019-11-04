package chess

import "math"

type B Piece

func hasPieceBetweenBosses(board *Board, b1, b2 *B) bool {
	startY := b1.Pos[1] + 1
	endY := b2.Pos[1] - 1

	if startY >= endY {
		startY = b2.Pos[1] + 1
		endY = b1.Pos[1] - 1
	}

	hasPiece := false
	for i := startY; i <= endY; i++ {
		if board.Cells[b1.Pos[0]][i] != nil {
			hasPiece = true
		}
	}
	return hasPiece
}

func (b *B) GetNextPositions(board *Board) [][2]int {
	currentX := b.Pos[0]
	currentY := b.Pos[1]

	var moves = [][2]int{{-1, 0}, {1, 0}, {0, 1}, {0, -1}}
	var positions [][2]int

	for _, move := range moves {
		pos := [2]int{currentX + move[0], currentY + move[1]}
		if b.CanMove(pos, board) {
			positions = append(positions, pos)
		}
	}

	var opponentBoss *Piece
	if currentY < 3 {
		for i := 7; i <= 9; i++ {
			piece := board.Cells[currentX][i]
			if piece != nil && piece.Role == RB {
				opponentBoss = piece
			}
		}
		if opponentBoss != nil && !hasPieceBetweenBosses(board, b, (*B)(opponentBoss)) {
			positions = append(positions, [2]int{currentX, opponentBoss.Pos[1]})
		}
	} else {
		for i := 0; i <= 2; i++ {
			piece := board.Cells[currentX][i]
			if piece != nil && piece.Role == RB {
				opponentBoss = piece
			}
		}
		if opponentBoss != nil && !hasPieceBetweenBosses(board, b, (*B)(opponentBoss)) {
			positions = append(positions, [2]int{currentX, opponentBoss.Pos[1]})
		}
	}

	return positions
}

func (b *B) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := b.Pos[0]
	origY := b.Pos[1]

	if !InBoard([2]int{destX, destY}) {
		return false
	}

	destPiece := board.Cells[destX][destY]
	if destPiece != nil && destPiece.Role == RB && destPiece.Color != b.Color && !hasPieceBetweenBosses(board, b, (*B)(destPiece)) {
		return true
	}

	if !InNinePlace(dest, b.Side) {
		return false
	}

	if origX == destX && math.Abs(float64(origY-destY)) == 1 ||
		origY == destY && math.Abs(float64(origX-destX)) == 1 {
		return (*Piece)(b).CanPlaceAtDest(dest, board)
	}

	return false
}

func (b *B) Clone() *Piece {
	return NewB(b.Color, b.Pos, b.Side, b.Key)
}

func NewB(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece(RB, color, pos, side, key)
	b := (*B)(piece)
	piece.IPiece = b
	return piece
}
