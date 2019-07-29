import Board from '@/chess/Board'
import { X, Z } from '@/chess/Piece'

describe('X', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new X('r', [2, 9])],
        pos: [4, 7],
        expected: true
      },
      {
        pieces: [new X('r', [3, 9])],
        pos: [5, 7],
        expected: false
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })
})
