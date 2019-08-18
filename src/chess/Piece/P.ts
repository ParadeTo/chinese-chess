import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * 炮
 */
export default class P extends Piece {
  constructor(params: { color: Color, pos: number[], side?: Side, key?: string }) {
    super({ role: 'p', ...params })
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
    const {
      pos: [currentX, currentY]
    } = this
    const { cells } = board
    const positions = []
    let i = currentX - 1
    while (i >= 0) {
      const piece1 = cells[i][currentY]
      if (piece1) {
        let j = i - 1
        while (j >= 0) {
          const piece2 = cells[j][currentY]
          if (piece2) {
            if (piece2.color !== this.color) positions.push([j, currentY])
            break
          }
          j--
        }
        break
      }
      positions.push([i, currentY])
      i--
    }
    i = currentX + 1
    while (i < Board.WIDTH) {
      const pos = [i, currentY]
      const piece1 = cells[i][currentY]
      if (piece1) {
        let j = i + 1
        while (j < Board.WIDTH) {
          const piece2 = cells[j][currentY]
          if (piece2) {
            if (piece2.color !== this.color) positions.push([j, currentY])
            break
          }
          j++
        }
        break
      }
      positions.push(pos)
      i++
    }
    i = currentY - 1
    while (i >= 0) {
      const piece1 = cells[currentX][i]
      if (piece1) {
        let j = i - 1
        while (j >= 0) {
          const piece2 = cells[currentX][j]
          if (piece2) {
            if (piece2.color !== this.color) positions.push([currentX, j])
            break
          }
          j--
        }
        break
      }
      positions.push([currentX, i])
      i--
    }
    i = currentY + 1
    while (i < Board.HEIGHT) {
      const piece1 = cells[currentX][i]
      if (piece1) {
        let j = i + 1
        while (j < Board.HEIGHT) {
          const piece2 = cells[currentX][j]
          if (piece2) {
            if (piece2.color !== this.color) positions.push([currentX, j])
            break
          }
          j++
        }
        break
      }
      positions.push([currentX, i])
      i++
    }
    return positions
  }
}
