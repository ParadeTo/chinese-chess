package chess

import (
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

type CanMoveTestData struct {
	pieces   []*Piece
	pos      [2]int
	expected bool
}

func TestJCanMove(t *testing.T) {
	testData := []CanMoveTestData{
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
			},
			pos:      [2]int{0, 1},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
				NewZ("r", [2]int{0, 1}, Bottom, ""),
			},
			pos:      [2]int{0, 4},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
				NewZ("r", [2]int{3, 0}, Bottom, ""),
			},
			pos:      [2]int{3, 0},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
				NewZ("b", [2]int{1, 0}, Bottom, ""),
			},
			pos:      [2]int{1, 0},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
				NewZ("b", [2]int{1, 0}, Bottom, ""),
			},
			pos:      [2]int{2, 0},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 0}, Bottom, ""),
				NewZ("b", [2]int{1, 0}, Bottom, ""),
			},
			pos:      [2]int{0, 0},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{0, 9}, Bottom, ""),
				NewZ("b", [2]int{0, 3}, Bottom, ""),
			},
			pos:      [2]int{0, 0},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{8, 0}, Bottom, ""),
				NewZ("b", [2]int{0, 0}, Bottom, ""),
			},
			pos:      [2]int{0, 0},
			expected: true,
		},
	}
	for _, data := range testData {
		Convey("Given a board, the result must be right.", t, func() {
			board := NewBoard(data.pieces)
			So(data.expected, ShouldEqual, board.CanMove(data.pieces[0], data.pos))
		})
	}
}
