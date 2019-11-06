package main

import (
	"chinese-chess/server/ai/minimax"
	"chinese-chess/server/ai/minimax/eval"
	. "chinese-chess/server/chess"
	"fmt"
)

func main() {
	bj1 := NewJ(Black, [2]int{0, 0}, Top, "bj1")
	bm1 := NewM(Black, [2]int{1, 0}, Top, "bm1")
	bx1 := NewX(Black, [2]int{2, 0}, Top, "bx1")
	bs1 := NewS(Black, [2]int{3, 0}, Top, "bs1")
	bb := NewB(Black, [2]int{4, 0}, Top, "bb")
	bs2 := NewS(Black, [2]int{5, 0}, Top, "bs2")
	bx2 := NewX(Black, [2]int{6, 0}, Top, "bx2")
	bm2 := NewM(Black, [2]int{7, 0}, Top, "bm2")
	bj2 := NewJ(Black, [2]int{8, 0}, Top, "bj2")
	bp1 := NewP(Black, [2]int{1, 2}, Top, "bp1")
	bp2 := NewP(Black, [2]int{7, 2}, Top, "bp2")
	bz1 := NewZ(Black, [2]int{0, 3}, Top, "bz1")
	bz2 := NewZ(Black, [2]int{2, 3}, Top, "bz2")
	bz3 := NewZ(Black, [2]int{4, 3}, Top, "bz3")
	bz4 := NewZ(Black, [2]int{6, 3}, Top, "bz4")
	bz5 := NewZ(Black, [2]int{8, 3}, Top, "bz5")

	rj1 := NewJ(Red, [2]int{0, 9}, Bottom, "rj1")
	rm1 := NewM(Red, [2]int{1, 9}, Bottom, "rm1")
	rx1 := NewX(Red, [2]int{2, 9}, Bottom, "rx1")
	rs1 := NewS(Red, [2]int{3, 9}, Bottom, "rs1")
	rb := NewB(Red, [2]int{4, 9}, Bottom, "rb")
	rs2 := NewS(Red, [2]int{5, 9}, Bottom, "rs2")
	rx2 := NewX(Red, [2]int{6, 9}, Bottom, "rx2")
	rm2 := NewM(Red, [2]int{7, 9}, Bottom, "rm2")
	rj2 := NewJ(Red, [2]int{8, 9}, Bottom, "rj2")
	rp1 := NewP(Red, [2]int{1, 7}, Bottom, "rp1")
	rp2 := NewP(Red, [2]int{7, 7}, Bottom, "rp2")
	rz1 := NewZ(Red, [2]int{0, 6}, Bottom, "rz1")
	rz2 := NewZ(Red, [2]int{2, 6}, Bottom, "rz2")
	rz3 := NewZ(Red, [2]int{4, 6}, Bottom, "rz3")
	rz4 := NewZ(Red, [2]int{6, 6}, Bottom, "rz4")
	rz5 := NewZ(Red, [2]int{8, 6}, Bottom, "rz5")

	board := NewBoard([]*Piece{
		bj1, bj2, bm1, bm2, bx1, bx2, bs1, bs2, bb, bz1, bz2, bz3, bz4, bz5, bp1, bp2,
		rj1, rj2, rm1, rm2, rx1, rx2, rs1, rs2, rb, rz1, rz2, rz3, rz4, rz5, rp1, rp2,
	})

	miniMax := minimax.NewMiniMax(3, eval.NewWeightEvalModel(), true)
	move := miniMax.GetNextMove(board, Red)
	fmt.Printf("%v+", move)
}
