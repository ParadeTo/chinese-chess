<template>
  <div class="home">
    <div class="chinese-chess"><ChineseChess :game="game" /></div>
    <a @click="onStart" href="javascript:;" class="weui-btn weui-btn_block weui-btn_primary btn">{{ started ? '重新开始' : '开始' }}</a>
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

@Component({
  components: {
    ChineseChess
  },
  computed: mapState('game', ['game']),
  methods: {
    ...mapActions('game', { initGame: 'initGame' })
  }
})
export default class Home extends Vue {
  private started = false
  private game!: Game

  @GameAction initGame!: () => IGameState

  onStart() {
    this.started = true
    this.initGame()
  }
}
</script>

<style scoped lang='less'>
.chinese-chess {
  // margin: 10px 10px;
}
</style>
