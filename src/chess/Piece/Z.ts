import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 卒
 */
export default class Z extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
