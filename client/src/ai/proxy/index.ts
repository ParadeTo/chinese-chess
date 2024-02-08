import { IAI, INextMove } from '../AI'
import Board, { UpdatePieceResult } from '@/chess/Board'
import { Color, Piece } from '@/chess/Piece'

export default class ProxyAi implements IAI {
  needUpdateBoard(): boolean {
    return false
  }
  updatePiece(piece: Piece, newPos: number[]) {}
  static async getNextMove(color: Color, pieces: Piece[]): Promise<INextMove | null> {
    try {
      const rawResponse = await fetch('/api/next-move', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color, pieces })
      })
      const content = await rawResponse.json()
      return content as INextMove
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    return ProxyAi.getNextMove(color, board.getAllPieces())
  }
}
