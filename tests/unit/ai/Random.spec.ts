import RandomAI from '@/ai/random'
import Game, { createGame } from '@/chess/Game'

describe('RandomAI', () => {
  it('listen event', async () => {
    const game = createGame()
    const randomAI = new RandomAI(game.board, 'r')
    expect(await randomAI.getNextMove()).toHaveProperty('piece')
  })
})
