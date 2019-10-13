import { Piece, B, J, M, P, S, X, Z, Color } from './Piece'

// bug board
// 车一进七
export const pieces1 = [
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

// 车进一
export const pieces2 = [
  new X({ color: 'b', pos: [2, 0], key: 'bx1' }),
  new S({ color: 'b', pos: [3, 0], key: 'bs1' }),
  new S({ color: 'b', pos: [5, 0], key: 'bs2' }),
  new X({ color: 'b', pos: [6, 0], key: 'bx2' }),
  new P({ color: 'b', pos: [4, 2], key: 'bp1' }),
  new P({ color: 'b', pos: [6, 2], key: 'bp2' }),
  new B({ color: 'r', pos: [4, 8], key: 'rb' }),
  new J({ color: 'r', pos: [5, 3], key: 'rj2' })
]
