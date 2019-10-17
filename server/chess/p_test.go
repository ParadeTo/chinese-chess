package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestP_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewM("r", [2]int{1, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 8}, {0, 7}, {2, 7}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestP_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewP("r", [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 4},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 8},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{4, 6}, Bottom, ""),
				NewZ("r", [2]int{4, 5}, Bottom, ""),
			},
			pos:      [2]int{4, 4},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{4, 6}, Bottom, ""),
				NewZ("b", [2]int{4, 5}, Top, ""),
			},
			pos:      [2]int{4, 5},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{5, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{0, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{4, 5},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{5, 7}, Bottom, ""),
			},
			pos:      [2]int{6, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{5, 7}, Bottom, ""),
				NewZ("r", [2]int{6, 7}, Bottom, ""),
			},
			pos:      [2]int{7, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
				NewZ("r", [2]int{5, 7}, Bottom, ""),
				NewZ("b", [2]int{6, 7}, Bottom, ""),
			},
			pos:      [2]int{6, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
			},
			pos:      [2]int{3, 5},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP("r", [2]int{4, 7}, Bottom, ""),
			},
			pos:      [2]int{4, 5},
			expected: true,
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d CanMove", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.CanMove(data.pieces[0], data.pos), ShouldEqual, data.expected)
		})
	}
}
