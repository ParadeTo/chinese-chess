import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 相
 */
export default class X extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
