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

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    const moves = []
    if (this.side === 'b') {
      if (currentY > 4) {
        moves.push([0, -1])
      } else {
        if (currentY - 1 >= 0) moves.push([0, -1])
        if (currentX - 1 >= 0) moves.push([-1, 0])
        if (currentX + 1 < Board.WIDTH) moves.push([1, 0])
      }
    } else {
      if (currentY < 5) {
        moves.push([0, 1])
      } else {
        if (currentY + 1 < Board.HEIGHT) moves.push([0, 1])
        if (currentX - 1 >= 0) moves.push([-1, 0])
        if (currentX + 1 < Board.WIDTH) moves.push([1, 0])
      }
    }
    return moves
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => this.canMove(pos, board))
  }
}
