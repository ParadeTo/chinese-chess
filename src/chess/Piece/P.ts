import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 炮
 */
export default class P extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
