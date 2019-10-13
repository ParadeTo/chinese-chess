package main

import (
	"chinese-chess/server/chess"
	"fmt"
)

func t(p *chess.Piece) {
	fmt.Print(p.Pos)
}

func main() {
	t(chess.NewJ("r", [2]int{1, 2}, chess.Bottom, "dd"))
}
