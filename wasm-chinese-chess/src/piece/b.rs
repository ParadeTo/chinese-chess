use std::{cell, convert::TryInto};

use ndarray::iter::Windows;

use crate::{
    board::Board,
    shared::{in_board, in_nine_place, in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};

use super::{IPiece, Piece, PieceFields};

#[derive(Default, Debug, Clone)]
pub struct B {
    piece: PieceFields,
}

impl IPiece for B {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(current_x, current_y) = *self.get_pos();
        let moves: [(isize, isize); 4] = [(-1, 0), (1, 0), (0, 1), (0, -1)];
        let mut positions: Vec<Pos> = Vec::new();

        for (delta_x, delta_y) in moves.iter() {
            let pos = Pos(current_x + *delta_x, current_y + *delta_y);
            if self.can_move(&pos, board) {
                positions.push(pos)
            }
        }

        let mut opponentBoss: Option<&Piece> = Option::None;
        if current_y < 3 {
            for i in 7..=9 {
                if let Some(piece) = &board.cells[[current_x as usize, i as usize]] {
                    if *piece.get_role() == Role::RB {
                        opponentBoss = Option::Some(piece);
                    }
                }
            }
            if let Some(p) = opponentBoss {
                if !self.has_piece_between_bosses(board, p) {
                    positions.push(Pos(current_x, p.get_pos().1))
                }
            }
        } else {
            for i in 0..=2 {
                if let Some(piece) = &board.cells[[current_x as usize, i as usize]] {
                    if *piece.get_role() == Role::RB {
                        opponentBoss = Option::Some(piece);
                    }
                }
            }
            if let Some(p) = opponentBoss {
                if !self.has_piece_between_bosses(board, p) {
                    positions.push(Pos(current_x, p.get_pos().1))
                }
            }
        }

        return positions;
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = *dest;
        let Pos(orig_x, orig_y) = *self.get_pos();
        let cells = &board.cells;

        if !in_board(&Pos(dest_x, dest_y)) {
            return false;
        }

        let dest_piece = cells[[dest_x as usize, dest_y as usize]].clone().unwrap();
        if *dest_piece.get_role() == Role::RB
            && dest_piece.get_color() != self.get_color()
            && !self.has_piece_between_bosses(board, &dest_piece)
        {
            return true;
        }

        if !in_nine_place(dest, &self.piece.side) {
            return false;
        }

        if orig_x == dest_x && (orig_y - dest_y).abs() == 1
            || orig_y == dest_y && (orig_x - dest_x).abs() == 1
        {
            return self.piece.can_place_at_dest(dest, board);
        }

        return false;
    }

    fn get_pos(&self) -> &Pos {
        &self.piece.pos
    }

    fn get_color(&self) -> &crate::shared::Color {
        &self.piece.color
    }

    fn get_role(&self) -> &Role {
        todo!()
    }
}

impl B {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        B {
            piece: PieceFields::new(Role::RZ, color, pos, side),
        }
    }

    fn has_piece_between_bosses(&self, board: &Board, b: &Piece) -> bool {
        let mut start_y = self.get_pos().1;
        let mut end_y = b.get_pos().1;

        if start_y >= end_y {
            start_y = b.get_pos().1;
            end_y = self.get_pos().1;
        }

        let mut hasPiece = false;
        for i in start_y..=end_y {
            if board.cells[[self.get_pos().0 as usize, i as usize]].is_some() {
                return true;
            }
        }

        return false;
    }
}

#[cfg(test)]
mod tests {

    use crate::{
        board::Board,
        piece::Piece,
        shared::{Color, Pos, Side},
        test_utils::{TestDataCanMove, TestDataGetNextPositions},
    };

    use super::*;

    #[test]
    fn test_get_next_positions() {
        let p1 = P::new(Color::Red, Pos(4, 5), Side::Bottom);
        let p2 = P::new(Color::Red, Pos(3, 5), Side::Bottom);
        let p3 = P::new(Color::Red, Pos(5, 5), Side::Bottom);
        // let

        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::P(p1.clone())].to_vec(),
            piece: Piece::P(p1.clone()),
            next_positions: [
                Pos(3, 5),
                Pos(2, 5),
                Pos(1, 5),
                Pos(0, 5),
                Pos(5, 5),
                Pos(6, 5),
                Pos(7, 5),
                Pos(8, 5),
                Pos(4, 4),
                Pos(4, 3),
                Pos(4, 2),
                Pos(4, 1),
                Pos(4, 0),
                Pos(4, 6),
                Pos(4, 7),
                Pos(4, 8),
                Pos(4, 9),
            ]
            .to_vec(),
        }];

        for TestDataGetNextPositions {
            pieces,
            piece,
            next_positions,
        } in testcases
        {
            let board = Board::new(pieces);
            assert_eq!(board.get_next_positions(piece), next_positions.to_vec());
        }
    }

    #[test]
    fn test_can_move() {
        let p1 = P::new(Color::Red, Pos(1, 7), Side::Bottom);

        let testcases = [TestDataCanMove {
            pieces: [Piece::P(p1.clone())].to_vec(),
            piece: Piece::P(p1.clone()),
            pos: Pos(1, 7),
            expected: false,
        }];

        for TestDataCanMove {
            pieces,
            piece,
            pos,
            expected,
        } in testcases
        {
            let board = Board::new(pieces);
            assert_eq!(board.can_move(piece, &pos), expected);
        }
    }
}
