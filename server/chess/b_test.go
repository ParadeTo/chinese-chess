package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestB_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 9}, {5, 8}},
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
				NewB(Black, [2]int{5, 0}, Top, ""),
			},
			nextPositions: [][2]int{{4, 9}, {5, 8}, {5, 0}},
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
				NewB(Black, [2]int{5, 0}, Top, ""),
				NewJ(Black, [2]int{5, 6}, Top, ""),
			},
			nextPositions: [][2]int{{4, 9}, {5, 8}},
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{5, 0}, Top, ""),
			},
			nextPositions: [][2]int{{4, 0}, {5, 1}},
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{5, 0}, Top, ""),
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 0}, {5, 1}, {5, 9}},
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{5, 0}, Top, ""),
				NewB(Red, [2]int{5, 9}, Bottom, ""),
				NewJ(Black, [2]int{5, 6}, Top, ""),
			},
			nextPositions: [][2]int{{4, 0}, {5, 1}},
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{5, 0}, Top, ""),
				NewJ(Red, [2]int{5, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 0}, {5, 1}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestB_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{6, 9},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{3, 9},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{4, 9},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{3, 9}, Bottom, ""),
			},
			pos:      [2]int{2, 9},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{3, 7}, Bottom, ""),
			},
			pos:      [2]int{3, 6},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{6, 9},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{3, 9},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{4, 9},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewB(Red, [2]int{3, 2}, Top, ""),
			},
			pos:      [2]int{3, 3},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{3, 2}, Top, ""),
				NewZ(Red, [2]int{3, 1}, Top, ""),
			},
			pos:      [2]int{3, 1},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{3, 2}, Top, ""),
				NewZ(Black, [2]int{3, 1}, Top, ""),
			},
			pos:      [2]int{3, 1},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewB(Black, [2]int{3, 2}, Top, ""),
				NewB(Red, [2]int{3, 9}, Bottom, ""),
			},
			pos:      [2]int{3, 9},
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
