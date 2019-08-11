import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

export default class AI {
  board: Board
  constructor(board: Board) {
    this.board = board
  }
}

export interface IAI {
  getNextMove(color: Color): Promise<{ piece: Piece, dest: number[] }>
}
