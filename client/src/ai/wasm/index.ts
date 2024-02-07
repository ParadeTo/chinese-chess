import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'
import { IAI, INextMove } from '../AI'

export default class WasmAi implements IAI {
  private wasmAi: any

  constructor(wasmAi: any) {
    this.wasmAi = wasmAi
  }

  async getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    const nextMove = this.wasmAi.get_next_move(color === 'r' ? 0 : 1)
    return { from: [nextMove.from[0], nextMove.from[1]], to: [nextMove.to[0], nextMove.to[1]] }
  }
  updatePiece(piece: Piece, newPos: number[]): void {
    this.wasmAi.update_board({ 0: piece.pos[0], 1: piece.pos[1] }, { 0: newPos[0], 1: newPos[1] })
  }
}
