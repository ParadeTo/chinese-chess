import AI, { IAI } from '../AI'
import Board from '@/chess/Board'
import Msg from '@/const'
import { AiType } from '..'
import { Color, Piece } from '@/chess/Piece'

export default class Bridge implements IAI {
  worker: Worker
  constructor (workerFileName: string, onMessage: (e: MessageEvent) => void) {
    this.worker = new Worker(workerFileName)
    this.worker.onmessage = onMessage
  }

  initAI (data: { aiType: AiType; board: Board }) {
    this.worker.postMessage({ type: Msg.INIT_AI, data })
  }

  getNextMove(color: Color): Promise<{ piece: Piece; dest: number[]; }> {
    return new Promise<{ piece: Piece; dest: number[]; }>((resolve, reject) => {

    })
  }

  // async getNextMove(color: Color): { piece: Piece, dest: number[] } {
  //   this.worker.postMessage({ type: Msg.GET_NEXT_MOVE, data: { color } })
  // }
}
