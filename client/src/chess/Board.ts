import { Piece, Side, Color } from './Piece/Piece'

export type UpdatePieceResult = { result: boolean; eatenPiece?: Piece | null }

export interface IRecord {
  from: number[]
  to: number[]
  eaten: Piece | null
}

export interface IPieceMoves {
  from: number[]
  nodes: {
    to: number[]
    value: number
  }[]
}

export default class Board {
  static WIDTH = 9
  static HEIGHT = 10

  public currentPlayer: Color = 'r'
  public readonly cells: (Piece | null)[][] = []
  public readonly pieces: {
    [key in Color]: Piece[]
  } = {
    r: [],
    b: []
  }

  private readonly records: IRecord[] = []

  constructor(pieces: Piece[]) {
    for (let i = 0; i < Board.WIDTH; i++) {
      this.cells[i] = []
      for (let j = 0; j < Board.HEIGHT; j++) {
        this.cells[i][j] = null
      }
    }
    pieces.forEach(piece => {
      this.cells[piece.pos[0]][piece.pos[1]] = piece
      this.pieces[piece.color].push(piece)
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

  generateMoves(color: Color) {
    const pieces = this.pieces[color]
    const piecesNodes: IPieceMoves[] = []
    for (let piece of pieces) {
      const nodes = piece.getNextPositions(this).map(pos => ({
        to: pos,
        value: -Infinity
      }))
      const pieceNodes = { from: piece.pos, nodes }
      piecesNodes.push(pieceNodes)
    }
    return piecesNodes
  }

  isFinish () {
    return !(this.pieces.r.find(piece => piece.role === 'b') && this.pieces.b.find(piece => piece.role === 'b'))
  }

  getAllPieces() {
    return [...this.pieces.r, ...this.pieces.b]
  }

  getPieceByPos(pos: number[]) {
    const [x, y] = pos
    const destPiece = this.cells[x][y]
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

  updatePiece(piece: Piece, newPos: number[]): UpdatePieceResult {
    if (!this.canMove(piece, newPos)) return { result: false }

    const [newX, newY] = newPos
    const eatenPiece = this.cells[newX][newY]
    if (eatenPiece) {
      const pieces = this.pieces[eatenPiece.color]
      const index = pieces.findIndex(piece => piece === eatenPiece)
      pieces.splice(index, 1)
    }

    const [origX, origY] = piece.pos
    this.cells[origX][origY] = null
    this.cells[newX][newY] = piece
    piece.pos = newPos
    this.currentPlayer = this.currentPlayer === 'r' ? 'b' : 'r'

    this.records.push({
      from: [origX, origY],
      to: newPos,
      eaten: eatenPiece
    })

    return { result: true, eatenPiece }
  }

  backMoves(steps: number = 1) {
    while (steps--) {
      const lastMove = this.records.pop()
      if (lastMove) {
        const { from, to, eaten } = lastMove
        const piece = this.cells[to[0]][to[1]] as Piece
        piece.pos = from
        this.cells[from[0]][from[1]] = this.cells[to[0]][to[1]]
        this.cells[to[0]][to[1]] = eaten || null
        if (eaten) {
          this.pieces[eaten.color].push(eaten)
          eaten.pos = to
        }
      }
    }
  }
}
