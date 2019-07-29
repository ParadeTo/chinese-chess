import { Piece, Color } from './Piece'
import Board from '../Board'

/**
 * 炮
 */
export default class P extends Piece {
  constructor(color: Color, pos: number[]) {
    super('p', color, pos)
  }

  canMove(pos: number[], board: Board): boolean {
    throw new Error('Method not implemented.')
  }
  // getMoves (pos: number[], board: Board) {
  //   return [[1]]
  // }
}
