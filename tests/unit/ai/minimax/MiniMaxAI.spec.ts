import { createGame } from '@/chess/Game'
import MiniMaxAI from '@/ai/minimax'

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
    const game = createGame()
    const minimaxAI = new MiniMaxAI({ board: game.board, color: 'r', depth: 2 })
    const piecesNodes = minimaxAI.generateNodes(true)
    piecesNodes.forEach(pieceNodes => {
      expect(pieceNodes.nodes.length).toBe(pieceNodesNum[pieceNodes.piece.role])
    })
  })
})
