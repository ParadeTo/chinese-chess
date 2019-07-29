import Board from '@/chess/Board'
import { B, Z } from '@/chess/Piece'

describe('B', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new B('r', [5, 9])],
        pos: [6, 9],
        expected: false
      },
      {
        pieces: [new B('r', [5, 9])],
        pos: [3, 9],
        expected: false
      },
      {
        pieces: [new B('r', [5, 9])],
        pos: [4, 9],
        expected: true
      },
      {
        pieces: [new B('r', [3, 9])],
        pos: [2, 9],
        expected: false
      },
      {
        pieces: [new B('r', [3, 7])],
        pos: [3, 6],
        expected: false
      },
      {
        pieces: [new B('b', [5, 9])],
        pos: [6, 9],
        expected: false
      },
      {
        pieces: [new B('b', [5, 9])],
        pos: [3, 9],
        expected: false
      },
      {
        pieces: [new B('b', [5, 9], 'b')],
        pos: [4, 9],
        expected: true
      },
      {
        pieces: [new B('r', [3, 2], 't')],
        pos: [3, 3],
        expected: false
      },
      {
        pieces: [new B('b', [3, 2]), new Z('r', [3, 1])],
        pos: [3, 1],
        expected: true
      },
      {
        pieces: [new B('b', [3, 2]), new Z('b', [3, 1])],
        pos: [3, 1],
        expected: false
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
