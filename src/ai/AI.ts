import Board from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

// export default class AI {
//   color: Color // own color
//   opponentColor: Color
//   constructor(board: Board, color: Color) {
//     this.color = color
//     this.opponentColor = color === 'r' ? 'b' : 'r'
//   }
// }

export interface IAI {
  getNextMove(board: Board, color: Color): Promise<INextMove | null>
}

export interface INextMove {
  from: number[], to: number[]
}
