<template>
  <div class="home">
    <ChineseChess :game="game" />
    <button class="btn" @click="onStart">{{ started ? 'ReStart' : 'Start' }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { Getter, Mutation, namespace } from 'vuex-class'

import ChineseChess from '@/components/ChineseChess.vue'
import Game from '../chess/Game'
import { IGameState } from '../store/types'

const GameGetter = namespace('game', Getter)
const GameMutation = namespace('game', Mutation)

@Component({
  components: {
    ChineseChess
  },
  computed: mapState('game', ['game']),
  methods: {
    ...mapMutations('game', { initGame: 'initGame' })
  }
})
export default class Home extends Vue {
  private started = false
  private game!: Game

  @GameMutation initGame!: () => IGameState

  onStart() {
    this.started = true
    this.initGame()
  }
}
</script>

<style scoped lang='less'>
@import '../var.less';
.btn {
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 20% 0 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: #ffffff;
  background-color: @primary-color;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  width: 70%;
  &:active {
    top: 0.1em;
  }
}
</style>
