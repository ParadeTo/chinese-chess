import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * 车
 */
export default class J extends Piece {
  constructor(color: Color, pos: number[], side?: Side) {
    super('j', color, pos, side)
  }

  canMove(dest: number[], board: Board): boolean {
    const { pos: [origX, origY] } = this
    const [destX, destY] = dest
    const { cells } = board

    if (destX === origX && destY === origY) return false

    if (destX === origX) {
      let startY = origY + 1
      let endY = destY - 1
      if (destY < origY) {
        startY = destY + 1
        endY = origY - 1
      }
      for (let i = startY; i <= endY; i++) {
        if (cells[origX][i]) return false
      }
    }

    if (destY === origY) {
      let startX = origX + 1
      let endX = destX - 1
      if (destX < origX) {
        startX = destX + 1
        endX = origX - 1
      }
      for (let i = startX; i <= endX; i++) {
        if (cells[i][origY]) return false
      }
    }

    return this.canPlaceAtDest(dest, board)
  }

  getNextPositions (board: Board) {
    return [[1]]
  }
}
