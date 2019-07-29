import { Piece, Color } from './Piece'
import Board from '../Board'

/**
 * 相 象
 */
export default class X extends Piece {
  possiblePos = {
    t: [[0, 2], [2, 0], [2, 4], [4, 2], [6, 0], [6, 4], [8, 2]],
    b: [[0, 7], [2, 9], [2, 5], [4, 7], [6, 9], [6, 5], [8, 7]]
  }

  constructor(color: Color, pos: number[]) {
    super('x', color, pos)
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest

    if (
      this.possiblePos[this.side].some(pos => pos[0] === destX && pos[1] === destY) &&
      (Math.abs(origX - destX) === 2 && Math.abs(origY - destY) === 2)
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }

  // getMoves (pos: number[], board: Board) {
  //   return [[1]]
  // }
}
