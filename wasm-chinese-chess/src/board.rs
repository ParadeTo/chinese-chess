use crate::piece::{IPiece, Piece};
use crate::shared::{Color, Pos, Role, HEIGHT, WIDTH};
use ndarray::Array2;
use std::collections::HashMap;
use std::convert::TryInto;
use std::fmt::{self, Display};

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

pub struct Board {
    pub cells: Array2<Option<Piece>>,
    pub pieces: HashMap<Color, Vec<Piece>>,
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
            }
        }
        piecesMap.insert(Color::Black, bVec);
        piecesMap.insert(Color::Red, rVec);
        Board {
            cells,
            pieces: piecesMap,
            records: Vec::new(),
        }
    }

    pub fn update_piece(&mut self, pos: &Pos, new_pos: &Pos) -> (bool, Option<Piece>) {
        let mut cells = self.cells.clone();
        if cells[[pos.0 as usize, pos.1 as usize]].is_none() {
            println!("{:?}, {:?}", self, pos);
        }
        let piece = cells[[pos.0 as usize, pos.1 as usize]].as_mut().unwrap();
        if !self.can_move(&piece, new_pos) {
            return (false, Option::None);
        }

        let Pos(new_x, new_y) = *new_pos;

        let mut hasEaten = false;
        if self.cells[[new_x as usize, new_y as usize]].is_some() {
            hasEaten = true;
            let eaten_piece = self.cells[[new_x as usize, new_y as usize]]
                .as_ref()
                .unwrap();

            let mut pieces = self.pieces.get_mut(eaten_piece.get_color()).unwrap();
            if let Some(index) = pieces.iter().position(|value| value == eaten_piece) {
                (*pieces).swap_remove(index);
            }
        }

        let Pos(orig_x, orig_y) = *piece.get_pos();
        self.cells[[orig_x as usize, orig_y as usize]] = Option::None;
        self.cells[[new_x as usize, new_y as usize]] = Option::Some(piece.clone());
        piece.set_pos(*new_pos);

        let record = Record {
            m: Move {
                from: *piece.get_pos(),
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
        (true, record.eaten)
    }

    pub fn generate_moves(&self, color: &Color) -> Vec<Move> {
        let pieces = self.pieces.get(color).unwrap();
        let mut moves = Vec::new();
        for p in pieces.iter() {
            let positions = p.get_next_positions(self);
            for pos in positions {
                moves.push(Move {
                    from: *p.get_pos(),
                    to: pos,
                })
            }
        }
        moves
    }

    pub fn is_finish(&self) -> bool {
        let mut hasRBoss = false;
        let mut hasBBoss = false;

        for piece in self.pieces.get(&Color::Red).unwrap().iter() {
            if *piece.get_role() == Role::RB {
                hasRBoss = true;
                break;
            }
        }

        for piece in self.pieces.get(&Color::Black).unwrap().iter() {
            if *piece.get_role() == Role::RB {
                hasBBoss = true;
                break;
            }
        }

        return !(hasBBoss && hasRBoss);
    }

    pub fn get_piece_num(&self) -> usize {
        self.pieces.get(&Color::Red).unwrap().len() + self.pieces.get(&Color::Black).unwrap().len()
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
                // let option_piece = self.cells[[to.0 as usize, to.1 as usize]];
                let option_eaten = last_move.eaten;
                self.cells[[from.0 as usize, from.1 as usize]] =
                    self.cells[[to.0 as usize, to.1 as usize]].clone();
                if let Some(mut eaten) = option_eaten {
                    eaten.set_pos(to);
                    self.pieces
                        .get_mut(eaten.get_color())
                        .unwrap()
                        .push(eaten.clone());

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
                write!(f, "({}, {})", self.x, self.y)
            }
        }
    }
}

#[cfg(test)]
mod tests {

    use crate::{
        board::Board,
        piece::{b::B, j::J, z::Z, IPiece, Piece},
        shared::{Color, Pos, Role, Side},
        test_utils::{TestDataCanMove, TestDataGetNextPositions},
    };

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
}
