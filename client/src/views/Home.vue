<template>
  <div class="home">
    <div class="chinese-chess"><ChineseChess :game="game" @gameOver="onOver" /></div>
    <a @click="onStart" href="javascript:;" class="weui-btn weui-btn_block weui-btn_primary btn">{{
      this.game !== null ? '重新开始' : '开始'
    }}</a>
    <a
      v-if="this.game !== null && game.board.records.length > 0"
      @click="undo"
      href="javascript:;"
      class="weui-btn weui-btn_block weui-btn_default btn"
      v-bind:class="[game.currentPlayer.ai ? 'weui-btn_disabled' : '']"
      >悔棋</a
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Getter, Mutation, namespace, Action } from 'vuex-class'

import ChineseChess from '@/components/ChineseChess/index.vue'
import Game from '../chess/Game'
import { IGameState } from '../store/types'

const GameGetter = namespace('game', Getter)
const GameAction = namespace('game', Action)
const GameMutation = namespace('game', Mutation)

@Component({
  components: {
    ChineseChess
  },
  computed: mapState('game', ['game']),
  methods: {
    ...mapActions('game', { initGame: 'initGame' }),
    ...mapMutations('game', { overGame: 'overGame' })
  }
})
export default class Home extends Vue {
  private game!: Game

  @GameAction initGame!: () => IGameState
  @GameMutation overGame!: () => IGameState

  onStart() {
    this.initGame()
  }

  onOver() {
    this.overGame()
  }

  undo() {
    this.game.undo(2)
  }
}
</script>

<style scoped lang="less">
.chinese-chess {
  // margin: 10px 10px;
}
</style>
