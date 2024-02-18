import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'
import { IAI, INextMove } from '../AI'

export default class WasmAi implements IAI {
  private ai: any

  constructor(depth: number) {
    // @ts-ignore
    this.ai = window.wasmAi.new(depth)
  }
  needUpdateBoard(): boolean {
    return true
  }

  async getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    const nextMove = this.ai.get_next_move(color === 'r' ? 0 : 1)
    const from = [nextMove.from[0], nextMove.from[1]]
    const to = [nextMove.to[0], nextMove.to[1]]
    this.ai.update_board(Int32Array.from(from), Int32Array.from(to))
    return { from, to }
  }
  updatePiece(piece: Piece, newPos: number[]): void {
    this.ai.update_board(Int32Array.from(piece.pos), Int32Array.from(newPos))
  }
}
