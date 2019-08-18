import Board from '@/chess/Board'
import { Piece, J, Z, Color } from '@/chess/Piece'

describe('Board', () => {
  it('updatePiece', () => {
    ;[
      {
        pieces: [new J({ color: 'r', pos: [4, 5] })],
        pos: [4, 5],
        newPos: [4, 5],
        eaten: false,
        canMove: false
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] })],
        pos: [4, 5],
        newPos: [5, 5],
        eaten: false,
        canMove: true
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'b', pos: [4, 6] })],
        pos: [4, 5],
        newPos: [4, 6],
        eaten: true,
        canMove: true,
        currentPlayer: 'b'
      }
    ].forEach(({ pieces, pos, newPos, eaten, canMove, currentPlayer }) => {
      const board = new Board(pieces)
      const pieceNum = board.getPieceNum()
      if (currentPlayer) board.currentPlayer = currentPlayer as Color
      const piece = board.cells[pos[0]][pos[1]] as Piece
      board.updatePiece(piece, newPos)
      if (canMove) {
        expect(board.cells[pos[0]][pos[1]]).toBe(null)
        expect(board.cells[newPos[0]][newPos[1]]).toBe(piece)
        if (eaten) expect(board.getPieceNum()).toBe(pieceNum - 1)
      }
    })
  })
})
