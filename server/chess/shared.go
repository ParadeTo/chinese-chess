package chess

type Color string

const (
	Red   Color = "r"
	Black Color = "b"
)

type Side string

const (
	Top    Side = "t"
	Bottom Side = "b"
)

type Role string

const (
	RJ Role = "j"
	RM Role = "m"
	RX Role = "x"
	RS Role = "s"
	RB Role = "b"
	RP Role = "p"
	RZ Role = "z"
)

const (
	WIDTH  = 9
	HEIGHT = 10
)

const (
	INFINITE = 9999999
)

type TestDataCanMove struct {
	pieces   []*Piece
	pos      [2]int
	expected bool
}

type TestDataGetNextPositions struct {
	pieces        []*Piece
	nextPositions [][2]int
}
