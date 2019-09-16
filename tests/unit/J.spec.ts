import Board from '@/chess/Board'
import { J, Z } from '@/chess/Piece'

describe('J', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new J({ color: 'r', pos: [0, 0] })],
        pos: [0, 1],
        expected: true
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 0] }), new Z({ color: 'r', pos: [0, 1] })],
        pos: [0, 4],
        expected: false
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 0] }), new Z({ color: 'r', pos: [3, 0] })],
        pos: [3, 0],
        expected: false
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 0] }), new Z({ color: 'b', pos: [1, 0] })],
        pos: [1, 0],
        expected: true
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 0] }), new Z({ color: 'b', pos: [1, 0] })],
        pos: [2, 0],
        expected: false
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 0] }), new Z({ color: 'b', pos: [1, 0] })],
        pos: [0, 0],
        expected: false
      },
      {
        pieces: [new J({ color: 'r', pos: [0, 9] }), new Z({ color: 'b', pos: [0, 3] })],
        pos: [0, 0],
        expected: false
      },
      {
        pieces: [new J({ color: 'r', pos: [8, 0] }), new Z({ color: 'b', pos: [0, 0] })],
        pos: [0, 0],
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
        pieces: [new J({ color: 'r', pos: [4, 4] })],
        nextPositions: [[3, 4], [2, 4], [1, 4], [0, 4], [5, 4], [6, 4], [7, 4], [8, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 4] }), new Z({ color: 'r', pos: [5, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'b', pos: [4, 4] }), new Z({ color: 'r', pos: [5, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [4, 4], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'b', pos: [4, 6] }), new Z({ color: 'r', pos: [5, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 6] }), new Z({ color: 'r', pos: [5, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 4] }), new Z({ color: 'b', pos: [5, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [3, 5] })],
        nextPositions: [[5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'b', pos: [3, 5] }), new Z({ color: 'b', pos: [4, 6] })],
        nextPositions: [[3, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
