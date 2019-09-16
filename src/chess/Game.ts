import Board, { UpdatePieceResult } from './Board'
import { Piece, B, J, M, P, S, X, Z, Color } from './Piece'
import { IAI } from '@/ai/AI'
import Player from './Player'
import RandomAI from '@/ai/random'
import MiniMaxAI from '@/ai/minimax'
import Bridge from '@/ai/bridge'

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

  switchPlayer() {
    if (this.currentPlayer === this.tPlayer) this.currentPlayer = this.bPlayer
    else this.currentPlayer = this.tPlayer
  }

  updatePiece(piece: Piece, newPos: number[], _piece?: any): UpdatePieceResult {
    if (piece.color === this.currentPlayer.color) {
      return this.board.updatePiece(piece, newPos)
    }
    return { result: false }
  }

  async autoMove() {
    let nextMove
    if (this.currentPlayer.ai) {
      nextMove = await this.currentPlayer.ai.getNextMove(this.board, this.currentPlayer.color)
      if (nextMove) {
        const { from, to, piece } = nextMove as any
        return this.updatePiece(this.board.cells[from[0]][from[1]] as Piece, to, piece)
      }
    }
    throw new Error('Only ai can execute autoMove!')
  }
}

// bug board
// 车一进七
const pieces1 = [
  new J({ color: 'b', pos: [0, 0], key: 'bj1' }),
  new X({ color: 'b', pos: [2, 0], key: 'bx1' }),
  new S({ color: 'b', pos: [3, 0], key: 'bs1' }),
  new B({ color: 'b', pos: [4, 0], key: 'bb' }),
  new S({ color: 'b', pos: [4, 1], key: 'bs2' }),
  new J({ color: 'b', pos: [7, 0], key: 'bj2' }),
  new X({ color: 'b', pos: [4, 2], key: 'bx2' }),
  new Z({ color: 'b', pos: [0, 3], key: 'bz1' }),
  new Z({ color: 'b', pos: [8, 3], key: 'bz2' }),
  new Z({ color: 'b', pos: [2, 7], key: 'bz3' }),
  new P({ color: 'b', pos: [8, 7], key: 'bp1' }),
  new P({ color: 'b', pos: [1, 2], key: 'bp2' }),

  new J({ color: 'r', pos: [1, 9], key: 'rj1' }),
  new J({ color: 'r', pos: [3, 1], key: 'rj2' }),
  new M({ color: 'r', pos: [4, 3], key: 'rm1' }),
  new M({ color: 'r', pos: [0, 7], key: 'rm2' }),
  new Z({ color: 'r', pos: [0, 6], key: 'rz1' }),
  new Z({ color: 'r', pos: [4, 6], key: 'rz2' }),
  new P({ color: 'r', pos: [3, 7], key: 'rp1' }),
  new P({ color: 'r', pos: [7, 7], key: 'rp2' }),
  new X({ color: 'r', pos: [4, 7], key: 'rx1' }),
  new X({ color: 'r', pos: [2, 9], key: 'rx2' }),
  new S({ color: 'r', pos: [3, 9], key: 'rs1' }),
  new S({ color: 'r', pos: [4, 8], key: 'rs2' }),
  new B({ color: 'r', pos: [4, 9], key: 'rb' })
]

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

export const createGame = (depth: number = 5) => {
  const board = createBoard()
  // const tPlayer = new Player('b', 'robot', new RandomAI(board, 'b'))
  // const tPlayer = new Player('b', 'robot', new MiniMaxAI({ board, color: 'b', depth: 3 }))
  const tPlayer = new Player(
    'r',
    'ai',
    new Bridge({ depth, board, color: 'b', aiType: 'minimax', workerPath: '/ai.bundle.js' })
  )
  const bPlayer = new Player('b', 'human')
  return new Game(board, bPlayer, tPlayer)
}
