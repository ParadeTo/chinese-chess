use crate::piece::b::B;
use crate::piece::z::Z;
use crate::piece::{j::J, m::M, p::P, s::S, x::X};
use crate::piece::{IPiece, Piece};
use crate::shared::{Color, Pos, Role, Side, HEIGHT, WIDTH};
use ndarray::Array2;
use std::collections::HashMap;
use std::convert::TryInto;
use std::fmt::{self, Display};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[derive(Default, Debug, Clone)]
pub struct Move {
    pub from: Pos,
    pub to: Pos,
}
#[derive(Default, Debug, Clone)]
pub struct Record {
    m: Move,
    eaten: Option<Piece>,
}

#[derive(Clone)]

pub struct Board {
    pub cells: Array2<Option<Piece>>,
    // pub pieces: HashMap<Color, Vec<Piece>>,
    records: Vec<Record>,
}
impl Board {
    pub fn new(_pieces: Vec<Piece>) -> Board {
        let mut cells: Array2<Option<Piece>> = Array2::<Option<Piece>>::default((WIDTH, HEIGHT));
        let mut piecesMap = HashMap::new();
        let mut rVec = Vec::new();
        let mut bVec = Vec::new();
        for piece in _pieces.iter() {
            let Pos(x, y) = *piece.get_pos();
            cells[[x as usize, y as usize]] = Option::<Piece>::Some(piece.clone());
            match piece.get_color() {
                Color::Red => rVec.push(piece.clone()),
                Color::Black => bVec.push(piece.clone()),
            };
        }
        piecesMap.insert(Color::Black, bVec);
        piecesMap.insert(Color::Red, rVec);
        Board {
            cells,
            // pieces: piecesMap,
            records: Vec::new(),
        }
    }

    pub fn default() -> Board {
        let bj1 = J::new(Color::Black, Pos(0, 0), Side::Top);
        let bm1 = M::new(Color::Black, Pos(1, 0), Side::Top);
        let bx1 = X::new(Color::Black, Pos(2, 0), Side::Top);
        let bs1 = S::new(Color::Black, Pos(3, 0), Side::Top);
        let bb = B::new(Color::Black, Pos(4, 0), Side::Top);
        let bs2 = S::new(Color::Black, Pos(5, 0), Side::Top);
        let bx2 = X::new(Color::Black, Pos(6, 0), Side::Top);
        let bm2 = M::new(Color::Black, Pos(7, 0), Side::Top);
        let bj2 = J::new(Color::Black, Pos(8, 0), Side::Top);
        let bp1 = P::new(Color::Black, Pos(1, 2), Side::Top);
        let bp2 = P::new(Color::Black, Pos(7, 2), Side::Top);
        let bz1 = Z::new(Color::Black, Pos(0, 3), Side::Top);
        let bz2 = Z::new(Color::Black, Pos(2, 3), Side::Top);
        let bz3 = Z::new(Color::Black, Pos(4, 3), Side::Top);
        let bz4 = Z::new(Color::Black, Pos(6, 3), Side::Top);
        let bz5 = Z::new(Color::Black, Pos(8, 3), Side::Top);

        let rj1 = J::new(Color::Red, Pos(0, 9), Side::Bottom);
        let rm1 = M::new(Color::Red, Pos(1, 9), Side::Bottom);
        let rx1 = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let rs1 = S::new(Color::Red, Pos(3, 9), Side::Bottom);
        let rb = B::new(Color::Red, Pos(4, 9), Side::Bottom);
        let rs2 = S::new(Color::Red, Pos(5, 9), Side::Bottom);
        let rx2 = X::new(Color::Red, Pos(6, 9), Side::Bottom);
        let rm2 = M::new(Color::Red, Pos(7, 9), Side::Bottom);
        let rj2 = J::new(Color::Red, Pos(8, 9), Side::Bottom);
        let rp1 = P::new(Color::Red, Pos(1, 7), Side::Bottom);
        let rp2 = P::new(Color::Red, Pos(7, 7), Side::Bottom);
        let rz1 = Z::new(Color::Red, Pos(0, 6), Side::Bottom);
        let rz2 = Z::new(Color::Red, Pos(2, 6), Side::Bottom);
        let rz3 = Z::new(Color::Red, Pos(4, 6), Side::Bottom);
        let rz4 = Z::new(Color::Red, Pos(6, 6), Side::Bottom);
        let rz5 = Z::new(Color::Red, Pos(8, 6), Side::Bottom);

        Board::new(
            [
                Piece::J(bj1),
                Piece::M(bm1),
                Piece::X(bx1),
                Piece::S(bs1),
                Piece::B(bb),
                Piece::S(bs2),
                Piece::X(bx2),
                Piece::M(bm2),
                Piece::J(bj2),
                Piece::P(bp1),
                Piece::P(bp2),
                Piece::Z(bz1),
                Piece::Z(bz2),
                Piece::Z(bz3),
                Piece::Z(bz4),
                Piece::Z(bz5),
                Piece::J(rj1),
                Piece::M(rm1),
                Piece::X(rx1),
                Piece::S(rs1),
                Piece::B(rb),
                Piece::S(rs2),
                Piece::X(rx2),
                Piece::M(rm2),
                Piece::J(rj2),
                Piece::P(rp1),
                Piece::P(rp2),
                Piece::Z(rz1),
                Piece::Z(rz2),
                Piece::Z(rz3),
                Piece::Z(rz4),
                Piece::Z(rz5),
            ]
            .to_vec(),
        )
    }

    pub fn update_piece(&mut self, pos: &Pos, new_pos: &Pos) -> (bool, Option<Piece>) {
        let mut cells = self.cells.clone();
        // if cells[[pos.0 as usize, pos.1 as usize]].is_none() {
        //     println!("{:}, {:?}", self, pos);
        // }
        let piece = cells[[pos.0 as usize, pos.1 as usize]].as_mut().unwrap();
        if !self.can_move(&piece, new_pos) {
            return (false, Option::None);
        }

        let Pos(new_x, new_y) = *new_pos;

        let mut hasEaten = false;
        if self.cells[[new_x as usize, new_y as usize]].is_some() {
            hasEaten = true;
            // eaten_piece = self.cells[[new_x as usize, new_y as usize]].unwrap();
            // let eaten_piece = self.cells[[new_x as usize, new_y as usize]]
            //     .as_ref()
            //     .unwrap();

            // let mut pieces = self.pieces.get_mut(eaten_piece.get_color()).unwrap();
            // if let Some(index) = pieces.iter().position(|value| value == eaten_piece) {
            //     (*pieces).swap_remove(index);
            // }
        }

        let Pos(orig_x, orig_y) = *piece.get_pos();

        let record = Record {
            m: Move {
                from: Pos(orig_x, orig_y),
                to: *new_pos,
            },
            eaten: if hasEaten {
                Option::Some(
                    self.cells[[new_x as usize, new_y as usize]]
                        .clone()
                        .unwrap(),
                )
            } else {
                Option::None
            },
        };
        self.records.push(record.clone());

        piece.set_pos(*new_pos);
        self.cells[[orig_x as usize, orig_y as usize]] = Option::None;
        self.cells[[new_x as usize, new_y as usize]] = Option::Some(piece.clone());

        (true, record.eaten)
    }

    pub fn generate_moves(&self, color: &Color) -> Vec<Move> {
        let mut moves = Vec::new();

        for col in 0..WIDTH {
            for row in 0..HEIGHT {
                if let Some(p) = &self.cells[[col, row]] {
                    if p.get_color() != color {
                        continue;
                    }
                    let positions = p.get_next_positions(self);
                    for pos in positions {
                        // if p.get_pos().0 == 1 && p.get_pos().1 == 7 && pos.0 == 3 && pos.1 == 6 {
                        //     println!("{:}", self);
                        //     println!("{:?}", p);
                        //     println!("{:?}", self.cells[[1, 0]].as_ref().unwrap());
                        //     print!("");
                        // };
                        moves.push(Move {
                            from: *p.get_pos(),
                            to: pos,
                        })
                    }
                }
            }
        }
        moves
    }

    pub fn is_finish(&self) -> bool {
        let mut hasRBoss = false;
        let mut hasBBoss = false;

        for col in 0..WIDTH {
            for row in 0..HEIGHT {
                if let Some(p) = &self.cells[[col, row]] {
                    if *p.get_role() == Role::RB {
                        if *p.get_color() == Color::Red {
                            hasRBoss = true;
                        }
                        if *p.get_color() == Color::Black {
                            hasBBoss = true;
                        }
                    }
                }
            }
        }

        return !(hasBBoss && hasRBoss);
    }

    pub fn get_piece_num(&self) -> usize {
        let mut num = 0;
        for col in 0..WIDTH {
            for row in 0..HEIGHT {
                if let Some(_) = &self.cells[[col, row]] {
                    num += 1;
                }
            }
        }
        num
    }

    pub fn get_piece_by_pos(&self, pos: &Pos) -> Option<Piece> {
        let Pos(x, y) = *pos;
        self.cells[[x as usize, y as usize]].clone()
    }

    pub fn get_next_positions(&self, piece: Piece) -> Vec<Pos> {
        piece.get_next_positions(self)
    }

    pub fn can_move(&self, piece: &Piece, pos: &Pos) -> bool {
        return self.in_board(pos) && piece.can_move(pos, self);
    }

    fn in_board(&self, pos: &Pos) -> bool {
        let Pos(x, y) = *pos;
        return x >= 0 && x < WIDTH.try_into().unwrap() && y >= 0 && y < HEIGHT.try_into().unwrap();
    }

    pub fn back_moves(&mut self, steps: u32) {
        for _ in 0..steps {
            if self.records.len() == 0 {
                break;
            }

            if let Some(last_move) = self.records.pop() {
                let from = last_move.m.from;
                let to = last_move.m.to;
                let piece = self.cells[[to.0 as usize, to.1 as usize]].as_mut().unwrap();
                let option_eaten = last_move.eaten;
                piece.set_pos(from);
                self.cells[[from.0 as usize, from.1 as usize]] = Some(piece.clone());
                if let Some(mut eaten) = option_eaten {
                    self.cells[[to.0 as usize, to.1 as usize]] = Some(eaten.clone());
                } else {
                    self.cells[[to.0 as usize, to.1 as usize]] = None;
                }
            }
        }
    }
}

impl Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for row in 0..HEIGHT {
            for col in 0..WIDTH {
                write!(
                    f,
                    "{}",
                    match &self.cells[[col, row]] {
                        Some(p) => {
                            let color = p.get_color().as_str();
                            let role = p.get_role().as_str();
                            format!("{color}{role} ")
                        }
                        None => "** ".to_string(),
                    }
                );
            }
            writeln!(f, "");
        }
        write!(f, "")
    }
}

#[cfg(test)]
mod tests {

    use std::collections::HashMap;

    use crate::{
        board::Board,
        piece::{self, b::B, j::J, z::Z, IPiece, Piece},
        shared::{Color, Pos, Role, Side},
        test_utils::{TestDataCanMove, TestDataGetNextPositions},
    };

    use super::Move;

    struct TestDataUpdatePiece {
        pieces: Vec<Piece>,
        pos: Pos,
        new_pos: Pos,
        eaten: bool,
        can_move: bool,
    }

    struct TestDataIsFinish {
        pieces: Vec<Piece>,
        expected: bool,
    }

    #[test]
    fn testboard_is_finish() {
        let testdata = [TestDataIsFinish {
            pieces: [
                Piece::Z(Z::new(Color::Red, Pos(8, 6), Side::Bottom)),
                Piece::B(B::new(Color::Red, Pos(4, 9), Side::Bottom)),
                Piece::B(B::new(Color::Black, Pos(4, 0), Side::Top)),
            ]
            .to_vec(),
            expected: false,
        }];

        for TestDataIsFinish { pieces, expected } in testdata {
            let board = Board::new(pieces);
            assert_eq!(board.is_finish(), expected);
        }
    }

    #[test]
    fn testboard_update_piece() {
        let testdata = [
            TestDataUpdatePiece {
                pieces: [Piece::J(J::new(Color::Red, Pos(4, 5), Side::Bottom))].to_vec(),
                pos: Pos(4, 5),
                new_pos: Pos(5, 5),
                eaten: false,
                can_move: true,
            },
            TestDataUpdatePiece {
                pieces: [
                    Piece::J(J::new(Color::Red, Pos(4, 5), Side::Bottom)),
                    Piece::Z(Z::new(Color::Black, Pos(4, 6), Side::Top)),
                ]
                .to_vec(),
                pos: Pos(4, 5),
                new_pos: Pos(4, 6),
                eaten: false,
                can_move: true,
            },
        ];

        for TestDataUpdatePiece {
            pieces,
            pos,
            new_pos,
            eaten,
            can_move,
        } in testdata
        {
            let mut board = Board::new(pieces);
            let piece_num = board.get_piece_num();
            board.update_piece(&pos, &new_pos);
            if can_move {
                assert_eq!(board.cells[[pos.0 as usize, pos.1 as usize]], Option::None);
                assert_eq!(
                    *board.cells[[new_pos.0 as usize, new_pos.1 as usize]]
                        .as_ref()
                        .unwrap()
                        .get_role(),
                    Role::RJ
                );
                if eaten {
                    assert_eq!(board.get_piece_num(), piece_num - 1);
                }
            }
        }
    }

    #[test]

    fn test_generate_moves() {
        let board = Board::default();
        let mut expected = HashMap::new();
        expected.insert("j", 4);
        expected.insert("m", 4);
        expected.insert("x", 4);
        expected.insert("s", 2);
        expected.insert("b", 1);
        expected.insert("p", 24);
        expected.insert("z", 5);
        let mut real = HashMap::new();
        real.insert("j", 0);
        real.insert("m", 0);
        real.insert("x", 0);
        real.insert("s", 0);
        real.insert("b", 0);
        real.insert("p", 0);
        real.insert("z", 0);
        let moves = board.generate_moves(&Color::Red);
        for Move {
            from: Pos(x, y),
            to,
        } in moves.iter()
        {
            let piece = board.cells[[*x as usize, *y as usize]].as_ref().unwrap();
            if let Some(n) = real.get_mut(piece.get_role().as_str()) {
                *n += 1;
            }
        }
        println!("{:?}", expected);
        println!("{:?}", real);
        assert_eq!(expected, real);
    }
}
