import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 马
 */
export default class M extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
