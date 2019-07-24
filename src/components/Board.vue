<template>
  <div class="board">
    <img src="./img/board.png" alt="">
    <pre>
      {{board}}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Board from '../chess/Board'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  @Prop() private board!: Board
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.board {
  width: 100%;
  font-size: 0;
  img {
    width: 100%;
  }
}
</style>
