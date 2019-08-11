import RandomAI from './random'
import AI, { IAI } from './AI'
import Board from '@/chess/Board';

export type AiType = 'random'

export const createAi = (aiType: AiType, board: Board, ...restParams: any[]): IAI => {
  switch (aiType) {
    case 'random':
      return new RandomAI(board)
  }
}
