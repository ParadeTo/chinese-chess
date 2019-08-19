import AI, { IAI } from '../AI'
import { Piece, Color, J } from '@/chess/Piece'
import Board from '@/chess/Board'

interface IPieceNodes {
  piece: Piece
  from: number[]
  nodes: {
    to: number[]
    value: number
  }[]
}

export default class MiniMaxAI extends AI implements IAI {
  depth: number
  constructor({ board, color, depth }: { depth: number; board: Board; color: Color }) {
    super(board, color)
    this.depth = depth
  }

  generateNodes(forSelf: boolean) {
    let color: Color = this.color === 'r' ? 'b' : 'r'
    if (forSelf) {
      color = this.color === 'r' ? 'r' : 'b'
    }
    const pieces = this.board.pieces[color]
    const pieceNodes: IPieceNodes[] = []
    for (let piece of pieces) {
      const nodes = piece.getNextPositions(this.board).map(pos => ({
        to: pos,
        value: -Infinity
      }))
      const pieceNode = { piece, from: piece.pos, nodes }
      pieceNodes.push(pieceNode)
    }
    return pieceNodes
  }

  search(depth: number, forSelf: boolean) {
    const pieceNodes = this.generateNodes(forSelf)
    for (let pieceNode of pieceNodes) {
      const { piece, from, nodes } = pieceNode
      for (let node of nodes) {
        const result = this.board.updatePiece(piece, node.to)
      }
    }
  }

  getNextMove(): Promise<{ piece: Piece; dest: number[] }> {
    return Promise.resolve({
      piece: new J({ color: 'r', pos: [0, 0] }),
      dest: [0, 0]
    })
  }
}
