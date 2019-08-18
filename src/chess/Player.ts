import { Color } from './Piece'
import { IAI } from '@/ai/AI'

type Name = 'human' | 'robot'

export default class Player {
  color: Color
  name: Name
  ai?: IAI
  constructor(color: Color, name: Name, ai?: IAI) {
    this.color = color
    this.name = name
    if (name === 'robot') this.ai = ai
  }
}
