package main

import (
	"chinese-chess/server/ai/minimax"
	"chinese-chess/server/ai/minimax/eval"
	"chinese-chess/server/chess"
	"github.com/gin-gonic/gin"
	"net/http"
)

var ai *minimax.MiniMax

type NextMoveRequest struct {
	Color  chess.Color
	Pieces []chess.Piece
}

func newBoard(data NextMoveRequest) *chess.Board {
	var pieces []*chess.Piece

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
	board := chess.NewBoard(pieces)
	return board
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	api := r.Group("/api")
	api.POST("/next-move", func(c *gin.Context) {
		var data NextMoveRequest
		err := c.BindJSON(&data)
		if err == nil {
			board := newBoard(data)
			nextMove := ai.GetNextMove(board, data.Color)
			c.JSON(http.StatusOK, nextMove)
			return
		}
		c.JSON(http.StatusNotAcceptable, nil)
	})

	return r
}

func main() {
	ai = minimax.NewMiniMax(4, eval.NewWeightEvalModel(), true)
	r := setupRouter()
	r.Run(":9090")
}
