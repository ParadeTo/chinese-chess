package chess

import "math"

type S Piece

var possiblePos = map[Side][][2]int{
	Top:    {{3, 0}, {5, 0}, {4, 1}, {3, 2}, {5, 2}},
	Bottom: {{3, 9}, {5, 9}, {4, 8}, {3, 7}, {5, 7}},
}

func (s *S) isPossiblePos(dest [2]int) bool {
	positions := possiblePos[s.Side]
	for _, pos := range positions {
		if pos[0] == dest[0] && pos[1] == dest[1] {
			return true
		}
	}
	return false
}

func (s *S) GetNextPositions(board *Board) [][2]int {
	currentX := s.Pos[0]
	currentY := s.Pos[1]

	var moves = [][2]int{{-1, -1}, {1, 1}, {-1, 1}, {1, -1}}
	var positions [][2]int
	for _, move := range moves {
		pos := [2]int{currentX + move[0], currentY + move[1]}
		if s.CanMove(pos, board) {
			positions = append(positions, pos)
		}
	}
	return positions
}

func (s *S) CanMove(dest [2]int, board *Board) bool {
	destX := dest[0]
	destY := dest[1]
	origX := s.Pos[0]
	origY := s.Pos[1]

	if s.isPossiblePos(dest) && math.Abs(float64(origX-destX)) == 1 && math.Abs(float64(origY-destY)) == 1 {
		return (*Piece)(s).CanPlaceAtDest(dest, board)
	}

	return false
}

func NewS(color Color, pos [2]int, side Side, key string) *Piece {
	piece := NewPiece("s", color, pos, side, key)
	s := (*S)(piece)
	piece.IPiece = s
	return piece
}
