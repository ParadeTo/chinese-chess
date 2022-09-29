package chess

type Record struct {
	from  [2]int
	to    [2]int
	eaten *Piece
}

type Move struct {
	From [2]int `json:"from"`
	To   [2]int `json:"to"`
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
	x := pos[0]
	y := pos[1]
	if x < 0 || x >= WIDTH {
		return false
	}
	return (y >= 0 && y < 5 && side == Top) || (y > 4 && y < HEIGHT && side == Bottom)
}

type Board struct {
	Cells   [WIDTH][HEIGHT]*Piece
	Pieces  map[Color][]*Piece
	records []*Record
}

func (board *Board) IsFinish() bool {
	hasRBoss := false
	hasBBoss := false
	for _, piece := range board.Pieces[Red] {
		if piece.Role == RB {
			hasRBoss = true
			break
		}
	}
	for _, piece := range board.Pieces[Black] {
		if piece.Role == RB {
			hasBBoss = true
			break
		}
	}
	return !(hasRBoss && hasBBoss)
}

func (board *Board) Clone() *Board {
	var pieces []*Piece
	for _, piece := range board.GetPieces() {
		pieces = append(pieces, piece.Clone())
	}
	return NewBoard(pieces)
}

func (board *Board) GetPieces() []*Piece {
	return append(board.Pieces[Red], board.Pieces[Black]...)
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

func (board *Board) Sum(data []int) int {
	s := 0
	l := len(data)
	const N = 5
	seg := l / N
	var chs [N]<-chan int
	for i := 0; i < N; i++ {
		chs[i] = worker(data[i*seg : (i+1)*seg])
	}
	for i := 0; i < N; i++ {
		s += <-chs[i]
	}
	return s
}

func worker(s []int) <-chan int {
	out := make(chan int)
	go func() {
		length := len(s)
		sum := 0
		for i := 0; i < length; i++ {
			sum += s[i]
		}
		out <- sum
	}()
	return out
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

func (board *Board) GenerateMoves(color Color) []Move {
	pieces := board.Pieces[color]
	var pieceNodes []Move
	for _, p := range pieces {
		positions := p.GetNextPositions(board)
		for _, pos := range positions {
			pieceNodes = append(pieceNodes, Move{To: pos, From: p.Pos})
		}
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
		if len == 0 {
			break
		}
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
