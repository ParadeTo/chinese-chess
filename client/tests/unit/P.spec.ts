import Board from '@/chess/Board'
import { Z, P } from '@/chess/Piece'

describe('X', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new P({ color: 'r', pos: [1, 7] })],
        pos: [1, 7],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [1, 7] })],
        pos: [1, 4],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [1, 7] })],
        pos: [1, 8],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [4, 6] }), new Z({ color: 'r', pos: [4, 5] })],
        pos: [4, 4],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [4, 6] }), new Z({ color: 'b', pos: [4, 5] })],
        pos: [4, 5],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [1, 7] })],
        pos: [5, 7],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [1, 7] })],
        pos: [0, 7],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [4, 6] })],
        pos: [4, 5],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [5, 7] })],
        pos: [6, 7],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [5, 7] }), new Z({ color: 'r', pos: [6, 7] })],
        pos: [7, 7],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [5, 7] }), new Z({ color: 'b', pos: [6, 7] })],
        pos: [6, 7],
        expected: true
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] })],
        pos: [3, 5],
        expected: false
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 7] })],
        pos: [4, 5],
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
        pieces: [new P({ color: 'r', pos: [4, 5] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [3, 5] }), new Z({ color: 'r', pos: [5, 5] }), new Z({ color: 'b', pos: [7, 5] })],
        nextPositions: [[2, 5], [1, 5], [0, 5], [4, 5], [7, 5], [3, 4], [3, 3], [3, 2], [3, 1], [3, 0], [3, 6], [3, 7], [3, 8], [3, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [3, 5] }), new Z({ color: 'r', pos: [5, 5] }), new Z({ color: 'r', pos: [7, 5] })],
        nextPositions: [[2, 5], [1, 5], [0, 5], [4, 5], [3, 4], [3, 3], [3, 2], [3, 1], [3, 0], [3, 6], [3, 7], [3, 8], [3, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [5, 5] }), new Z({ color: 'r', pos: [3, 5] }), new Z({ color: 'b', pos: [1, 5] })],
        nextPositions: [[4, 5], [1, 5], [6, 5], [7, 5], [8, 5], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0], [5, 6], [5, 7], [5, 8], [5, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [5, 5] }), new Z({ color: 'r', pos: [3, 5] }), new Z({ color: 'r', pos: [1, 5] })],
        nextPositions: [[4, 5], [6, 5], [7, 5], [8, 5], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0], [5, 6], [5, 7], [5, 8], [5, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 7] }), new Z({ color: 'b', pos: [4, 9] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6], [4, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 7] }), new Z({ color: 'r', pos: [4, 9] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [4, 6]]
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 3] }), new Z({ color: 'b', pos: [4, 0] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 0], [4, 6], [4, 7], [4, 8], [4, 9]]
      },
      {
        pieces: [new P({ color: 'r', pos: [4, 5] }), new Z({ color: 'r', pos: [4, 3] }), new Z({ color: 'r', pos: [4, 0] })],
        nextPositions: [[3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [6, 5], [7, 5], [8, 5], [4, 4], [4, 6], [4, 7], [4, 8], [4, 9]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
