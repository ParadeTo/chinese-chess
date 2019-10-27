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
				NewP(Red, [2]int{4, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{3, 5}, Bottom, ""),
				NewZ(Red, [2]int{5, 5}, Bottom, ""),
				NewZ(Black, [2]int{7, 5}, Top, ""),
			},
			nextPositions: [][2]int{{2, 5}, {1, 5}, {0, 5}, {4, 5}, {7, 5}, {3, 4}, {3, 3}, {3, 2}, {3, 1}, {3, 0}, {3, 6}, {3, 7}, {3, 8}, {3, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{3, 5}, Bottom, ""),
				NewZ(Red, [2]int{5, 5}, Bottom, ""),
				NewZ(Red, [2]int{7, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{2, 5}, {1, 5}, {0, 5}, {4, 5}, {3, 4}, {3, 3}, {3, 2}, {3, 1}, {3, 0}, {3, 6}, {3, 7}, {3, 8}, {3, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{5, 5}, Bottom, ""),
				NewZ(Red, [2]int{3, 5}, Bottom, ""),
				NewZ(Black, [2]int{1, 5}, Top, ""),
			},
			nextPositions: [][2]int{{4, 5}, {1, 5}, {6, 5}, {7, 5}, {8, 5}, {5, 4}, {5, 3}, {5, 2}, {5, 1}, {5, 0}, {5, 6}, {5, 7}, {5, 8}, {5, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{5, 5}, Bottom, ""),
				NewZ(Red, [2]int{3, 5}, Bottom, ""),
				NewZ(Red, [2]int{1, 5}, Bottom, ""),
			},
			nextPositions: [][2]int{{4, 5}, {6, 5}, {7, 5}, {8, 5}, {5, 4}, {5, 3}, {5, 2}, {5, 1}, {5, 0}, {5, 6}, {5, 7}, {5, 8}, {5, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 5}, Bottom, ""),
				NewZ(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Black, [2]int{4, 9}, Top, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 5}, Bottom, ""),
				NewZ(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{4, 9}, Bottom, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 3}, {4, 2}, {4, 1}, {4, 0}, {4, 6}},
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 5}, Bottom, ""),
				NewZ(Red, [2]int{4, 3}, Bottom, ""),
				NewZ(Black, [2]int{4, 0}, Top, ""),
			},
			nextPositions: [][2]int{{3, 5}, {2, 5}, {1, 5}, {0, 5}, {5, 5}, {6, 5}, {7, 5}, {8, 5}, {4, 4}, {4, 0}, {4, 6}, {4, 7}, {4, 8}, {4, 9}},
		},
		{
			pieces: []*Piece{
				NewP(Black, [2]int{0, 2}, Top, "bp1"),
				NewP(Red, [2]int{1, 2}, Bottom, "rp1"),
				NewP(Black, [2]int{7, 2}, Top, "bp2"),
				NewZ(Black, [2]int{0, 3}, Top, "bz1"),
			},
			nextPositions: [][2]int{{0, 1}, {0, 0}},
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
				NewP(Red, [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 4},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{1, 8},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
				NewZ(Red, [2]int{4, 5}, Bottom, ""),
			},
			pos:      [2]int{4, 4},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
				NewZ(Black, [2]int{4, 5}, Top, ""),
			},
			pos:      [2]int{4, 5},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{5, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{1, 7}, Bottom, ""),
			},
			pos:      [2]int{0, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{4, 6}, Bottom, ""),
			},
			pos:      [2]int{4, 5},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{5, 7}, Bottom, ""),
			},
			pos:      [2]int{6, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{5, 7}, Bottom, ""),
				NewZ(Red, [2]int{6, 7}, Bottom, ""),
			},
			pos:      [2]int{7, 7},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
				NewZ(Red, [2]int{5, 7}, Bottom, ""),
				NewZ(Black, [2]int{6, 7}, Bottom, ""),
			},
			pos:      [2]int{6, 7},
			expected: true,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
			},
			pos:      [2]int{3, 5},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewP(Red, [2]int{4, 7}, Bottom, ""),
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
