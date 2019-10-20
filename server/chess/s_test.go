package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestS_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 8}},
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{4, 8}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 7}, {5, 9}, {3, 9}, {5, 7}},
		},
		{
			pieces: []*Piece{
				NewS("b", [2]int{4, 1}, Top, ""),
			},
			nextPositions: [][2]int{{3, 0}, {5, 2}, {3, 2}, {5, 0}},
		},
		{
			pieces: []*Piece{
				NewS("b", [2]int{3, 0}, Top, ""),
			},
			nextPositions: [][2]int{{4, 1}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestS_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{4, 8},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{5, 8},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
			},
			pos:      [2]int{6, 8},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{4, 9}, Bottom, ""),
			},
			pos:      [2]int{5, 8},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
				NewZ("b", [2]int{4, 8}, Top, ""),
			},
			pos:      [2]int{4, 8},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewS("r", [2]int{5, 9}, Bottom, ""),
				NewZ("r", [2]int{4, 8}, Top, ""),
			},
			pos:      [2]int{4, 8},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewS("b", [2]int{4, 1}, Top, ""),
			},
			pos:      [2]int{3, 0},
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
