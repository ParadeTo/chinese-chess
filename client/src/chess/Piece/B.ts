import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * boss
 */
export default class B extends Piece {
  constructor(params: { color: Color, pos: number[], side?: Side, key?: string }) {
    super({ role: 'b', ...params })
  }

  getNextPositions(board: Board): number[][] {
    const {
      pos: [currentX, currentY]
    } = this

    const nextPositions = [[-1, 0], [1, 0], [0, 1], [0, -1]]
      .map(([dx, dy]) => [currentX + dx, currentY + dy])
      .filter(pos => this.canMove(pos, board))

    let opponentBoss
    if (currentY < 3) {
      for (let i = 7; i <= 9; i++) {
        const piece = board.cells[currentX][i]
        if (piece && piece.role === 'b') opponentBoss = piece
      }
      if (opponentBoss) {
        let hasPiece = false
        for (let i = currentY + 1; i < opponentBoss.pos[1]; i++) {
          if (board.cells[currentX][i]) hasPiece = true
        }
        !hasPiece && nextPositions.push([currentX, opponentBoss.pos[1]])
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        const piece = board.cells[currentX][i]
        if (piece && piece.role === 'b') opponentBoss = piece
      }
      if (opponentBoss) {
        let hasPiece = false
        for (let i = currentY - 1; i > opponentBoss.pos[1]; i--) {
          if (board.cells[currentX][i]) hasPiece = true
        }
        !hasPiece && nextPositions.push([currentX, opponentBoss.pos[1]])
      }
    }

    return nextPositions
  }

  canMove(dest: number[], board: Board): boolean {
    const {
      pos: [origX, origY]
    } = this
    const [destX, destY] = dest

    const destPiece = board.cells[destX][destY]
    if (destPiece && destPiece.role === 'b' && destPiece.color !== this.color) return true

    if (
      Board.inNinePlace(dest, this.side) &&
      ((origX === destX && Math.abs(origY - destY) === 1) ||
        (origY === destY && Math.abs(origX - destX) === 1))
    ) {
      return this.canPlaceAtDest(dest, board)
    }

    return false
  }
}
