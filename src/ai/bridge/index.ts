import { IAI } from '../AI'
import Event from '@/event'
import Board from '@/chess/Board'
import Msg from '@/const'
import { AiType } from '..'
import { Piece, Color } from '@/chess/Piece'

/**
 * Let the Bridge implements IAI is to use it as AI
 */
export default class Bridge implements IAI {
  worker: Worker
  event: Event
  constructor({
    depth = 1,
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
  }) {
    this.event = new Event()
    this.worker = new Worker(workerPath)
    this.worker.onmessage = this.onMessage.bind(this)
    this.initAI({ aiType, color, board, depth })
  }

  onMessage(e: MessageEvent) {
    const {
      data: { type, data }
    } = e
    switch (type) {
      case Msg.RETURN_NEXT_MOVE:
        this.event.emit(Msg.RETURN_NEXT_MOVE, data)
        break
      default:
        break
    }
  }

  initAI(data: { depth?: number; aiType: AiType; board: Board; color: Color }) {
    this.worker.postMessage({ type: Msg.INIT_AI, data })
  }

  getNextMove(): Promise<{ from: number[]; to: number[] }> {
    return new Promise<{ from: number[]; to: number[] }>((resolve, reject) => {
      this.worker.postMessage({ type: Msg.GET_NEXT_MOVE })
      this.event.on(Msg.RETURN_NEXT_MOVE, data => {
        resolve(data as { from: number[]; to: number[] })
      })
    })
  }
}
