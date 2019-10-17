package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestM_GetNextPositions(t *testing.T) {
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

func TestM_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
		{
			pieces: []*Piece{
				NewM("r", [2]int{4, 5}, Bottom, ""),
			},
			pos:      [2]int{6, 4},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewM("r", [2]int{4, 5}, Bottom, ""),
			},
			pos:      [2]int{2, 4},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewM("r", [2]int{4, 5}, Bottom, ""),
			},
			pos:      [2]int{5, 4},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewM("r", [2]int{4, 5}, Bottom, ""),
				NewZ("r", [2]int{5, 5}, Bottom, ""),
			},
			pos:      [2]int{6, 4},
			expected: false,
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d CanMove", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.CanMove(data.pieces[0], data.pos), ShouldEqual, data.expected)
		})
	}
}
