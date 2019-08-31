import RandomAI from '@/ai/random'
import Game, { createGame } from '@/chess/Game'

describe('RandomAI', () => {
  it('listen event', async () => {
    const game = createGame()
    const randomAI = new RandomAI()
    expect(await randomAI.getNextMove(game.board, 'r')).toHaveProperty('piece')
  })
})
