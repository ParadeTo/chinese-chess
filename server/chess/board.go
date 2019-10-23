package chess

import "chinese-chess/server/shared"

type Record struct {
	from  [2]int
	to    [2]int
	eaten *Piece
}

type Node struct {
	To    [2]int
	Value int
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

func (board *Board) GetPieceNum() int {
	num := 0
	for _, row := range board.Cells {
		for _, cell := range row {
			if cell != nil {
				num++
			}
		}
	}
	return num
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
			nodes = append(nodes, Node{To: pos, Value: -shared.INFINITE})
		}
		pieceNodes = append(pieceNodes, PieceMoves{From: p.Pos, Nodes: nodes})
	}
	return pieceNodes
}

func (board *Board) UpdatePiece(piece *Piece, newPos [2]int) (result bool, eatenPiece *Piece) {
	if !board.CanMove(piece, newPos) {
		return false, nil
	}

	newX := newPos[0]
	newY := newPos[1]
	eatenPiece = board.Cells[newX][newY]

	if eatenPiece != nil {
		board.Pieces[eatenPiece.Color] = RemovePiece(board.Pieces[eatenPiece.Color], eatenPiece)
	}

	origX := piece.Pos[0]
	origY := piece.Pos[1]
	board.Cells[origX][origY] = nil
	board.Cells[newX][newY] = piece
	piece.Pos = newPos

	board.records = append(board.records, &Record{from: [2]int{origX, origY}, to: newPos, eaten: eatenPiece})

	return true, eatenPiece
}

func (board *Board) BackMoves(steps int) {
	for ; steps > 0; steps-- {
		var lastMove *Record
		len := len(board.records)
		lastMove, board.records = board.records[len-1], board.records[:len-1]
		if lastMove != nil {
			from := lastMove.from
			to := lastMove.to
			eaten := lastMove.eaten
			piece := board.Cells[to[0]][to[1]]
			piece.Pos = from
			board.Cells[from[0]][from[1]] = piece
			board.Cells[to[0]][to[1]] = eaten
			if eaten != nil {
				board.Pieces[eaten.Color] = append(board.Pieces[eaten.Color], eaten)
				eaten.Pos = to
			}
		}
	}
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
