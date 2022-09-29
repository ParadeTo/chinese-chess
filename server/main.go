package main

import (
	"chinese-chess/server/ai/minimax"
	"chinese-chess/server/ai/minimax/eval"
	"chinese-chess/server/chess"
	"net/http"

	// "syscall/js"

	"github.com/gin-gonic/gin"
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
	// str := `{"color":"b","pieces":[{"key":"rj1","color":"r","role":"j","pos":[0,9],"selected":false,"side":"b"},{"key":"rm1","color":"r","role":"m","pos":[1,9],"selected":false,"side":"b"},{"key":"rx1","color":"r","role":"x","pos":[2,9],"selected":false,"side":"b"},{"key":"rs1","color":"r","role":"s","pos":[3,9],"selected":false,"side":"b","possiblePos":{"t":[[3,0],[5,0],[4,1],[3,2],[5,2]],"b":[[3,9],[5,9],[4,8],[3,7],[5,7]]}},{"key":"rb","color":"r","role":"b","pos":[4,9],"selected":false,"side":"b"},{"key":"rs2","color":"r","role":"s","pos":[5,9],"selected":false,"side":"b","possiblePos":{"t":[[3,0],[5,0],[4,1],[3,2],[5,2]],"b":[[3,9],[5,9],[4,8],[3,7],[5,7]]}},{"key":"rx2","color":"r","role":"x","pos":[4,7],"selected":true,"side":"b"},{"key":"rm2","color":"r","role":"m","pos":[7,9],"selected":false,"side":"b"},{"key":"rj2","color":"r","role":"j","pos":[8,9],"selected":false,"side":"b"},{"key":"rp1","color":"r","role":"p","pos":[1,7],"selected":false,"side":"b"},{"key":"rp2","color":"r","role":"p","pos":[7,7],"selected":false,"side":"b"},{"key":"rz1","color":"r","role":"z","pos":[0,6],"selected":false,"side":"b"},{"key":"rz2","color":"r","role":"z","pos":[2,6],"selected":false,"side":"b"},{"key":"rz3","color":"r","role":"z","pos":[4,6],"selected":false,"side":"b"},{"key":"rz4","color":"r","role":"z","pos":[6,6],"selected":false,"side":"b"},{"key":"rz5","color":"r","role":"z","pos":[8,6],"selected":false,"side":"b"},{"key":"bj1","color":"b","role":"j","pos":[0,0],"selected":false,"side":"t"},{"key":"bm1","color":"b","role":"m","pos":[1,0],"selected":false,"side":"t"},{"key":"bx1","color":"b","role":"x","pos":[2,0],"selected":false,"side":"t"},{"key":"bs1","color":"b","role":"s","pos":[3,0],"selected":false,"side":"t","possiblePos":{"t":[[3,0],[5,0],[4,1],[3,2],[5,2]],"b":[[3,9],[5,9],[4,8],[3,7],[5,7]]}},{"key":"bb","color":"b","role":"b","pos":[4,0],"selected":false,"side":"t"},{"key":"bs2","color":"b","role":"s","pos":[5,0],"selected":false,"side":"t","possiblePos":{"t":[[3,0],[5,0],[4,1],[3,2],[5,2]],"b":[[3,9],[5,9],[4,8],[3,7],[5,7]]}},{"key":"bx2","color":"b","role":"x","pos":[6,0],"selected":false,"side":"t"},{"key":"bm2","color":"b","role":"m","pos":[7,0],"selected":false,"side":"t"},{"key":"bj2","color":"b","role":"j","pos":[8,0],"selected":false,"side":"t"},{"key":"bp1","color":"b","role":"p","pos":[1,2],"selected":false,"side":"t"},{"key":"bp2","color":"b","role":"p","pos":[7,2],"selected":false,"side":"t"},{"key":"bz1","color":"b","role":"z","pos":[0,3],"selected":false,"side":"t"},{"key":"bz2","color":"b","role":"z","pos":[2,3],"selected":false,"side":"t"},{"key":"bz3","color":"b","role":"z","pos":[4,3],"selected":false,"side":"t"},{"key":"bz4","color":"b","role":"z","pos":[6,3],"selected":false,"side":"t"},{"key":"bz5","color":"b","role":"z","pos":[8,3],"selected":false,"side":"t"}]}`
	// var data NextMoveRequest
	// json.Unmarshal([]byte(str), &data)
	// board := newBoard(data)
	// nextMove := ai.GetNextMove(board, data.Color)
	// fmt.Println(nextMove)
	// c := make(chan struct{}, 0)
	// js.Global().Set("wGetNextMove", js.FuncOf(getNextMove))
	// <-c
}

type TestData struct {
	name string
}

// func getNextMove(this js.Value, args []js.Value) any {
// 	var hello string = "Hello, JS!"
// 	var data NextMoveRequest
// 	err := json.Unmarshal([]byte(args[0].String()), &data)
// 	if err == nil {
// 		board := newBoard(data)
// 		nextMove := ai.GetNextMove(board, data.Color)
// 		fmt.Println(nextMove)
// 	} else {
// 		fmt.Println(err)
// 	}
// 	return hello
// }

// https://tinygo.org/docs/guides/webassembly/
// https://binx.io/2022/04/22/golang-webassembly/
