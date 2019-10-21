package chess

import "chinese-chess/server/shared"

type Record struct {
	from  []int
	to    []int
	eaten IPiece
}

type Node struct {
	to    [2]int
	value int
}

type PieceMoves struct {
	From  [2]int
	Nodes []Node
}

func InNinePlace(pos [2]int, side Side) bool {
	x := pos[0]
	y := pos[1]
	if x >= 3 && x <= 5 {
		if side == "t" {
			return y >= 0 && y <= 2
		} else {
			return y >= 7 && y <= 9
		}
	}
	return false
}

func InBoard(pos [2]int) bool {
	x := pos[0]
	y := pos[1]
	return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT
}

func InOwnSide(pos [2]int, side Side) bool {
	y := pos[1]
	return (y >= 0 && y < 5 && side == "t") || (y > 4 && y < HEIGHT && side == "b")
}

type Board struct {
	Cells   [WIDTH][HEIGHT]*Piece
	Pieces  map[Color][]*Piece
	records []*Record
}

func (board *Board) isFinish() bool {
	hasRBoss := false
	hasBBoss := false
	for _, piece := range board.Pieces["r"] {
		if piece.Role == "b" {
			hasRBoss = true
			break
		}
	}
	for _, piece := range board.Pieces["b"] {
		if piece.Role == "b" {
			hasBBoss = true
			break
		}
	}
	return !(hasRBoss && hasBBoss)
}

func (board *Board) GetPieceByPos(pos [2]int) *Piece {
	x := pos[0]
	y := pos[1]
	return board.Cells[x][y]
}

func (board *Board) GetNextPositions(piece *Piece) [][2]int {
	return piece.GetNextPositions(board)
}

func (board *Board) CanMove(piece *Piece, pos [2]int) bool {
	return InBoard(pos) && piece.CanMove(pos, board)
}

func (board *Board) GenerateMoves(color Color) []PieceMoves {
	pieces := board.Pieces[color]
	var pieceNodes []PieceMoves
	for _, p := range pieces {
		positions := p.GetNextPositions(board)
		var nodes []Node
		for _, pos := range positions {
			nodes = append(nodes, Node{to: pos, value: -shared.INFINITE})
		}
		pieceNodes = append(pieceNodes, PieceMoves{From: p.Pos, Nodes: nodes})
	}
	return pieceNodes
}

func (board *Board) UpdatePiece(piece *Piece, newPos [2]int) (result bool, eatenPiece *Piece) {
	if !board.CanMove(piece, newPos) {
		return false, nil
	}

	//newX := newPos[0]
	//newY := newPos[1]
	//eatenPiece := board.Cells[newX][newY]

	//if eatenPiece != nil {
	//	board.Pieces[eatenPiece.Color] = append(board.Pieces[eatenPiece.Color], )
	//}
	return false, nil
}

func NewBoard(pieces []*Piece) *Board {
	board := &Board{Pieces: map[Color][]*Piece{Red: {}, Black: {}}}
	for _, piece := range pieces {
		x := piece.Pos[0]
		y := piece.Pos[1]
		board.Cells[x][y] = piece
		board.Pieces[piece.Color] = append(board.Pieces[piece.Color], piece)
	}
	return board
}
