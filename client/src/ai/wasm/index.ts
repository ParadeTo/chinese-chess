import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'
import { IAI, INextMove } from '../AI'
import { Pos } from 'wasm-chinese-chess'

export default class WasmAi implements IAI {
  private wasmAi: any

  constructor(wasmAi: any) {
    this.wasmAi = wasmAi
  }

  async getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    const nextMove = this.wasmAi.get_next_move(color === 'r' ? 0 : 1)
    debugger
    return { from: [nextMove.from[0], nextMove.from[1]], to: [nextMove.to[0], nextMove.to[1]] }
  }
  updatePiece(piece: Piece, newPos: number[]): void {
    this.wasmAi.update_board(Int32Array.from(piece.pos), Int32Array.from(newPos))
  }
}
