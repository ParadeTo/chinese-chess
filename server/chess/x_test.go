package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestX_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{0, 7}, {4, 7}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestX_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 9}, Bottom, ""),
			},
			pos:      [2]int{4, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 9}, Bottom, ""),
				NewX(Red, [2]int{4, 7}, Bottom, ""),
			},
			pos:      [2]int{4, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 9}, Bottom, ""),
			},
			pos:      [2]int{5, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 9}, Bottom, ""),
				NewZ(Red, [2]int{3, 8}, Bottom, ""),
			},
			pos:      [2]int{4, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewX(Red, [2]int{2, 5}, Bottom, ""),
			},
			pos:      [2]int{0, 3},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewX(Black, [2]int{2, 0}, Top, ""),
			},
			pos:      [2]int{4, 2},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewX(Black, [2]int{2, 0}, Top, ""),
			},
			pos:      [2]int{0, 2},
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
