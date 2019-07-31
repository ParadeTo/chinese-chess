<template>
  <div class="board" @click="onBoardClick" ref="board">
    <img src="./img/board.png" class="bg" ref="bg" />
    <pre>
      {{pieces}}
    </pre>
    <template :if="pieces.length">
      <img
        :key="`${piece.key}${piece.pos[0]}${piece.pos[1]}`"
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
import Board from '../chess/Board'
import { Piece } from '../chess/Piece'

const startX = 7
const startY = 2
const xInterval = 9.8
const yInterval = 9.6
const pieceWidth = 9
const buff = 0.2

@Component({})
export default class BoardComp extends Vue {
  @Prop() private board!: Board

  pieces: Piece[] = []
  width: number = 0
  height: number = 0

  mounted() {
    const { width } = (this.$refs.board as Element).getBoundingClientRect()
    this.width = width
    ;(this.$refs.bg as HTMLImageElement).onload = e => {
      this.height = (this.$refs.bg as HTMLImageElement).height
    }
  }

  getImg(piece: Piece) {
    console.log(piece)
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
    if (piece.selected) {
      piece.selected = false
      return
    }
    this.pieces.forEach(p => {
      p.selected = false
    })
    piece.selected = true
  }

  onBoardClick(e: MouseEvent) {
    const { offsetX, offsetY } = e
    const [x, y] = this.getClickPos(offsetX, offsetY)

    if (x === -1 || y === -1) {
      this.pieces.forEach(piece => {
        piece.selected = false
      })
      return
    }

    const selectedPiece = this.pieces.find(piece => piece.selected)
    if (selectedPiece) this.board.updatePiece(selectedPiece, [x, y])
  }

  @Watch('board')
  onBoardChange() {
    this.pieces = (this.board && this.board.pieces)
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
    &.selected {
      box-shadow: 0px 0px 4px 2px #fff700;
    }
  }
}
</style>
