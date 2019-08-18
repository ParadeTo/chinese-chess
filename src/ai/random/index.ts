import AI, { IAI } from '../AI'
import { Piece } from '@/chess/Piece'

export default class RandomAI extends AI implements IAI {
  static generateRandomNum(n: number): number {
    return Math.floor(Math.random() * n)
  }

  getNextMove(): Promise<{ piece: Piece; dest: number[]; }> {
    const pieces = this.board.pieces[this.color]
    const len = pieces.length
    let moves: number[][] = []
    let piece
    do {
      const i = RandomAI.generateRandomNum(len)
      piece = pieces[i]
      moves = piece.getNextPositions(this.board)
    } while (moves.length === 0)
    const nextPosition = moves[RandomAI.generateRandomNum(moves.length)]
    return Promise.resolve({
      piece,
      dest: nextPosition
    })
  }
}
