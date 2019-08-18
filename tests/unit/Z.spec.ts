import Board from '@/chess/Board'
import { Z, J } from '@/chess/Piece'

describe('Z', () => {
  it('canMove', () => {
    ;[
      {
        pieces: [new Z({ color: 'r', pos: [4, 6] })],
        pos: [4, 5],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 6] })],
        pos: [4, 5],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 6] })],
        pos: [4, 7],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 6] })],
        pos: [4, 7],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 6] })],
        pos: [5, 6],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 6] })],
        pos: [5, 6],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 6] })],
        pos: [3, 6],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 6] })],
        pos: [3, 6],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 3] })],
        pos: [3, 3],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 3] })],
        pos: [3, 3],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 3] })],
        pos: [5, 3],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 3] })],
        pos: [5, 3],
        canMove: false
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 3] }), new J({ color: 'b', pos: [5, 3] })],
        pos: [5, 3],
        canMove: true
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 3] }), new J({ color: 'r', pos: [5, 3] })],
        pos: [5, 3],
        canMove: false,
        notReverse: true
      }
    ].forEach(({ pieces, pos, canMove, notReverse }) => {
      const board = new Board(pieces)
      expect(board.canMove(pieces[0], pos)).toBe(canMove)
      pieces.forEach(p => (p.side = p.side === 'b' ? 't' : 'b'))
      const reversedBoard = new Board(pieces)
      expect(reversedBoard.canMove(pieces[0], pos)).toBe(!notReverse && !canMove)
    })
  })

  it('getNextPositions', () => {
    ;[
      {
        pieces: [new Z({ color: 'r', pos: [4, 6] })],
        nextPositions: [[4, 5]]
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 6] })],
        nextPositions: [[4, 7], [3, 6], [5, 6]]
      },
      {
        pieces: [new Z({ color: 'r', pos: [4, 4] })],
        nextPositions: [[4, 3], [3, 4], [5, 4]]
      },
      {
        pieces: [new Z({ color: 'b', pos: [4, 4] })],
        nextPositions: [[4, 5]]
      },
      {
        pieces: [new Z({ color: 'r', pos: [0, 0] })],
        nextPositions: [[1, 0]]
      },
      {
        pieces: [new Z({ color: 'r', pos: [8, 0] })],
        nextPositions: [[7, 0]]
      },
      {
        pieces: [new Z({ color: 'b', pos: [0, 9] })],
        nextPositions: [[1, 9]]
      },
      {
        pieces: [new Z({ color: 'b', pos: [8, 9] })],
        nextPositions: [[7, 9]]
      }
    ].forEach(({ pieces, nextPositions }) => {
      const board = new Board(pieces)
      nextPositions && expect(board.getNextPositions(pieces[0])).toEqual(nextPositions)
    })
  })
})
