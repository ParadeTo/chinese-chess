import { IAI, INextMove } from '../AI'
import Event from '@/event'
import Board from '@/chess/Board'
import Msg from '@/const'
import { AiType } from '..'
import { Color, Piece } from '@/chess/Piece'

/**
 * Let the Bridge implements IAI is to use it as AI
 */
export default class Bridge implements IAI {
  workers: Worker[] = []
  event: Event
  constructor({
    depth = 1,
    workerNum = 32,
    board,
    color,
    aiType,
    workerPath,
  }: {
    board: Board
    color: Color
    aiType: AiType
    workerPath: string
    depth?: number
    workerNum?: number
  }) {
    this.event = new Event()
    for (let i = 0; i < workerNum; i++) {
      this.workers[i] = new Worker(workerPath)
      this.workers[i].onmessage = this.onMessage.bind(this)
    }
    this.initAI({ aiType, depth })
  }
  updatePiece(piece: Piece, newPos: number[]): void {}

  onMessage(e: MessageEvent) {
    const {
      data: { type, data },
    } = e
    switch (type) {
      case Msg.RETURN_NEXT_MOVE:
        this.event.emit(Msg.RETURN_NEXT_MOVE, data)
        break
      case Msg.RETURN_BEST_MOVE:
        this.event.emit(Msg.RETURN_BEST_MOVE, data)
        break
      default:
        break
    }
  }

  initAI(data: { depth?: number; aiType: AiType }) {
    this.workers.forEach((worker) => {
      worker.postMessage({ type: Msg.INIT_AI, data })
    })
  }

  getNextMove(board: Board, color: Color): Promise<INextMove> {
    return new Promise<{ from: number[]; to: number[] }>((resolve, reject) => {
      const moves = board.generateMoves(color)
      const len = moves.length
      const workerNum = this.workers.length > len ? len : this.workers.length
      const n = Math.floor(len / workerNum)
      let remainder = len - workerNum * n

      let lastEnd = 0
      for (let i = 0; i < workerNum; i++) {
        let start = lastEnd
        if (start > len - 1) break
        let offset = n
        if (remainder-- > 0) {
          offset += 1
        }
        const subMoves = moves.slice(start, start + offset)
        lastEnd = start + offset
        this.workers[i].postMessage({
          type: Msg.GET_BEST_MOVE,
          data: { board, color, piecesMoves: subMoves },
        })
      }

      let i = 0
      let max = -Infinity
      let bestMove: INextMove
      this.event.on(Msg.RETURN_BEST_MOVE, (data) => {
        if (data.value > max) {
          max = data.value
          bestMove = data.bestMove
        }
        i++
        if (i === workerNum) {
          resolve(bestMove)
        }
      })
    })
  }
}
