import Board from '@/chess/Board'
import { M, Z } from '@/chess/Piece'

describe('B', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new M('r', [4, 5])],
        pos: [6, 4],
        expected: true
      },
      {
        pieces: [new M('r', [4, 5])],
        pos: [2, 4],
        expected: true
      },
      {
        pieces: [new M('r', [4, 5])],
        pos: [5, 4],
        expected: false
      },
      {
        pieces: [new M('r', [4, 5]), new Z('r', [5, 5])],
        pos: [6, 4],
        expected: false
      },
      {
        pieces: [new M('r', [4, 5])],
        pos: [5, 7],
        expected: true
      },
      {
        pieces: [new M('r', [4, 5])],
        pos: [5, 3],
        expected: true
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
