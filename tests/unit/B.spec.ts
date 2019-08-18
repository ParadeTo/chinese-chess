import Board from '@/chess/Board'
import { B, Z } from '@/chess/Piece'

describe('B', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new B({ color: 'r', pos: [5, 9] })],
        pos: [6, 9],
        expected: false
      },
      {
        pieces: [new B({ color: 'r', pos: [5, 9] })],
        pos: [3, 9],
        expected: false
      },
      {
        pieces: [new B({ color: 'r', pos: [5, 9] })],
        pos: [4, 9],
        expected: true
      },
      {
        pieces: [new B({ color: 'r', pos: [3, 9] })],
        pos: [2, 9],
        expected: false
      },
      {
        pieces: [new B({ color: 'r', pos: [3, 7] })],
        pos: [3, 6],
        expected: false
      },
      {
        pieces: [new B({ color: 'b', pos: [5, 9] })],
        pos: [6, 9],
        expected: false
      },
      {
        pieces: [new B({ color: 'b', pos: [5, 9] })],
        pos: [3, 9],
        expected: false
      },
      {
        pieces: [new B({ color: 'b', pos: [5, 9], side: 'b' })],
        pos: [4, 9],
        expected: true
      },
      {
        pieces: [new B({ color: 'r', pos: [3, 2], side: 't' })],
        pos: [3, 3],
        expected: false
      },
      {
        pieces: [new B({ color: 'b', pos: [3, 2] }), new Z({ color: 'r', pos: [3, 1] })],
        pos: [3, 1],
        expected: true
      },
      {
        pieces: [new B({ color: 'b', pos: [3, 2] }), new Z({ color: 'b', pos: [3, 1] })],
        pos: [3, 1],
        expected: false
      }
    ].forEach(({ pieces, pos, expected }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
    })
  })

  it('getNextPositions', () => {
    ;[
      {
        pieces: [new B({ color: 'r', pos: [5, 9] })],
        nextPositions: [[4, 9], [5, 8]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
