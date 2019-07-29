import { GetterTree, MutationTree, Module } from 'vuex'

import Game from '@/chess/Game'

import { IGameState, IRootState } from '../types'

const state: IGameState = {
  game: null
}

const getters: GetterTree<IGameState, IRootState> = {
  game: state => state.game
}

const mutations: MutationTree<IGameState> = {
  initGame (state: IGameState) {
    state.game = new Game()
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
