import { IAI, INextMove } from '../AI'
import { Piece, Color, J } from '@/chess/Piece'
import Board from '@/chess/Board'
import { IEvalModel } from './eval'
import WeightEvalModel from './eval/weight'

interface IPieceNodes {
  piece: Piece
  from: number[]
  nodes: {
    to: number[]
    value: number
  }[]
}

export default class MiniMaxAI implements IAI {
  depth: number
  evalModel: IEvalModel
  constructor({
    depth,
    evalModel = new WeightEvalModel()
  }: {
    depth: number
    evalModel?: IEvalModel
  }) {
    this.depth = depth
    this.evalModel = evalModel
  }

  generateNodes(board: Board, color: Color, forSelf: boolean = false) {
    let _color: Color = color
    if (!forSelf) {
      _color = color === 'r' ? 'b' : 'r'
    }
    const pieces = board.pieces[_color]
    const piecesNodes: IPieceNodes[] = []
    for (let piece of pieces) {
      const nodes = piece.getNextPositions(board).map(pos => ({
        to: pos,
        value: -Infinity
      }))
      const pieceNodes = { piece, from: piece.pos, nodes }
      piecesNodes.push(pieceNodes)
    }
    return piecesNodes
  }

  search(board: Board, color: Color, depth: number, forSelf: boolean): number {
    if (depth === 0) {
      // eval value from current ai's perspective
      // for self, want the value to be max
      // for opponent, want the value to be min
      const value = this.evalModel.eval(board, color)
      return value
    }

    let max = -Infinity
    const piecesNodes = this.generateNodes(board, color, forSelf)
    for (let pieceNodes of piecesNodes) {
      const { piece, from, nodes } = pieceNodes
      for (let node of nodes) {
        board.updatePiece(piece, node.to)
        const value = this.search(board, color, depth - 1, !forSelf) * (forSelf ? 1 : -1)
        board.backMoves()
        if (value > max) max = value
      }
    }
    return max * (forSelf ? 1 : -1)
  }

  getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    const piecesNodes = this.generateNodes(board, color, true)
    let max = -Infinity
    let bestMove: INextMove | null = null
    let bestMovePiece = null
    for (let pieceNodes of piecesNodes) {
      const { piece, from, nodes } = pieceNodes
      for (let node of nodes) {
        board.updatePiece(piece, node.to)
        const value = this.search(board, color, this.depth - 1, false)
        board.backMoves()
        if (value > max) {
          bestMovePiece = piece
          max = value
          bestMove = { from: piece.pos, to: node.to }
        }
      }
    }
    debugger
    if (bestMovePiece) board.updatePiece(bestMovePiece, (bestMove as INextMove).to)
    return Promise.resolve(bestMove)
  }

  // update the ai's board
  updatePiece () {

  }
}
