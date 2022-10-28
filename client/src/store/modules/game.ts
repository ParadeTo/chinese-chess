import { GetterTree, MutationTree, Module, ActionTree } from 'vuex'

import { createGame } from '@/chess/Game'

import { IGameState, IRootState } from '../types'
import Player from '@/chess/Player'

const state: IGameState = {
  game: null
}

const getters: GetterTree<IGameState, IRootState> = {
  game: state => state.game
}

const mutations: MutationTree<IGameState> = {
  initGame(state: IGameState, players: Player[]) {
    state.game = createGame(players)
  },
  overGame(state: IGameState, players: Player[]) {
    state.game = null
  }
}

const actions: ActionTree<IGameState, IRootState> = {
  initGame({ state, rootState, commit }) {
    const players = rootState.setting.players
    commit('initGame', players)
  }
}

const G: Module<IGameState, IRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default G
