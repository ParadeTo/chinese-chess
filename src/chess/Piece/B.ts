import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * boss
 */
export default class B extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
