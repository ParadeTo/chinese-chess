package chess

type IPiece interface {
	CanPlaceAtDest(dest [2]int, board *Board) bool
	GetNextPositions(board *Board) [][2]int
	CanMove(pos [2]int, board *Board) bool
}

type Piece struct {
	IPiece
	Key   string
	Color Color
	Role  Role
	Pos   [2]int
	Side  Side
}

func (p *Piece) CanPlaceAtDest(dest [2]int, board *Board) bool {
	destPiece := board.GetPieceByPos(dest)
	return !(destPiece != nil && destPiece.Color == p.Color)
}

func NewPiece(role Role, color Color, pos [2]int, side Side, key string) *Piece {
	return &Piece{Role: role, Color: color, Pos: pos, Side: side, Key: key}
}
