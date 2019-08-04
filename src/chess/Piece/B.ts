import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * boss
 */
export default class B extends Piece {
  constructor(color: Color, pos: number[], side?: Side) {
    super('b', color, pos, side)
  }

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    return [[-1, 0], [1, 0], [0, 1], [0, -1]]
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => this.canMove(pos, board))
  }

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
