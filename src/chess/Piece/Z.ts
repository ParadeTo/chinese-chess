import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * 卒 兵
 */
export default class Z extends Piece {
  constructor(color: Color, pos: number[], side?: Side) {
    super('z', color, pos, side)
  }

  isCrossedRiver() {
    return (this.side === 'b' && this.pos[1] <= 4) || (this.side === 't' && this.pos[1] >= 5)
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest

    if (
      (this.side === 'b' && destY === origY - 1) ||
      (this.side === 't' && destY === origY + 1) ||
      (this.isCrossedRiver() && Math.abs(destX - origX) === 1)
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }

  // getMoves(pos: number[], board: Board): number[][] {
  //   throw new Error("Method not implemented.");
  // }
}
