/**
 * chess piece
 * 黑方
 *      bj0: 车
        bm0: 马
        bx0: 象
        bs0: 士
        bb0: 将
        bs1
        bx1
        bm1
        bj1
        bp0: 炮
        bp1: 炮
        bz0: 卒
        bz1
        bz2
        bz3
        bz4
  红方
        rj0: 车
        rm0: 马
        rx0: 相
        rs0: 士
        rb0: 帅
        rs1
        rx1
        rm1
        rj1
        rp0: 炮
        rp1
        rz0: 兵
        rz1
        rz2
        rz3
        rz4
*/
import Board from '../Board'

export class Piece {
  key: string
  color: string
  character: string
  index: number
  pos: number[]
  constructor (name: PieceName, position: number[]) {
    this.key = name
    this.color = name.substr(0, 1)
    this.character = name.substr(1, 2)
    this.index = Number(name.substr(2, 3))
    this.pos = position
  }
}

export interface IPiece {
  getMoves(pos: number[], board: Board): number[][]
}

export type PieceName =
  | 'bj0'
  | 'bm0'
  | 'bx0'
  | 'bs0'
  | 'bb0'
  | 'bs1'
  | 'bx1'
  | 'bm1'
  | 'bj1'
  | 'bp0'
  | 'bp1'
  | 'bz0'
  | 'bz1'
  | 'bz2'
  | 'bz3'
  | 'bz4'
  | 'rj0'
  | 'rm0'
  | 'rx0'
  | 'rs0'
  | 'rb0'
  | 'rs1'
  | 'rx1'
  | 'rm1'
  | 'rj1'
  | 'rp0'
  | 'rp1'
  | 'rz0'
  | 'rz1'
  | 'rz2'
  | 'rz3'
  | 'rz4'
