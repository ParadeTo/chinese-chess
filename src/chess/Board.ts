import { Piece, Side } from './Piece/Piece'

export default class Board {
  static WIDTH = 9
  static HEIGHT = 10
  cells: (Piece|null)[][] = []
  currentPlayer = 'r'
  pieces: { [key: string]: Piece } = {}
  constructor (pieces: Piece[]) {
    for (let i = 0; i < Board.HEIGHT; i++) {
      this.cells[i] = []
      for (let j = 0; j < Board.WIDTH; j++) {
        this.cells[i][j] = null
      }
    }
    pieces.forEach(piece => {
      this.cells[piece.pos[0]][piece.pos[1]] = piece
      this.pieces[piece.key] = piece
    })
  }

  static inNinePlace(pos: number[], side: Side) {
    const [x, y] = pos
    return (x >= 3 && x <= 5) && (side === 't' ? y >= 0 && y <= 2 : y >= 7 && y <= 9)
  }

  getPieceByPos(pos: number[]) {
    const [x, y] = pos
    const cells = Object.values(this.cells)
    const destPiece = cells[x][y]
    return destPiece
  }

  canMove(piece: Piece, pos: number[]) {
    return piece.canMove(pos, this)
  }

  updatePiece(key: string, newPos: number[]) {
    const [newX, newY] = newPos
    const orig = this.pieces[key]
    const newPosPiece = this.cells[newX][newY]
    if (newPosPiece) delete this.pieces[key]
    const [origX, origY] = orig.pos
    this.cells[origX][origY] = null
    this.cells[newX][newY] = orig
    orig.pos = newPos
    this.currentPlayer = (this.currentPlayer === 'r') ? 'b' : 'r'
    return newPosPiece
  }
}
