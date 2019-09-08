import Board from '@/chess/Board'
import { Piece, J, Z, M, X, S, P, B, Color } from '@/chess/Piece'
import { createGame, createBoard } from '@/chess/Game'

describe('Board', () => {
  it('getAllPieces', () => {
    const board = createBoard()
    expect(board.getAllPieces().length).toBe(32)
  })

  it('updatePiece', () => {
    ;[
      {
        pieces: [new J({ color: 'r', pos: [4, 5] })],
        pos: [4, 5],
        newPos: [4, 5],
        eaten: false,
        canMove: false
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] })],
        pos: [4, 5],
        newPos: [5, 5],
        eaten: false,
        canMove: true
      },
      {
        pieces: [new J({ color: 'r', pos: [4, 5] }), new Z({ color: 'b', pos: [4, 6] })],
        pos: [4, 5],
        newPos: [4, 6],
        eaten: true,
        canMove: true,
        currentPlayer: 'b'
      }
    ].forEach(({ pieces, pos, newPos, eaten, canMove, currentPlayer }) => {
      const board = new Board(pieces)
      const pieceNum = board.getPieceNum()
      if (currentPlayer) board.currentPlayer = currentPlayer as Color
      const piece = board.cells[pos[0]][pos[1]] as Piece
      board.updatePiece(piece, newPos)
      if (canMove) {
        expect(board.cells[pos[0]][pos[1]]).toBe(null)
        expect(board.cells[newPos[0]][newPos[1]]).toBe(piece)
        if (eaten) expect(board.getPieceNum()).toBe(pieceNum - 1)
      }
    })
  })

  it('backMove', () => {
    const bm1 = new M({ color: 'b', pos: [1, 0], key: 'bm1' })
    const bp1 = new P({ color: 'b', pos: [1, 2], key: 'bp1' })

    const j1 = new J({ color: 'r', pos: [0, 9], key: 'rj1' })
    const m1 = new M({ color: 'r', pos: [1, 9], key: 'rm1' })
    const x1 = new X({ color: 'r', pos: [2, 9], key: 'rx1' })
    const s1 = new S({ color: 'r', pos: [3, 9], key: 'rs1' })
    const b = new B({ color: 'r', pos: [4, 9], key: 'rb' })
    const s2 = new S({ color: 'r', pos: [5, 9], key: 'rs2' })
    const x2 = new X({ color: 'r', pos: [6, 9], key: 'rx2' })
    const m2 = new M({ color: 'r', pos: [7, 9], key: 'rm2' })
    const j2 = new J({ color: 'r', pos: [8, 9], key: 'rj2' })
    const p1 = new P({ color: 'r', pos: [1, 7], key: 'rp1' })
    const p2 = new P({ color: 'r', pos: [7, 7], key: 'rp2' })
    const z1 = new Z({ color: 'r', pos: [0, 6], key: 'rz1' })
    const z2 = new Z({ color: 'r', pos: [2, 6], key: 'rz2' })
    const z3 = new Z({ color: 'r', pos: [4, 6], key: 'rz3' })
    const z4 = new Z({ color: 'r', pos: [6, 6], key: 'rz4' })
    const z5 = new Z({ color: 'r', pos: [8, 6], key: 'rz5' })
    const pieces = [bm1, bp1, j1, m1, m2, x1, x2, b, s1, s2, j2, p1, p2, z1, z2, z3, z4, z5]
    const board = new Board(pieces)
    board.updatePiece(j1, [0, 8])
    board.updatePiece(m1, [0, 7])
    board.backMoves(2)
    expect(board.cells[0][9]).toBe(j1)
    expect(m1.pos).toEqual([1, 9])
    board.updatePiece(p1, [1, 0])
    board.backMoves()
    expect(board.cells[1][0]).toBe(bm1)
    expect(bm1.pos).toEqual([1, 0])
    board.backMoves()
  })

  it('isFinish', () => {
    ;[
      {
        pieces: [
          new Z({ color: 'r', pos: [8, 6], key: 'rz5' }),
          new B({ color: 'r', pos: [4, 9], key: 'rb' }),
          new B({ color: 'b', pos: [4, 0], key: 'rb' })
        ],
        expected: false
      },
      {
        pieces: [
          new Z({ color: 'r', pos: [8, 6], key: 'rz5' }),
          new B({ color: 'b', pos: [4, 0], key: 'rb' })
        ],
        expected: true
      }
    ].forEach(({ pieces, expected }) => {
      const board = new Board(pieces)
      expect(board.isFinish()).toBe(expected)
    })
  })
})
