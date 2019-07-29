import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * boss
 */
export default class B extends Piece {
  constructor(color: Color, pos: number[], side?: Side) {
    super('b', color, pos, side)
  }

  // getMoves(pos: number[], board: Board) {
  //   return [[1]]
  // }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest

    if (
      Board.inNinePlace(dest, this.side) &&
      ((origX === destX && Math.abs(origY - destY) === 1) ||
        (origY === destY && Math.abs(origX - destX) === 1))
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }
}
