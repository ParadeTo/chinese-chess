import { Game } from '@/chess/Game'

describe('Game.ts', () => {
  it('init game', () => {
    const game = new Game()
    let sum = 0
    game.board.cells.forEach(row => {
      row.forEach(cell => {
        if (cell !== null) sum += 1
      })
    })
    expect(sum).toBe(32)
  })
})
