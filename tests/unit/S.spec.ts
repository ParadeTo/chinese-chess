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

  it('getNextPositions', () => {
    ;[
      {
        pieces: [new S('r', [5, 9])],
        nextPositions: [[4, 8]]
      },
      {
        pieces: [new S('r', [4, 8])],
        nextPositions: [[3, 7], [5, 9], [3, 9], [5, 7]]
      },
      {
        pieces: [new S('b', [4, 1])],
        nextPositions: [[3, 0], [5, 2], [3, 2], [5, 0]]
      },
      {
        pieces: [new S('b', [3, 0])],
        nextPositions: [[4, 1]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
