import { createBoard } from '@/chess/Game'
import MiniMaxAI from '@/ai/minimax'
import { Piece } from '@/chess/Piece'

const pieceNodesNum = {
  j: 2,
  m: 2,
  x: 2,
  s: 1,
  b: 1,
  p: 12,
  z: 1
}

describe('MiniMaxAI', () => {
  it('generateNodes', () => {
    const board = createBoard()
    const piecesNodes = board.generateMoves('r')
    piecesNodes.forEach(pieceNodes => {
      const {
        from: [x, y]
      } = pieceNodes
      const piece = board.cells[x][y] as Piece
      expect(pieceNodes.nodes.length).toBe(pieceNodesNum[piece.role])
    })
  })
})
