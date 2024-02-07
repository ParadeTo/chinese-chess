import { IAI } from '../AI'
import { Piece, Color } from '@/chess/Piece'
import Board from '@/chess/Board'

export default class RandomAI implements IAI {
  updatePiece(piece: Piece, newPos: number[]): void {}
  static generateRandomNum(n: number): number {
    return Math.floor(Math.random() * n)
  }

  getNextMove(board: Board, color: Color): Promise<{ from: number[]; to: number[] }> {
    const pieces = board.pieces[color]
    const len = pieces.length
    let moves: number[][] = []
    let piece
    do {
      const i = RandomAI.generateRandomNum(len)
      piece = pieces[i]
      moves = piece.getNextPositions(board)
    } while (moves.length === 0)
    const nextPosition = moves[RandomAI.generateRandomNum(moves.length)]
    return Promise.resolve({
      from: piece.pos,
      to: nextPosition,
    })
  }
}
