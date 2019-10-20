import { IEvalModel } from '.'
import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'
import { Role } from '@/chess/Piece/Piece'

export default class WeightEvalModel implements IEvalModel {
  eval(board: Board, color: Color): number {
    let selfPieceVal = 0
    let selfPosVal = 0
    let opponentPieceVal = 0
    let opponentPosVal = 0

    let pieces = board.pieces[color]
    for (let piece of pieces) {
      selfPieceVal += WeightEvalModel.evalPieceVal(piece.role)
      const reversedPos = [Board.WIDTH - piece.pos[0] - 1, Board.HEIGHT - piece.pos[1] - 1]
      selfPosVal += WeightEvalModel.evalPosVal(piece.role, reversedPos)
    }

    pieces = board.pieces[color === 'r' ? 'b' : 'r']
    for (let piece of pieces) {
      opponentPieceVal += WeightEvalModel.evalPieceVal(piece.role)
      opponentPosVal += WeightEvalModel.evalPosVal(piece.role, piece.pos)
    }

    return selfPieceVal + selfPosVal - opponentPieceVal - opponentPosVal
  }

  static evalPieceVal(r: Role) {
    const pieceVal = {
      b: 1000000,
      s: 110,
      x: 110,
      m: 300,
      j: 600,
      p: 300,
      z: 70
    }
    return pieceVal[r]
  }

  static evalPosVal(r: Role, pos: number[]) {
    const [x, y] = pos
    const posVal = {
      p: [
        [6, 4, 0, -10, -12, -10, 0, 4, 6],
        [2, 2, 0, -4, -14, -4, 0, 2, 2],
        [2, 2, 0, -10, -8, -10, 0, 2, 2],
        [0, 0, -2, 4, 10, 4, -2, 0, 0],
        [0, 0, 0, 2, 8, 2, 0, 0, 0],
        [-2, 0, 4, 2, 6, 2, 4, 0, -2],
        [0, 0, 0, 2, 4, 2, 0, 0, 0],
        [4, 0, 8, 6, 10, 6, 8, 0, 4],
        [0, 2, 4, 6, 6, 6, 4, 2, 0],
        [0, 0, 2, 6, 6, 6, 2, 0, 0]
      ],
      m: [
        [4, 8, 16, 12, 4, 12, 16, 8, 4],
        [4, 10, 28, 16, 8, 16, 28, 10, 4],
        [12, 14, 16, 20, 18, 20, 16, 14, 12],
        [8, 24, 18, 24, 20, 24, 18, 24, 8],
        [6, 16, 14, 18, 16, 18, 14, 16, 6],
        [4, 12, 16, 14, 12, 14, 16, 12, 4],
        [2, 6, 8, 6, 10, 6, 8, 6, 2],
        [4, 2, 8, 8, 4, 8, 8, 2, 4],
        [0, 2, 4, 4, -2, 4, 4, 2, 0],
        [0, -4, 0, 0, 0, 0, 0, -4, 0]
      ],
      j: [
        [14, 14, 12, 18, 16, 18, 12, 14, 14],
        [16, 20, 18, 24, 26, 24, 18, 20, 16],
        [12, 12, 12, 18, 18, 18, 12, 12, 12],
        [12, 18, 16, 22, 22, 22, 16, 18, 12],
        [12, 14, 12, 18, 18, 18, 12, 14, 12],
        [12, 16, 14, 20, 20, 20, 14, 16, 12],
        [6, 10, 8, 14, 14, 14, 8, 10, 6],
        [4, 8, 6, 14, 12, 14, 6, 8, 4],
        [8, 4, 8, 16, 8, 16, 8, 4, 8],
        [-2, 10, 6, 14, 12, 14, 6, 10, -2]
      ],
      z: [
        [0, 3, 6, 9, 12, 9, 6, 3, 0],
        [18, 36, 56, 80, 120, 80, 56, 36, 18],
        [14, 26, 42, 60, 80, 60, 42, 26, 14],
        [10, 20, 30, 34, 40, 34, 30, 20, 10],
        [6, 12, 18, 18, 20, 18, 18, 12, 6],
        [2, 0, 8, 0, 8, 0, 8, 0, 2],
        [0, 0, -2, 0, 4, 0, -2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      b: null,
      x: null,
      s: null
    }
    const roleVal = posVal[r]
    if (roleVal) return roleVal[y][x]
    return 0
  }
}
