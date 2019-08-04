import { Piece, Side } from './Piece/Piece'

export default class Board {
  static WIDTH = 9
  static HEIGHT = 10
  cells: (Piece | null)[][] = []
  currentPlayer = 'r'
  pieces: Piece[] = []
  constructor(pieces: Piece[]) {
    for (let i = 0; i < Board.HEIGHT; i++) {
      this.cells[i] = []
      for (let j = 0; j < Board.WIDTH; j++) {
        this.cells[i][j] = null
      }
    }
    pieces.forEach(piece => {
      this.cells[piece.pos[0]][piece.pos[1]] = piece
      this.pieces.push(piece)
    })
  }

  static inNinePlace(pos: number[], side: Side) {
    const [x, y] = pos
    return x >= 3 && x <= 5 && (side === 't' ? y >= 0 && y <= 2 : y >= 7 && y <= 9)
  }

  static inBoard(pos: number[]) {
    const [x, y] = pos
    return x >= 0 && x <= 8 && y >= 0 && y <= 9
  }

  static inOwnSide(pos: number[], side: Side) {
    const [x, y] = pos
    return (y >= 0 && y < 5 && side === 't') || (y > 4 && y < Board.HEIGHT && side === 'b')
  }

  getPieceByPos(pos: number[]) {
    const [x, y] = pos
    const cells = Object.values(this.cells)
    const destPiece = cells[x][y]
    return destPiece
  }

  canMove(piece: Piece, pos: number[]) {
    return Board.inBoard(pos) && piece.canMove(pos, this)
  }

  getNextPositions(piece: Piece): number[][] {
    return piece.getNextPositions(this)
  }

  getPieceNum(): number {
    let num = 0
    this.cells.forEach(row =>
      row.forEach(cell => {
        if (cell) num++
      })
    )
    return num
  }

  updatePiece(piece: Piece, newPos: number[]) {
    if (!this.canMove(piece, newPos)) return false
    const [newX, newY] = newPos
    const newPosPiece = this.cells[newX][newY]
    if (newPosPiece) {
      const index = this.pieces.findIndex(piece => piece === newPosPiece)
      this.pieces.splice(index, 1)
    }
    const [origX, origY] = piece.pos
    this.cells[origX][origY] = null
    this.cells[newX][newY] = piece
    piece.pos = newPos
    this.currentPlayer = this.currentPlayer === 'r' ? 'b' : 'r'
    return newPosPiece
  }
}
