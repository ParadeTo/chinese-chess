import Board from '@/chess/Board'
import { Z, S } from '@/chess/Piece'

describe('S', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new S('r', [5, 9])],
        pos: [4, 8],
        expected: true
      },
      {
        pieces: [new S('r', [5, 9])],
        pos: [5, 8],
        expected: false
      },
      {
        pieces: [new S('r', [5, 9])],
        pos: [6, 8],
        expected: false
      },
      {
        pieces: [new S('r', [4, 9])],
        pos: [5, 8],
        expected: false
      },
      {
        pieces: [new S('r', [5, 9]), new Z('b', [4, 8])],
        pos: [4, 8],
        expected: true
      },
      {
        pieces: [new S('r', [5, 9]), new Z('r', [4, 8])],
        pos: [4, 8],
        expected: false
      },
      {
        pieces: [new S('b', [4, 1])],
        pos: [3, 0],
        expected: true
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
