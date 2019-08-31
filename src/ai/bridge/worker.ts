import Msg from '../../const'
import { AiType, createAi } from '..'
import { IAI } from '../AI'
import Board from '@/chess/Board'
import { B, J, M, P, S, Z, X, Piece, Color } from '@/chess/Piece'
import { Role } from '@/chess/Piece/Piece'

const createPiece = ({ color, pos, key, role }: Piece): Piece => {
  const mPiece = {
    b: B,
    j: J,
    m: M,
    p: P,
    s: S,
    x: X,
    z: Z
  }

  return new (mPiece[role as Role])({ color, pos, key })
}

const recoverBoard = (board: Board) => {
  const pieces: Piece[] = []
  ;[...board.pieces.b, ...board.pieces.r].forEach(piece => pieces.push(createPiece(piece)))
  return new Board(pieces)
}

let ai: IAI

self.onmessage = async (e: { data: { type: string; data: any } }) => {
  const {
    data: { type, data }
  } = e
  console.log('get message: ')
  console.log(type, data)
  switch (type) {
    case Msg.INIT_AI:
      const { aiType, depth } = data as { depth: number; aiType: AiType; }
      ai = createAi({ aiType, depth })
      break
    case Msg.GET_NEXT_MOVE:
      let { board: rawBoard, color } = data as { board: Board; color: Color }
      // the board from message is the pure data without prototype
      const board = recoverBoard(rawBoard)
      const nextMove = await ai.getNextMove(board, color)
      console.log('------')
      // @ts-ignore: don't know how to pass the second arg
      self.postMessage({ type: Msg.RETURN_NEXT_MOVE, data: { ...nextMove } })
      break
    default:
  }
}
