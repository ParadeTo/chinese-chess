import Board, { UpdatePieceResult } from './Board'
import { Piece, B, J, M, P, S, X, Z } from './Piece'
import Player from './Player'
import Bridge from '@/ai/bridge'
import { IPlayer } from '../store/types'
import ProxyAi from '@/ai/proxy'
import WasmAi from '@/ai/wasm'
import MiniMaxAI from '@/ai/minimax'

export default class Game {
  board: Board
  bPlayer: Player
  tPlayer: Player
  public currentPlayer: Player
  constructor(board: Board, bPlayer: Player, tPlayer: Player) {
    this.board = board
    this.bPlayer = bPlayer
    this.tPlayer = tPlayer
    this.currentPlayer = this.bPlayer.color === 'r' ? this.bPlayer : this.tPlayer
  }

  getOpponent() {
    return this.currentPlayer === this.tPlayer ? this.bPlayer : this.tPlayer
  }

  switchPlayer() {
    if (this.currentPlayer === this.tPlayer) this.currentPlayer = this.bPlayer
    else this.currentPlayer = this.tPlayer
  }

  updatePiece(piece: Piece, newPos: number[], _piece?: any): UpdatePieceResult {
    if (piece.color === this.currentPlayer.color) {
      const r = this.board.updatePiece(piece, newPos)
      this.updateOpponentPiece(piece, newPos)
      return r
    }
    return { result: false }
  }

  updateOpponentPiece(piece: Piece, newPos: number[]) {
    const opponent = this.getOpponent()
    if (opponent.ai && opponent.ai.needUpdateBoard()) {
      opponent.ai.updatePiece(piece, newPos)
    }
  }

  async autoMove() {
    let nextMove
    if (this.currentPlayer.ai) {
      nextMove = await this.currentPlayer.ai.getNextMove(this.board, this.currentPlayer.color)
      if (nextMove) {
        const { from, to, piece } = nextMove as any
        // this.updateOpponentPiece(piece, to)
        return this.updatePiece(this.board.cells[from[0]][from[1]] as Piece, to, piece)
      }
    }
    throw new Error('Only ai can execute autoMove!')
  }
}

export const createBoard = () => {
  const pieces = [
    new J({ color: 'b', pos: [0, 0], key: 'bj1' }),
    new M({ color: 'b', pos: [1, 0], key: 'bm1' }),
    new X({ color: 'b', pos: [2, 0], key: 'bx1' }),
    new S({ color: 'b', pos: [3, 0], key: 'bs1' }),
    new B({ color: 'b', pos: [4, 0], key: 'bb' }),
    new S({ color: 'b', pos: [5, 0], key: 'bs2' }),
    new X({ color: 'b', pos: [6, 0], key: 'bx2' }),
    new M({ color: 'b', pos: [7, 0], key: 'bm2' }),
    new J({ color: 'b', pos: [8, 0], key: 'bj2' }),
    new P({ color: 'b', pos: [1, 2], key: 'bp1' }),
    new P({ color: 'b', pos: [7, 2], key: 'bp2' }),
    new Z({ color: 'b', pos: [0, 3], key: 'bz1' }),
    new Z({ color: 'b', pos: [2, 3], key: 'bz2' }),
    new Z({ color: 'b', pos: [4, 3], key: 'bz3' }),
    new Z({ color: 'b', pos: [6, 3], key: 'bz4' }),
    new Z({ color: 'b', pos: [8, 3], key: 'bz5' }),

    new J({ color: 'r', pos: [0, 9], key: 'rj1' }),
    new M({ color: 'r', pos: [1, 9], key: 'rm1' }),
    new X({ color: 'r', pos: [2, 9], key: 'rx1' }),
    new S({ color: 'r', pos: [3, 9], key: 'rs1' }),
    new B({ color: 'r', pos: [4, 9], key: 'rb' }),
    new S({ color: 'r', pos: [5, 9], key: 'rs2' }),
    new X({ color: 'r', pos: [6, 9], key: 'rx2' }),
    new M({ color: 'r', pos: [7, 9], key: 'rm2' }),
    new J({ color: 'r', pos: [8, 9], key: 'rj2' }),
    new P({ color: 'r', pos: [1, 7], key: 'rp1' }),
    new P({ color: 'r', pos: [7, 7], key: 'rp2' }),
    new Z({ color: 'r', pos: [0, 6], key: 'rz1' }),
    new Z({ color: 'r', pos: [2, 6], key: 'rz2' }),
    new Z({ color: 'r', pos: [4, 6], key: 'rz3' }),
    new Z({ color: 'r', pos: [6, 6], key: 'rz4' }),
    new Z({ color: 'r', pos: [8, 6], key: 'rz5' })
  ]
  const board = new Board(pieces)
  return board
}

let workerPath = '/ai.bundle.js'
if (process.env.VUE_APP_ENV === 'blog') {
  workerPath = '/js/vue-chinese-chess/ai.bundle.js'
}

const createPlayer = (player: IPlayer, board?: Board) => {
  const { color, type, level, aiType } = player
  if (type === 'human') return new Player(color, type)
  else {
    const ai =
      aiType === 'js'
        ? new Bridge({
            depth: level as number,
            board: board as Board,
            color,
            aiType: 'minimax',
            // eslint-disable-next-line comma-dangle
            workerPath
          })
        : new WasmAi(level + 1)
    return new Player(
      color,
      type,
      ai

      // new Bridge({
      //   depth: level as number,
      //   board: board as Board,
      //   color,
      //   aiType: 'minimax',
      //   // eslint-disable-next-line comma-dangle
      //   workerPath
      // })
      // new ProxyAi()
    )
  }
}

export const createGame = (players: IPlayer[]) => {
  const board = createBoard()
  const tPlayer = createPlayer(players[0], board)
  const bPlayer = createPlayer(players[1])
  return new Game(board, bPlayer, tPlayer)
}
