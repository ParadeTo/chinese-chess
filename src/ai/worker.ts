import Msg from '../const'
import { AiType, createAi } from '.'
import { IAI } from './AI'
import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'

let ai: IAI

self.onmessage = (e: { data: { type: string, data: any }}) => {
  const { data: { type, data } } = e
  console.log('get message: ')
  console.log(type, data)
  if (type === Msg.INIT_AI) {
    let { aiType, board, color } = data as { aiType: AiType; board: Board; color: Color }
    ai = createAi({ aiType, board, color })
  }
}
