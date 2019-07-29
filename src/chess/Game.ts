import Board from './Board'
import { Piece, B, J, M, P, S, X, Z } from './Piece'

export default class Game {
  board: Board
  constructor () {
    const pieces = [
      new J('b', [0, 0]),
      new M('b', [1, 0]),
      new X('b', [2, 0]),
      new S('b', [3, 0]),
      new B('b', [4, 0]),
      new S('b', [5, 0]),
      new X('b', [6, 0]),
      new M('b', [7, 0]),
      new J('b', [8, 0]),
      new P('b', [1, 2]),
      new P('b', [7, 2]),
      new Z('b', [0, 3]),
      new Z('b', [2, 3]),
      new Z('b', [4, 3]),
      new Z('b', [6, 3]),
      new Z('b', [8, 3]),

      new J('r', [0, 9]),
      new M('r', [1, 9]),
      new X('r', [2, 9]),
      new S('r', [3, 9]),
      new B('r', [4, 9]),
      new S('r', [5, 9]),
      new X('r', [6, 9]),
      new M('r', [7, 9]),
      new J('r', [8, 9]),
      new P('r', [1, 7]),
      new Z('r', [7, 7]),
      new Z('r', [0, 6]),
      new Z('r', [2, 6]),
      new Z('r', [4, 6]),
      new Z('r', [6, 6]),
      new Z('r', [8, 6])
    ]
    this.board = new Board(pieces)
  }
}
