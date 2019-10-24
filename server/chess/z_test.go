package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestZ_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 5}},
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			nextPositions: [][2]int{{4, 7}, {3, 6}, {5, 6}},
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 4}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 3}, {3, 4}, {5, 4}},
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 4}, Top, ""),
			},
			nextPositions: [][2]int{{4, 5}},
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{0, 0}, Bottom, ""),
			},
			nextPositions: [][2]int{{1, 0}},
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{8, 0}, Bottom, ""),
			},
			nextPositions: [][2]int{{7, 0}},
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{0, 9}, Top, ""),
			},
			nextPositions: [][2]int{{1, 9}},
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{8, 9}, Top, ""),
			},
			nextPositions: [][2]int{{7, 9}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestZ_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{4, 5},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			pos:      [2]int{4, 5},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{4, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			pos:      [2]int{4, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{5, 6},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			pos:      [2]int{5, 6},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{3, 6},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			pos:      [2]int{3, 6},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{4, 3}, Bottom, ""),
			},
			pos:      [2]int{3, 3},
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
