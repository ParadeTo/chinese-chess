import WeightEvalModel from '@/ai/minimax/eval/weight'
import Board from '@/chess/Board'
import { createGame } from '@/chess/Game'
import { B, J } from '@/chess/Piece'

describe('WeightEvalModel', () => {
  it('eval a new game', () => {
    const model = new WeightEvalModel()
    const game = createGame()
    expect(model.eval(game.board, 'r')).toBe(0)
    expect(model.eval(game.board, 'b')).toBe(0)
  })

  it('eval board', () => {
    const pieces = [
      new J({ color: 'b', pos: [1, 0], key: 'bj1' }),
      new B({ color: 'b', pos: [4, 0], key: 'bb' }),
      new J({ color: 'r', pos: [8, 9], key: 'rj1' }),
      new B({ color: 'r', pos: [4, 9], key: 'rb' })
    ]
    const board = new Board(pieces)
    const model = new WeightEvalModel()
    expect(model.eval(board, 'b')).toBe(12)
  })
})
