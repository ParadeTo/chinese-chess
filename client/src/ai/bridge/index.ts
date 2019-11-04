import { IAI, INextMove } from '../AI'
import Event from '@/event'
import Board from '@/chess/Board'
import Msg from '@/const'
import { AiType } from '..'
import { Piece, Color } from '@/chess/Piece'

/**
 * Let the Bridge implements IAI is to use it as AI
 */
export default class Bridge implements IAI {
  workers: Worker[] = []
  event: Event
  constructor({
    depth = 1,
    workerNum = 8,
    board,
    color,
    aiType,
    workerPath
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

  onMessage(e: MessageEvent) {
    const {
      data: { type, data }
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
    this.workers.forEach(worker => {
      worker.postMessage({ type: Msg.INIT_AI, data })
    })
  }

  getNextMove(board: Board, color: Color): Promise<INextMove> {
    return new Promise<{ from: number[]; to: number[] }>((resolve, reject) => {
      const piecesMoves = board.generateMoves(color)
      const n = Math.ceil(piecesMoves.length / this.workers.length)
      let partitionNum = 0
      this.workers.forEach((worker, idx) => {
        const moves = piecesMoves.slice(idx * n, (idx + 1) * n)
        if (moves.length > 0) {
          partitionNum++
          worker.postMessage({
            type: Msg.GET_BEST_MOVE,
            data: { board, color, piecesMoves: moves }
          })
        }
      })
      let i = 0
      let max = -Infinity
      let bestMove: INextMove
      this.event.on(Msg.RETURN_BEST_MOVE, data => {
        if (data.value > max) {
          max = data.value
          bestMove = data.bestMove
        }
        i++
        if (i === partitionNum) {
          resolve(bestMove)
        }
      })
    })
  }
}
