import { Piece, Color } from './Piece'
import Board from '../Board'

/**
 * 士
 */
export default class S extends Piece {
  possiblePos = {
    t: [[3, 0], [5, 0], [4, 1], [3, 2], [5, 2]],
    b: [[3, 9], [5, 9], [4, 8], [3, 7], [5, 7]]
  }

  constructor(color: Color, pos: number[]) {
    super('s', color, pos)
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest

    if (
      this.possiblePos[this.side].some(pos => pos[0] === destX && pos[1] === destY) &&
      (Math.abs(origX - destX) === 1 && Math.abs(origY - destY) === 1)
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    return [[-1, -1], [1, 1], [-1, 1], [1, -1]]
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => this.canMove(pos, board) && Board.inNinePlace(pos, this.side))
  }
}
