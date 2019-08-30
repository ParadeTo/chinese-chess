import RandomAI from './random'
import AI, { IAI } from './AI'
import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'
import BridgeAI from './bridge'
import MiniMaxAI from './minimax'

export type AiType = 'random' | 'bridge' | 'minimax'

export const createAi = ({
  aiType,
  board,
  color,
  workerPath,
  depth = 3
}: {
  aiType: AiType
  board: Board
  color: Color
  workerPath?: string
  depth?: number
}): IAI => {
  switch (aiType) {
    case 'minimax':
      return new MiniMaxAI({ board, depth, color })
    default:
      return new RandomAI(board, color)
  }
}
