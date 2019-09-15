import Game from '@/chess/Game'
import { Color } from '@/chess/Piece';

export interface IGameState {
  game: Game | null
}

export interface IPlayer {
  role: 'a' | 'h'
  color: Color
  level?: number // 1-3：初中高
}

export interface ISettingState {
  players: IPlayer[]
  tmpPlayers: IPlayer[]
}

export interface IRootState {
  game: IGameState
}
