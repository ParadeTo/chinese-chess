package main

import (
	"chinese-chess/server/chess"
	"chinese-chess/server/shared"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type NextMoveRequest struct {
	Color  string
	Pieces []chess.Piece
}

func newBoard(c *gin.Context) *chess.Board {
	var data NextMoveRequest
	var board *chess.Board
	var pieces []*chess.Piece
	err := c.BindJSON(&data)
	if err == nil {
		for _, piece := range data.Pieces {
			var p *chess.Piece
			switch piece.Role {
			case chess.RZ:
				p = chess.NewZ(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RJ:
				p = chess.NewJ(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RM:
				p = chess.NewM(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RP:
				p = chess.NewP(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RX:
				p = chess.NewX(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RS:
				p = chess.NewS(piece.Color, piece.Pos, piece.Side, piece.Key)
			case chess.RB:
				p = chess.NewB(piece.Color, piece.Pos, piece.Side, piece.Key)
			}
			pieces = append(pieces, p)
		}
		board = chess.NewBoard(pieces)
	}
	return board
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/next-move", func(c *gin.Context) {
		board := newBoard(c)
		fmt.Printf("%+v\n", board)
		c.String(http.StatusOK, "pong")
	})

	return r
}

func main() {
	//r := setupRouter()
	//r.Run(":8081")
	fmt.Println(shared.INFINITE)
	fmt.Println(-shared.INFINITE)
}
