import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'

export interface IEvalModel {
  eval(board: Board, color: Color): number
}
