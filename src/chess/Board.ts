import { Piece } from './Piece/Piece'

export default class Board {
  static COL = 9
  static ROW = 10
  cells: (Piece|null)[][]
  constructor (pieces: Piece[]) {
    this.cells = []
    for (let i = 0; i < Board.ROW; i++) {
      this.cells[i] = []
      for (let j = 0; j < Board.COL; j++) {
        this.cells[i][j] = null
      }
    }
    pieces.forEach(piece => {
      this.cells[piece.pos[0]][piece.pos[1]] = piece
    })
  }
}
