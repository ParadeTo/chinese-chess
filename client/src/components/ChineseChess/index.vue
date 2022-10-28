<template>
  <div>
    <div class="board" @click="onBoardClick" ref="board">
      <img src="./img/board.png" class="bg" ref="bg" />
      <template :if="pieces.length">
        <!-- <img
        :key="`${piece.key}${piece.pos[0]}${piece.pos[1]}`"
        :src="getImg(piece)"
        :style="`${getPiecePos(piece)}`"
        :class="piece.selected && game.currentPlayer.color === piece.color && 'selected'"
        @click="onPieceClick(piece)"
        class="piece"
        v-for="piece in pieces"
      />-->
        <img
          :key="`${piece.key}`"
          :src="getImg(piece)"
          :style="`${getPiecePos(piece)}`"
          :class="piece.selected && 'selected'"
          @click.stop="onPieceClick(piece)"
          class="piece"
          v-for="piece in pieces"
        />
      </template>
    </div>
    <Loading :isLoading="isLoading" />
    <Dialog :show="showDialog" :content="content" :hasCancel="false" @ok="onOK" />
    <Kill :isLoading="showKill" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Game from '@/chess/Game'
import Board, { UpdatePieceResult } from '@/chess/Board'
import { Piece } from '@/chess/Piece'
import Player from '@/chess/Player'
import { CancelablePromise } from '@/utils'
import Loading from '../Loading/index.vue'
import Dialog from '../Dialog/index.vue'
import Kill from '../Kill/index.vue'

const startX = 7
const startY = 2
const xInterval = 9.8
const yInterval = 9.6
const pieceWidth = 9
const buff = 0.4

@Component({
  components: {
    Loading,
    Dialog,
    Kill
  }
})
export default class ChineseChess extends Vue {
  @Prop() private game!: Game

  width: number = 0
  height: number = 0
  gameOver: boolean = false
  selectedPiece!: Piece | null
  isLoading: boolean = false
  showKill: boolean = false
  showDialog: boolean = false
  content: string = ''

  mounted() {
    const { width } = (this.$refs.board as Element).getBoundingClientRect()
    this.width = width
    ;(this.$refs.bg as HTMLImageElement).onload = e => {
      this.height = (this.$refs.bg as HTMLImageElement).height
    }
  }

  getImg(piece: Piece) {
    return require(`./img/${piece.color}${piece.role}.png`)
  }

  getPiecePos(piece: Piece) {
    return `top: ${piece.pos[1] * yInterval + startY}%; left: ${piece.pos[0] * xInterval +
      startX}%;`
  }

  getClickPos(offsetX: number, offsetY: number) {
    let boardX = -1
    let boardY = -1

    const x = ((offsetX * 100) / this.width - (startX + pieceWidth / 2)) / xInterval
    const xLow = Math.floor(x)
    const xHigh = Math.ceil(x)
    if (xLow + buff > x) boardX = xLow
    if (xHigh - buff < x) boardX = xHigh
    if (boardX < 0 || boardX >= Board.WIDTH) boardX = -1

    const y = ((offsetY * 100) / this.height - (startY + pieceWidth / 2)) / yInterval
    const yLow = Math.floor(y)
    const yHigh = Math.ceil(y)
    if (yLow + buff > y) boardY = yLow
    if (yHigh - buff < y) boardY = yHigh
    if (boardY < 0 || boardY >= Board.HEIGHT) boardY = -1

    return [Math.abs(boardX), Math.abs(boardY)]
  }

  onPieceClick(piece: Piece) {
    // if (this.gameOver) return

    if (this.selectedPiece && this.selectedPiece.color !== piece.color) {
      this.moveStepForHuman(this.selectedPiece, piece.pos)
      return
    }

    if (piece.selected) {
      piece.selected = false
      return
    }
    this.pieces.forEach(p => {
      p.selected = false
    })

    if (piece.color === this.game.currentPlayer.color && this.game.currentPlayer.type === 'human') {
      piece.selected = true
      this.selectedPiece = piece
    }
  }

  async onBoardClick(e: MouseEvent) {
    const { offsetX, offsetY } = e
    const [x, y] = this.getClickPos(offsetX, offsetY)

    if (x === -1 || y === -1) {
      this.pieces.forEach(piece => {
        piece.selected = false
      })
      return
    }

    if (this.selectedPiece) {
      this.moveStepForHuman(this.selectedPiece, [x, y])
    }
  }

  moveStepForHuman(piece: Piece, dest: number[]) {
    const { result, eatenPiece } = this.game.updatePiece(piece, dest)
    if (this.game.isSuicide()) {
      return this.game.board.backMoves()
    }

    if (this.game.isGameOver()) {
      return this.overGame()
    }

    if (this.game.wantToKill()) {
      this.showKill = true
      setTimeout(() => {
        this.showKill = false
      }, 800)
    }

    if (result) {
      this.game.switchPlayer()
      if (this.selectedPiece) {
        this.selectedPiece = null
        piece.selected = false
      }
    }
  }

  setLoading() {
    let abortController = new AbortController()
    let tId
    // eslint-disable-next-line
    new CancelablePromise<void>((resolve, reject) => {
      tId = setTimeout(() => {
        this.isLoading = true
        resolve()
      }, 1000)
    }, abortController.signal).catch(() => clearTimeout(tId))
    return abortController
  }

  async moveStepForAi() {
    const abortController = this.setLoading()
    await this.autoMove()
    this.isLoading = false
    abortController.abort()

    if (this.game.isGameOver()) {
      return this.overGame()
    }

    if (this.game.wantToKill()) {
      this.showKill = true
      setTimeout(() => {
        this.showKill = false
      }, 800)
    }

    this.game.switchPlayer()
  }

  overGame() {
    console.log(this.game.currentPlayer)
    this.content = (this.game.currentPlayer.color === 'r' ? '红' : '黑') + '方胜！'

    setTimeout(() => {
      this.showDialog = true
    }, 500)
  }

  onOK() {
    this.showDialog = false
    this.$emit('gameOver')
  }

  autoMove(): Promise<UpdatePieceResult> {
    return this.game.autoMove()
  }

  get pieces() {
    return this.game && this.game.board && this.game.board.getAllPieces()
  }

  @Watch('game.currentPlayer', { deep: true })
  onChange() {
    if (!this.game) return
    if (this.game.currentPlayer.type === 'ai') {
      this.moveStepForAi()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang="less">
.board {
  width: 100%;
  font-size: 0;
  position: relative;
  .bg {
    width: 100%;
  }
  .piece {
    position: absolute;
    width: 9%;
    top: 0;
    left: 0;
    transition: 0.3s left, 0.3s top;
    &.selected {
      box-shadow: 0px 0px 3px 1px #fff700;
    }
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 1px 1px 2px 1px #333;
  }
}
</style>
