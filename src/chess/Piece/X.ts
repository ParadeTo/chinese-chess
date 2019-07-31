import { Piece, Color } from './Piece'
import Board from '../Board'

/**
 * 相 象
 */
export default class X extends Piece {
  constructor(color: Color, pos: number[]) {
    super('x', color, pos)
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest
    const { cells } = board

    if (
      Board.inOwnSide([destX, destY], this.side) &&
      ((destY - origY === 2 && destX - origX === 2 && !cells[origX + 1][origY + 1]) ||
        (destY - origY === 2 && destX - origX === -2 && !cells[origX - 1][origY + 1]) ||
        (destY - origY === -2 && destX - origX === 2 && !cells[origX + 1][origY - 1]) ||
        (destY - origY === -2 && destX - origX === -2 && !cells[origX - 1][origY - 1]))
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    return [[-2, -2], [2, 2], [-2, 2], [2, -2]]
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => this.canMove(pos, board) && Board.inOwnSide(pos, this.side))
  }
}
