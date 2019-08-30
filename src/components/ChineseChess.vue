<template>
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
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Game from '@/chess/Game'
import Board, { UpdatePieceResult } from '@/chess/Board'
import { Piece } from '../chess/Piece'

const startX = 7
const startY = 2
const xInterval = 9.8
const yInterval = 9.6
const pieceWidth = 9
const buff = 0.2

@Component({})
export default class ChineseChess extends Vue {
  @Prop() private game!: Game

  pieces: Piece[] = []
  width: number = 0
  height: number = 0
  gameOver: boolean = false
  selectedPiece!: Piece

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

    return [boardX, boardY]
  }

  onPieceClick(piece: Piece) {
    if (this.gameOver) return

    if (this.selectedPiece && this.selectedPiece.color !== piece.color) {
      this.processOneRound(this.selectedPiece, piece.pos)
      return
    }

    if (piece.selected) {
      piece.selected = false
      return
    }

    this.pieces.forEach(p => {
      p.selected = false
    })

    if (piece.color === this.game.currentPlayer.color && this.game.currentPlayer.name === 'human') {
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

    const selectedPiece = this.pieces.find(piece => piece.selected)
    if (selectedPiece) {
      this.processOneRound(selectedPiece, [x, y])
    }
  }

  async processOneRound(piece: Piece, dest: number[]) {
    const { result, eatenPiece } = this.game.updatePiece(piece, dest)
    if (result) {
      eatenPiece && this.rmEatenPiece(eatenPiece)
      if (eatenPiece && eatenPiece.role === 'b') return this.overGame(eatenPiece)
      this.game.switchPlayer()
      this.selectedPiece.selected = false
      const { result: autoMoveResult, eatenPiece: autoMoveEatenPiece } = await this.autoMove()
      if (autoMoveResult) {
        this.game.switchPlayer()
        autoMoveEatenPiece && this.rmEatenPiece(autoMoveEatenPiece)
        if (autoMoveEatenPiece && autoMoveEatenPiece.role === 'b') return this.overGame(autoMoveEatenPiece)
      }
      return true
    }
    return false
  }

  overGame(eatenPiece: Piece) {
    this.$nextTick(() => {
      window.alert(`${eatenPiece.color === 'r' ? 'Black' : 'Red'} side win!`)
    })
    this.gameOver = true
  }

  async autoMove(): Promise<UpdatePieceResult> {
    return Promise.resolve(await this.game.autoMove())
    // return new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //     resolve()
    //   }, 400)
    // })
  }

  rmEatenPiece(eatenPiece: Piece) {
    const index = this.pieces.findIndex(piece => piece === eatenPiece)
    this.pieces.splice(index, 1)
  }

  @Watch('game')
  onGameChange() {
    this.pieces = this.game && this.game.board && this.game.board.getAllPieces()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
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
      box-shadow: 0px 0px 4px 2px #fff700;
    }
  }
}
</style>
