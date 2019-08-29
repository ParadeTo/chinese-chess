import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

export default class AI {
  board: Board
  color: Color // own color
  opponentColor: Color
  constructor(board: Board, color: Color) {
    this.color = color
    this.opponentColor = color === 'r' ? 'b' : 'r'
    this.board = board
  }
}

export interface IAI {
  getNextMove(): Promise<{ piece: Piece, dest: number[] } | null>
}
