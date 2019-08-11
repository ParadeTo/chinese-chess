import Msg from '../const'
import { AiType, createAi } from '.'
import AI from './AI'
import Board from '@/chess/Board'

let ai: AI

self.onmessage = (e: { data: { type: string, data: any }}) => {
  const { data: { type, data } } = e
  console.log('get message: ')
  console.log(type, data)
  if (type === Msg.INIT_AI) {
    let d = data as { aiType: AiType; board: Board }
    ai = createAi(d.aiType, d.board)
  }
}
