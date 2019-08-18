import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

export default class AI {
  board: Board
  color: Color
  constructor(board: Board, color: Color) {
    this.color = color
    this.board = board
  }
}

export interface IAI {
  getNextMove(): Promise<{ piece: Piece, dest: number[] }>
}
