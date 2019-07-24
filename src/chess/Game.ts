import Board from './Board'
import { Piece, B, J, M, P, S, X, Z } from './Piece'

export class Game {
  board: Board
  constructor () {
    const pieces = [
      new B('bj0', [0, 0]),
      new B('bm0', [0, 1]),
      new B('bx0', [0, 2]),
      new B('bs0', [0, 3]),
      new B('bb0', [0, 4]),
      new B('bs1', [0, 5]),
      new B('bx1', [0, 6]),
      new B('bm1', [0, 7]),
      new B('bj1', [0, 8]),
      new B('bp0', [2, 1]),
      new B('bp1', [2, 7]),
      new B('bz0', [3, 0]),
      new B('bz1', [3, 2]),
      new B('bz2', [3, 4]),
      new B('bz3', [3, 6]),
      new B('bz4', [3, 8]),

      new B('rj0', [9, 0]),
      new B('rm0', [9, 1]),
      new B('rx0', [9, 2]),
      new B('rs0', [9, 3]),
      new B('rb0', [9, 4]),
      new B('rs1', [9, 5]),
      new B('rx1', [9, 6]),
      new B('rm1', [9, 7]),
      new B('rj1', [9, 8]),
      new B('rp0', [7, 1]),
      new B('rp1', [7, 7]),
      new B('rz0', [6, 0]),
      new B('rz1', [6, 2]),
      new B('rz2', [6, 4]),
      new B('rz3', [6, 6]),
      new B('rz4', [6, 8])
    ]
    this.board = new Board(pieces)
  }
}
