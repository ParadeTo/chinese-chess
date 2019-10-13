import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'

export interface IAI {
  getNextMove(board: Board, color: Color): Promise<INextMove | null>
  // getBestMove(board: Board, color: Color, pieceNodes: IPieceNodes[]): Promise<{ bestMove: INextMove, value: number}>
}

export interface INextMove {
  from: number[], to: number[]
}
