import { Piece, IPiece } from './Piece'
import Board from '../Board'

/**
 * 车
 */
export default class J extends Piece implements IPiece {
  getMoves (pos: number[], board: Board) {
    return [[1]]
  }
}
