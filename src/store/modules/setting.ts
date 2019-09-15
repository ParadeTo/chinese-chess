import { GetterTree, MutationTree, Module } from 'vuex'

import { createGame } from '@/chess/Game'

import { IGameState, IRootState, ISettingState, IPlayer } from '../types'
import { deepClone } from '@/utils'

const defaultPlayers: IPlayer[] = [
  {
    role: 'a',
    color: 'b',
    level: 3
  },
  {
    role: 'h',
    color: 'r'
  }
]
const state: ISettingState = {
  players: defaultPlayers,
  tmpPlayers: deepClone(defaultPlayers) as IPlayer[]
}

const getters: GetterTree<ISettingState, IRootState> = {
  players: state => state.players,
  tmpPlayers: state => state.tmpPlayers
}

const mutations: MutationTree<ISettingState> = {
  savePlayers(state: ISettingState) {
    state.players = deepClone(state.tmpPlayers)
  },

  editPlayers(state: ISettingState, { i, field, value }: { i: number; field: string; value: any }) {
    const players = deepClone(state.tmpPlayers)
    players[i][field] = value
    if (field === 'color') {
      for (let j = 0; j < players.length; j++) {
        if (j !== i) players[j].color = players[i].color === 'r' ? 'b' : 'r'
      }
    }
    if (field === 'role' && value === 'a' && !players[i].level) {
      players[i].level = 1
    }
    state.tmpPlayers = players
  }
}

const actions = {}

const Setting: Module<ISettingState, IRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Setting
