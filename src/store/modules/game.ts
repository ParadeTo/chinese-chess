import { GetterTree, MutationTree, Module } from 'vuex'

import { createGame } from '@/chess/Game'

import { IGameState, IRootState } from '../types'

const state: IGameState = {
  game: null
}

const getters: GetterTree<IGameState, IRootState> = {
  game: state => state.game
}

const mutations: MutationTree<IGameState> = {
  initGame (state: IGameState) {
    state.game = createGame()
  }
}

const actions = {}

const G: Module<IGameState, IRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default G
