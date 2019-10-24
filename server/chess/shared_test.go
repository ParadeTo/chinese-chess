package chess

import (
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestShared_Remove(t *testing.T) {
	Convey("#1 Remove", t, func() {
		j := NewJ(Red, [2]int{4, 4}, Bottom, "")
		m := NewM(Red, [2]int{1, 9}, Bottom, "")
		list := []*Piece{
			j,
			m,
		}
		item := j
		So(RemovePiece(list, item), ShouldResemble, []*Piece{m})
	})
}
