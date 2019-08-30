import AI, { IAI, INextMove } from '../AI'
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

export default class MiniMaxAI extends AI implements IAI {
  depth: number
  evalModel: IEvalModel
  constructor({
    board,
    color,
    depth,
    evalModel = new WeightEvalModel()
  }: {
    depth: number
    board: Board
    color: Color
    evalModel?: IEvalModel
  }) {
    super(board, color)
    this.depth = depth
    this.evalModel = evalModel
  }

  generateNodes(forSelf: boolean = false) {
    let color: Color = this.color
    if (!forSelf) {
      color = this.opponentColor
    }
    const pieces = this.board.pieces[color]
    const piecesNodes: IPieceNodes[] = []
    for (let piece of pieces) {
      const nodes = piece.getNextPositions(this.board).map(pos => ({
        to: pos,
        value: -Infinity
      }))
      const pieceNodes = { piece, from: piece.pos, nodes }
      piecesNodes.push(pieceNodes)
    }
    return piecesNodes
  }

  search(depth: number, forSelf: boolean): number {
    if (depth === 0) {
      // eval value from current ai's perspective
      // for self, want the value to be max
      // for opponent, want the value to be min
      const value = this.evalModel.eval(this.board, this.color)
      return value
    }

    let max = -Infinity
    const piecesNodes = this.generateNodes(forSelf)
    for (let pieceNodes of piecesNodes) {
      const { piece, from, nodes } = pieceNodes
      for (let node of nodes) {
        this.board.updatePiece(piece, node.to)
        const value = this.search(depth - 1, !forSelf) * (forSelf ? 1 : -1)
        this.board.backMoves()
        if (value > max) max = value
      }
    }
    return max * (forSelf ? 1 : -1)
  }

  getNextMove(): Promise<INextMove | null> {
    const piecesNodes = this.generateNodes(true)
    let max = -Infinity
    let bestMove: INextMove | null = null
    let bestMovePiece = null
    for (let pieceNodes of piecesNodes) {
      const { piece, from, nodes } = pieceNodes
      for (let node of nodes) {
        this.board.updatePiece(piece, node.to)
        const value = this.search(this.depth - 1, false)
        this.board.backMoves()
        if (value > max) {
          bestMovePiece = piece
          max = value
          bestMove = { from: piece.pos, to: node.to }
        }
      }
    }
    debugger
    if (bestMovePiece) this.board.updatePiece(bestMovePiece, (bestMove as INextMove).to)
    return Promise.resolve(bestMove)
  }

  // update the ai's board
  updatePiece () {

  }
}
