import Game, { createBoard } from '@/chess/Game'
import Player from '@/chess/Player'
import MiniMaxAI from '@/ai/minimax'

let game: Game
describe('Game.ts', () => {
  beforeEach(() => {
    const board = createBoard()
    const tPlayer = new Player('b', 'ai', new MiniMaxAI({ depth: 3 }))
    const bPlayer = new Player('r', 'human')
    game = new Game(board, bPlayer, tPlayer)
  })

  it('init game', () => {
    let sum = 0
    game.board.cells.forEach(row => {
      row.forEach(cell => {
        if (cell !== null) sum += 1
      })
    })
    expect(sum).toBe(32)
  })

  it('switchPlayer', () => {
    game.switchPlayer()
    expect(game.currentPlayer.color).toBe('b')
  })
})
