import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * 车
 */
export default class J extends Piece {
  constructor(params: { color: Color; pos: number[]; side?: Side; key?: string }) {
    super({ role: 'j', ...params })
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest
    const { cells } = board

    if ((destX === origX && destY === origY) || (destX !== origX && destY !== origY)) return false

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

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this
    const { cells } = board
    const positions = []
    let i = currentX - 1
    while (i >= 0) {
      const pos = [i, currentY]
      const piece = cells[i][currentY]
      if (piece) {
        if (piece.color !== this.color) positions.push(pos)
        break
      }
      positions.push(pos)
      i--
    }
    i = currentX + 1
    while (i < Board.WIDTH) {
      const pos = [i, currentY]
      const piece = cells[i][currentY]
      if (piece) {
        if (piece.color !== this.color) positions.push(pos)
        break
      }
      positions.push(pos)
      i++
    }
    i = currentY - 1
    while (i >= 0) {
      const pos = [currentX, i]
      const piece = cells[currentX][i]
      if (piece) {
        if (piece.color !== this.color) positions.push(pos)
        break
      }
      positions.push(pos)
      i--
    }
    i = currentY + 1
    while (i < Board.HEIGHT) {
      const pos = [currentX, i]
      const piece = cells[currentX][i]
      if (piece) {
        if (piece.color !== this.color) positions.push(pos)
        break
      }
      positions.push(pos)
      i++
    }
    return positions
  }
}
