import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 士
 */
export default class S extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
