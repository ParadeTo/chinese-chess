import Game from '@/chess/Game'
import { Color } from '@/chess/Piece'
import { PlayerType } from '@/chess/Player'

export interface IGameState {
  game: Game | null
}

export interface IPlayer {
  type: PlayerType
  color: Color
  level?: number // 1-3：初中高
}

export interface ISettingState {
  players: IPlayer[]
  tmpPlayers: IPlayer[]
}

export interface IRootState {
  game: IGameState
  setting: ISettingState
}
