import Board from '@/chess/Board'
import { J, Z } from '@/chess/Piece'

describe('J', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new J('r', [0, 0])],
        pos: [0, 1],
        expected: true
      },
      {
        pieces: [new J('r', [0, 0]), new Z('r', [0, 1])],
        pos: [0, 4],
        expected: false
      },
      {
        pieces: [new J('r', [0, 0]), new Z('r', [3, 0])],
        pos: [3, 0],
        expected: false
      },
      {
        pieces: [new J('r', [0, 0]), new Z('b', [1, 0])],
        pos: [1, 0],
        expected: true
      },
      {
        pieces: [new J('r', [0, 0]), new Z('b', [1, 0])],
        pos: [2, 0],
        expected: false
      },
      {
        pieces: [new J('r', [0, 0]), new Z('b', [1, 0])],
        pos: [0, 0],
        expected: false
      },
      {
        pieces: [new J('r', [0, 9]), new Z('b', [0, 3])],
        pos: [0, 0],
        expected: false
      },
      {
        pieces: [new J('r', [9, 0]), new Z('b', [0, 0])],
        pos: [0, 0],
        expected: true
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
