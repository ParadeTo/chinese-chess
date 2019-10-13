import RandomAI from '@/ai/random'
import Game, { createGame, createBoard } from '@/chess/Game'

describe('RandomAI', () => {
  it('listen event', async () => {
    const board = createBoard()
    const randomAI = new RandomAI()
    expect(await randomAI.getNextMove(board, 'r')).toHaveProperty('from')
  })
})
