import { Color } from './Piece'
import { IAI } from '@/ai/AI'

export type PlayerType = 'human' | 'ai'

export default class Player {
  color: Color
  type: PlayerType
  ai?: IAI
  constructor(color: Color, type: PlayerType, ai?: IAI) {
    this.color = color
    this.type = type
    if (type === 'ai') this.ai = ai
  }
}
