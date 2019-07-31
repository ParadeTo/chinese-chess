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
        pieces: [new X('r', [2, 9]), new X('r', [4, 7])],
        pos: [4, 7],
        expected: false
      },
      {
        pieces: [new X('r', [2, 9])],
        pos: [5, 7],
        expected: false
      },
      {
        pieces: [new X('r', [2, 9]), new Z('r', [3, 8])],
        pos: [4, 7],
        expected: false
      },
      {
        pieces: [new X('r', [2, 5])],
        pos: [0, 3],
        expected: false
      },
      {
        pieces: [new X('b', [2, 0])],
        pos: [4, 2],
        expected: true
      },
      {
        pieces: [new X('b', [2, 0])],
        pos: [0, 2],
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
        pieces: [new X('r', [2, 9])],
        nextPositions: [[0, 7], [4, 7]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
