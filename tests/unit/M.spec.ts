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

  it('getNextPositions', () => {
    ;[
      {
        pieces: [new M('r', [1, 9])],
        nextPositions: [[3, 8], [0, 7], [2, 7]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
