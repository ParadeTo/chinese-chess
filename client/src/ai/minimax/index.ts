import { IAI, INextMove } from '../AI'
import { Piece, Color, J } from '@/chess/Piece'
import Board, { IPieceMoves } from '@/chess/Board'
import { IEvalModel } from './eval'
import WeightEvalModel from './eval/weight'

export default class MiniMaxAI implements IAI {
  depth: number
  evalModel: IEvalModel
  cutOff: boolean
  constructor({
    depth,
    evalModel = new WeightEvalModel(),
    cutOff = true
  }: {
    depth: number
    evalModel?: IEvalModel
    cutOff?: boolean
  }) {
    this.depth = depth
    this.evalModel = evalModel
    this.cutOff = cutOff
  }

  // negamax
  // search(board: Board, color: Color, depth: number, forSelf: boolean): number {
  //   if (depth === 0) {
  //     // eval value from current ai's perspective
  //     // for self, want the value to be max
  //     // for opponent, want the value to be min
  //     const value = this.evalModel.eval(board, color)
  //     return value
  //   }

  //   let max = -Infinity
  //   const piecesNodes = this.generateNodes(board, color, forSelf)
  //   for (let pieceNodes of piecesNodes) {
  //     const { piece, from, nodes } = pieceNodes
  //     for (let node of nodes) {
  //       board.updatePiece(piece, node.to)
  //       const value = this.search(board, color, depth - 1, !forSelf) * (forSelf ? 1 : -1)
  //       board.backMoves()
  //       if (value > max) max = value
  //     }
  //   }
  //   return max * (forSelf ? 1 : -1)
  // }

  static getOpponentColor(color: Color) {
    return color === 'r' ? 'b' : 'r'
  }

  // minimax
  search(board: Board, color: Color, depth: number, isMax: boolean, alpha: number, beta: number): number {
    if (depth === 0 || board.isFinish()) {
      // 从 ai 的角度来评估局势
      return this.evalModel.eval(board, color)
    }

    let value = isMax ? -Infinity : Infinity
    const piecesNodes = board.generateMoves(isMax ? color : MiniMaxAI.getOpponentColor(color))
    for (let pieceNodes of piecesNodes) {
      const { from: [x, y], nodes } = pieceNodes
      const piece = board.cells[x][y] as Piece
      // if (!piece) {
      //   console.log(piecesNodes, pieceNodes)
      //   debugger
      //   continue
      // }
      for (let node of nodes) {
        board.updatePiece(piece, node.to)
        const _value = this.search(board, color, depth - 1, !isMax, alpha, beta)
        board.backMoves()
        if (isMax) {
          value = Math.max(value, _value)
          if (this.cutOff) {
            alpha = Math.max(alpha, value)
            if (alpha >= beta) {
              return value
            }
          }
        } else {
          value = Math.min(value, _value)
          if (this.cutOff) {
            beta = Math.min(beta, value)
            if (alpha >= beta) {
              return value
            }
          }
        }
      }
    }
    return value
  }

  getBestMove(board: Board, color: Color, piecesMoves: IPieceMoves[]): Promise<{ bestMove: INextMove, value: number}> {
    let max = -Infinity
    let bestMove: INextMove | null = null
    console.time('getBestMove')
    for (let pieceNodes of piecesMoves) {
      const { from: [x, y], nodes } = pieceNodes
      const piece = board.cells[x][y] as Piece
      for (let node of nodes) {
        board.updatePiece(piece, node.to)
        const value = this.search(board, color, this.depth - 1, false, -Infinity, Infinity)
        board.backMoves()
        if (value > max) {
          // bestMovePiece = piece
          max = value
          bestMove = { from: piece.pos, to: node.to }
        }
      }
    }
    console.timeEnd('getBestMove')
    return Promise.resolve({ bestMove: bestMove as INextMove, value: max })
  }

  async getNextMove(board: Board, color: Color): Promise<INextMove | null> {
    console.time('getNextMove')
    const piecesMoves = board.generateMoves(color)
    const { bestMove } = await this.getBestMove(board, color, piecesMoves)
    console.timeEnd('getNextMove')
    const bestMovePiece = board.cells[bestMove.from[0]][bestMove.from[1]]
    if (bestMovePiece) board.updatePiece(bestMovePiece, (bestMove as INextMove).to)
    return Promise.resolve(bestMove)
  }
}
