import { Piece, Color, Side } from './Piece'
import Board from '../Board'

/**
 * boss
 */
export default class B extends Piece {
  constructor(params: { color: Color; pos: number[]; side?: Side; key?: string }) {
    super({ role: 'b', ...params })
  }

  static hasPieceBetweenBosses(board: Board, b1: Piece, b2: Piece): boolean {
    let startY = b1.pos[1] + 1
    let endY = b2.pos[1] - 1

    if (startY >= endY) {
      startY = b2.pos[1] + 1
      endY = b1.pos[1] - 1
    }

    let hasPiece = false
    for (let i = startY; i <= endY; i++) {
      if (board.cells[b1.pos[0]][i]) hasPiece = true
    }
    return hasPiece
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
      if (opponentBoss && !B.hasPieceBetweenBosses(board, this, opponentBoss)) {
        nextPositions.push([currentX, opponentBoss.pos[1]])
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        const piece = board.cells[currentX][i]
        if (piece && piece.role === 'b') opponentBoss = piece
      }
      if (opponentBoss && !B.hasPieceBetweenBosses(board, this, opponentBoss)) {
        nextPositions.push([currentX, opponentBoss.pos[1]])
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
    if (
      destPiece &&
      destPiece.role === 'b' &&
      destPiece.color !== this.color &&
      destPiece.pos[0] === this.pos[0] &&
      !B.hasPieceBetweenBosses(board, this, destPiece)
    ) {
      return true
    }

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
