import RandomAI from './random'
import { IAI } from './AI'
import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'
import BridgeAI from './bridge'
import MiniMaxAI from './minimax'

export type AiType = 'random' | 'bridge' | 'minimax'

export const createAi = ({
  aiType,
  depth = 3
}: {
  aiType: AiType
  depth?: number
}): IAI => {
  switch (aiType) {
    case 'minimax':
      return new MiniMaxAI({ depth })
    default:
      return new RandomAI()
  }
}
