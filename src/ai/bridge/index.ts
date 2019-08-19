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
  constructor (args: { board: Board, color: Color, aiType: AiType, workerPath: string }) {
    const { board, color, aiType, workerPath } = args
    this.event = new Event()
    this.worker = new Worker(workerPath)
    this.worker.onmessage = this.onMessage
    this.initAI({ aiType, color, board })
  }

  onMessage(e: MessageEvent) {
    const { data: { type, data } } = e
    switch (type) {
      case Msg.RETURN_NEXT_MOVE:
        this.event.emit(Msg.RETURN_NEXT_MOVE, data)
        break
      default:
        break
    }
  }

  initAI (data: { aiType: AiType; board: Board; color: Color }) {
    this.worker.postMessage({ type: Msg.INIT_AI, data })
  }

  getNextMove(): Promise<{ piece: Piece; dest: number[]; }> {
    return new Promise<{ piece: Piece; dest: number[]; }>((resolve, reject) => {
      this.event.on(Msg.RETURN_NEXT_MOVE, data => {
        resolve(data as { piece: Piece; dest: number[]; })
      })
    })
  }
}
