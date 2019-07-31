import { Piece, Color } from './Piece'
import Board from '../Board'

/**
 * 炮
 */
export default class P extends Piece {
  constructor(color: Color, pos: number[]) {
    super('p', color, pos)
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest
    const { cells } = board
    const destPiece = board.getPieceByPos(dest)

    if (destX === origX && destY === origY) return false

    if (destX === origX) {
      let startY = origY + 1
      let endY = destY - 1
      if (destY < origY) {
        startY = destY + 1
        endY = origY - 1
      }
      let barriers = 0
      for (let i = startY; i <= endY; i++) {
        if (cells[origX][i]) barriers++
        if (barriers > 1) return false
      }

      return barriers === 1 ? !!destPiece && destPiece.color !== this.color : !destPiece
    }

    if (destY === origY) {
      let startX = origX + 1
      let endX = destX - 1
      if (destX < origX) {
        startX = destX + 1
        endX = origX - 1
      }
      let barriers = 0
      for (let i = startX; i <= endX; i++) {
        if (cells[i][origY]) barriers++
        if (barriers > 1) return false
      }

      return barriers === 1 ? !!destPiece && destPiece.color !== this.color : !destPiece
    }

    return false
  }

  getNextPositions(board: Board): number[][] {
    return [[1]]
  }
}
