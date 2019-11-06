import { createBoard } from '@/chess/Game'
import MiniMaxAI from '@/ai/minimax'
import { Piece } from '@/chess/Piece'

const pieceNodesNum = {
  j: 4,
  m: 4,
  x: 4,
  s: 2,
  b: 1,
  p: 24,
  z: 5
}

describe('MiniMaxAI', () => {
  it('generateNodes', () => {
    const board = createBoard()
    const moves = board.generateMoves('r')
    const realPieceNodesNum = {
      j: 0,
      m: 0,
      x: 0,
      s: 0,
      b: 0,
      p: 0,
      z: 0
    }
    moves.forEach(move => {
      const {
        from: [x, y]
      } = move
      const piece = board.cells[x][y] as Piece
      realPieceNodesNum[piece.role]++
    })
    expect(realPieceNodesNum).toEqual(pieceNodesNum)
  })
})
