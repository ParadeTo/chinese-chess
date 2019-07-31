import Board from '@/chess/Board'
import { Z, P } from '@/chess/Piece'

describe('X', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new P('r', [1, 7])],
        pos: [1, 7],
        expected: false
      },
      {
        pieces: [new P('r', [1, 7])],
        pos: [1, 4],
        expected: true
      },
      {
        pieces: [new P('r', [1, 7])],
        pos: [1, 8],
        expected: true
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [4, 6]), new Z('r', [4, 5])],
        pos: [4, 4],
        expected: false
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [4, 6]), new Z('b', [4, 5])],
        pos: [4, 5],
        expected: true
      },
      {
        pieces: [new P('r', [1, 7])],
        pos: [5, 7],
        expected: true
      },
      {
        pieces: [new P('r', [1, 7])],
        pos: [0, 7],
        expected: true
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [4, 6])],
        pos: [4, 5],
        expected: false
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [5, 7])],
        pos: [6, 7],
        expected: false
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [5, 7]), new Z('r', [6, 7])],
        pos: [7, 7],
        expected: false
      },
      {
        pieces: [new P('r', [4, 7]), new Z('r', [5, 7]), new Z('b', [6, 7])],
        pos: [6, 7],
        expected: true
      },
      {
        pieces: [new P('r', [4, 7])],
        pos: [3, 5],
        expected: false
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
