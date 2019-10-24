package chess

import (
	"fmt"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

type TestDataUpdatePiece struct {
	pieces  []*Piece
	pos     [2]int
	newPos  [2]int
	eaten   bool
	canMove bool
}

type TestDataIsFinish struct {
	pieces   []*Piece
	expected bool
}

func TestBoard_isFinish(t *testing.T) {
	testData := []TestDataIsFinish{
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{8, 6}, Bottom, "rz5"),
				NewB(Red, [2]int{4, 9}, Bottom, "rb"),
				NewB(Black, [2]int{4, 0}, Top, "bb"),
			},
			expected: false,
		},
		{
			pieces: []*Piece{
				NewZ(Red, [2]int{8, 6}, Bottom, "rz5"),
				NewB(Black, [2]int{4, 0}, Top, "bb"),
			},
			expected: true,
		},
	}

	for i, data := range testData {
		Convey(fmt.Sprintf("#%d IsFinish", i+1), t, func() {
			board := NewBoard(data.pieces)
			So(board.IsFinish(), ShouldEqual, data.expected)
		})
	}
}

func TestBoard_UpdatePiece(t *testing.T) {
	testData := []TestDataUpdatePiece{
		{
			pieces: []*Piece{
				NewJ(Red, [2]int{4, 5}, Bottom, ""),
			},
			pos:     [2]int{4, 5},
			newPos:  [2]int{4, 5},
			eaten:   false,
			canMove: false,
		},
		{
			pieces: []*Piece{
				NewJ(Red, [2]int{4, 5}, Bottom, ""),
			},
			pos:     [2]int{4, 5},
			newPos:  [2]int{5, 5},
			eaten:   false,
			canMove: true,
		},
		{
			pieces: []*Piece{
				NewJ(Red, [2]int{4, 5}, Bottom, ""),
				NewZ(Black, [2]int{4, 6}, Top, ""),
			},
			pos:     [2]int{4, 5},
			newPos:  [2]int{4, 6},
			eaten:   true,
			canMove: true,
		},
	}
	for i, data := range testData {
		Convey(fmt.Sprintf("#%d UpdatePiece", i+1), t, func() {
			board := NewBoard(data.pieces)
			pieceNum := board.GetPieceNum()
			piece := board.Cells[data.pos[0]][data.pos[1]]
			board.UpdatePiece(piece, data.newPos)
			if data.canMove {
				So(board.Cells[data.pos[0]][data.pos[1]], ShouldEqual, nil)
				So(board.Cells[data.newPos[0]][data.newPos[1]], ShouldEqual, piece)
				if data.eaten {
					So(board.GetPieceNum(), ShouldEqual, pieceNum-1)
				}
			}
		})
	}
}

func TestBoard_BackMoves(t *testing.T) {
	bm1 := NewM(Black, [2]int{1, 0}, Top, "bm1")
	bp1 := NewP(Black, [2]int{1, 2}, Top, "bp1")

	j1 := NewJ(Red, [2]int{0, 9}, Bottom, "rj1")
	m1 := NewM(Red, [2]int{1, 9}, Bottom, "rm1")
	x1 := NewX(Red, [2]int{2, 9}, Bottom, "rx1")
	s1 := NewS(Red, [2]int{3, 9}, Bottom, "rs1")
	b := NewB(Red, [2]int{4, 9}, Bottom, "rb")
	s2 := NewS(Red, [2]int{5, 9}, Bottom, "rs2")
	x2 := NewX(Red, [2]int{6, 9}, Bottom, "rx2")
	m2 := NewM(Red, [2]int{7, 9}, Bottom, "rm2")
	p1 := NewP(Red, [2]int{1, 7}, Bottom, "rp1")
	p2 := NewP(Red, [2]int{7, 7}, Bottom, "rp2")
	z1 := NewZ(Red, [2]int{0, 6}, Bottom, "rz1")
	z2 := NewZ(Red, [2]int{2, 6}, Bottom, "rz2")
	z3 := NewZ(Red, [2]int{4, 6}, Bottom, "rz3")
	z4 := NewZ(Red, [2]int{6, 6}, Bottom, "rz4")
	z5 := NewZ(Red, [2]int{8, 6}, Bottom, "rz5")

	pieces := []*Piece{bm1, bp1, j1, m1, m2, x1, x2, b, s1, s2, p1, p2, z1, z2, z3, z4, z5}
	board := NewBoard(pieces)
	board.UpdatePiece(j1, [2]int{0, 8})
	board.UpdatePiece(m1, [2]int{0, 7})
	board.BackMoves(2)
	Convey("#1 BackMoves", t, func() {
		So(board.Cells[0][9], ShouldEqual, j1)
		So(m1.Pos, ShouldResemble, [2]int{1, 9})
	})
	board.UpdatePiece(p1, [2]int{1, 0})
	board.BackMoves(1)
	Convey("#2 BackMoves", t, func() {
		So(board.Cells[1][0], ShouldEqual, bm1)
		So(bm1.Pos, ShouldResemble, [2]int{1, 0})
	})
}
