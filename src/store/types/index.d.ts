import { Game } from '@/chess/Game'

export interface IGameState {
  game: Game | null
}

export interface IRootState {
  game: IGameState
}
