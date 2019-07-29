<template>
  <div class="home">
    <Board :board="game && game.board" />
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import { Action, State, Getter, Mutation, namespace } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

import Board from '@/components/Board.vue'
import Game from '@/chess/Game'
import { IGameState } from '../store/types'

const GameGetter = namespace('game', Getter)
const GameMutation = namespace('game', Mutation)

@Component({
  components: {
    Board
  },
  computed: mapState('game', [ 'game' ]),
  methods: {
    ...mapMutations('game', { initGame: 'initGame' })
  }
})
export default class Home extends Vue {
  private game!: Game
  @GameMutation initGame!: () => IGameState
  mounted () {
    this.initGame()
  }
}
</script>
