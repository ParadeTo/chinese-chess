import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * 马
 */
export default class M extends Piece {
  constructor(params: { color: Color, pos: number[], side?: Side, key?: string }) {
    super({ role: 'm', ...params })
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest
    const { cells } = board

    if (
      (destY - origY === 2 && Math.abs(destX - origX) === 1 && !cells[origX][origY + 1]) ||
      (destY - origY === -2 && Math.abs(destX - origX) === 1 && !cells[origX][origY - 1]) ||
      (destX - origX === 2 && Math.abs(destY - origY) === 1 && !cells[origX + 1][origY]) ||
      (destX - origX === -2 && Math.abs(destY - origY) === 1 && !cells[origX - 1][origY])
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    return [[-2, -1], [2, -1], [-2, 1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]]
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => board.canMove(this, pos))
  }
}
