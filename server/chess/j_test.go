package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestJ_GetNextPositions(t *testing.T) {
	testData := []TestDataGetNextPositions{
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 4}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 4}, {2, 4}, {1, 4}, {0, 4}, {5, 4}, {6, 4}, {7, 4}, {8, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 5}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 4}, Bottom, ""),
				NewZ("r", [2]int{4, 4}, Bottom, ""),
				NewZ("r", [2]int{5, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 4}, {2, 4}, {1, 4}, {0, 4}, {5, 4}, {6, 4}, {7, 4}, {8, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 5}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("b", [2]int{4, 4}, Bottom, ""),
				NewZ("r", [2]int{5, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {4, 4}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("b", [2]int{4, 6}, Bottom, ""),
				NewZ("r", [2]int{5, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("r", [2]int{4, 6}, Bottom, ""),
				NewZ("r", [2]int{5, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("r", [2]int{4, 4}, Bottom, ""),
				NewZ("b", [2]int{5, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {5, 5}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("r", [2]int{3, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewJ("r", [2]int{4, 5}, Bottom, ""),
				NewZ("b", [2]int{3, 5}, Bottom, ""),
				NewZ("b", [2]int{4, 6}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}},
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d GetNextPositions", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.GetNextPositions(data.pieces[0]), ShouldResemble, data.nextPositions)
		})
	}
}

func TestJ_CanMove(t *testing.T) {
	testData := []TestDataCanMove{
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
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d CanMove", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.CanMove(data.pieces[0], data.pos), ShouldEqual, data.expected)
		})
	}
}
