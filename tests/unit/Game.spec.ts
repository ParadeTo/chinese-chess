import Game, { createGame } from '@/chess/Game'

let game: Game
describe('Game.ts', () => {
  beforeEach(() => {
    game = createGame()
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
