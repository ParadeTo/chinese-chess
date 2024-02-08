import Board, { UpdatePieceResult } from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

export interface IAI {
  getNextMove(board: Board, color: Color): Promise<INextMove | null>
  updatePiece(piece: Piece, newPos: number[]): void
  needUpdateBoard(): boolean
  // getBestMove(board: Board, color: Color, pieceNodes: IPieceNodes[]): Promise<{ bestMove: INextMove, value: number}>
}

export interface INextMove {
  from: number[]
  to: number[]
}
