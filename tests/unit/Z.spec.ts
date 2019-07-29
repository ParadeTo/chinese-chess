import Board from '@/chess/Board'
import { Z, J } from '@/chess/Piece'

describe('Z', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new Z('r', [4, 6])],
        pos: [4, 5],
        expected: true
      },
      {
        pieces: [new Z('b', [4, 6])],
        pos: [4, 5],
        expected: false
      },
      {
        pieces: [new Z('r', [4, 6])],
        pos: [4, 7],
        expected: false
      },
      {
        pieces: [new Z('b', [4, 6])],
        pos: [4, 7],
        expected: true
      },
      {
        pieces: [new Z('r', [4, 6])],
        pos: [5, 6],
        expected: false
      },
      {
        pieces: [new Z('b', [4, 6])],
        pos: [5, 6],
        expected: true
      },
      {
        pieces: [new Z('r', [4, 6])],
        pos: [3, 6],
        expected: false
      },
      {
        pieces: [new Z('b', [4, 6])],
        pos: [3, 6],
        expected: true
      },
      {
        pieces: [new Z('r', [4, 3])],
        pos: [3, 3],
        expected: true
      },
      {
        pieces: [new Z('b', [4, 3])],
        pos: [3, 3],
        expected: false
      },
      {
        pieces: [new Z('r', [4, 3])],
        pos: [5, 3],
        expected: true
      },
      {
        pieces: [new Z('b', [4, 3])],
        pos: [5, 3],
        expected: false
      },
      {
        pieces: [new Z('r', [4, 3]), new J('b', [5, 3])],
        pos: [5, 3],
        expected: true
      },
      {
        pieces: [new Z('r', [4, 3]), new J('r', [5, 3])],
        pos: [5, 3],
        expected: false,
        notReverse: true
      }
    ].forEach(({ pieces, pos, expected, notReverse }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(expected)
      pieces.forEach(p => (p.side = p.side === 'b' ? 't' : 'b'))
      const reversedBoard = new Board(pieces)
      expect(reversedBoard.canMove(pieces[0], pos)).toBe(!notReverse && !expected)
    })
  })
})
