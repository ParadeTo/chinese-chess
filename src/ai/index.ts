import RandomAI from './random'
import AI, { IAI } from './AI'
import Board from '@/chess/Board'
import { Color } from '@/chess/Piece'
import BridgeAI from './bridge';

export type AiType = 'random' | 'bridge'

export const createAi = (aiType: AiType, board: Board, color: Color, workerPath: string = ''): IAI => {
  switch (aiType) {
    case 'bridge':
      return new BridgeAI(board, color, aiType, workerPath)
    default:
      return new RandomAI(board, color)
  }
}
