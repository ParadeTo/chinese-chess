/**
 * chess piece
 */
import Board from '../Board'

export abstract class Piece {
  key: string
  color: Color
  role: string
  pos: number[]
  selected: boolean
  side: Side

  constructor({
    role,
    color,
    pos,
    side,
    key
  }: {
    role: Role
    color: Color
    pos: number[]
    side?: Side
    key?: string
  }) {
    this.key = key || color + role
    this.color = color
    this.role = role
    this.pos = pos
    this.selected = false
    if (!side) this.side = color === 'r' ? 'b' : 't'
    else this.side = side
  }

  canPlaceAtDest(dest: number[], board: Board) {
    const destPiece = board.getPieceByPos(dest)
    return !(destPiece && destPiece.color === this.color)
  }

  abstract getNextPositions(board: Board): number[][]
  abstract canMove(pos: number[], board: Board): boolean
}

// bottom top
export type Side = 'b' | 't'

export type Color = 'r' | 'b'

// 车 马 相 士 将(boss) 炮 卒
export type Role = 'j' | 'm' | 'x' | 's' | 'b' | 'p' | 'z'

// export type PieceName =
//   | 'bj0'
//   | 'bm0'
//   | 'bx0'
//   | 'bs0'
//   | 'bb0'
//   | 'bs1'
//   | 'bx1'
//   | 'bm1'
//   | 'bj1'
//   | 'bp0'
//   | 'bp1'
//   | 'bz0'
//   | 'bz1'
//   | 'bz2'
//   | 'bz3'
//   | 'bz4'
//   | 'rj0'
//   | 'rm0'
//   | 'rx0'
//   | 'rs0'
//   | 'rb0'
//   | 'rs1'
//   | 'rx1'
//   | 'rm1'
//   | 'rj1'
//   | 'rp0'
//   | 'rp1'
//   | 'rz0'
//   | 'rz1'
//   | 'rz2'
//   | 'rz3'
//   | 'rz4'
