use crate::{
    board::Board,
    shared::{in_board, in_nine_place, in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};
use ndarray::iter::Windows;
use std::collections::HashMap;
use std::{cell, convert::TryInto};

use super::{IPiece, Piece, PieceFields};
use lazy_static::lazy_static;

#[derive(Default, Debug, Clone, PartialEq)]
pub struct S {
    piece: PieceFields,
}

impl IPiece for S {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(current_x, current_y) = *self.get_pos();
        let moves: [(isize, isize); 4] = [(-1, -1), (1, 1), (-1, 1), (1, -1)];
        let mut positions: Vec<Pos> = Vec::new();

        for (delta_x, delta_y) in moves.iter() {
            let pos = Pos(current_x + *delta_x, current_y + *delta_y);
            if self.can_move(&pos, board) {
                positions.push(pos)
            }
        }
        return positions;
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = *dest;
        let Pos(orig_x, orig_y) = *self.get_pos();

        if self.is_possible_pos(dest)
            && (orig_x - dest_x).abs() == 1
            && (orig_y - dest_y).abs() == 1
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
        &self.piece.role
    }

    fn set_pos(&mut self, pos: Pos) {
        self.piece.pos = pos;
    }
}

lazy_static! {
    static ref POSSIBLE_POS: HashMap<Side, [Pos; 5]> = {
        let mut m = HashMap::new();
        m.insert(
            Side::Top,
            [Pos(3, 0), Pos(5, 0), Pos(4, 1), Pos(3, 2), Pos(5, 2)],
        );
        m.insert(
            Side::Bottom,
            [Pos(3, 9), Pos(5, 9), Pos(4, 8), Pos(3, 7), Pos(5, 7)],
        );
        m
    };
}
impl S {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        S {
            piece: PieceFields::new(Role::RS, color, pos, side),
        }
    }

    fn is_possible_pos(&self, dest: &Pos) -> bool {
        let Pos(dest_x, dest_y) = dest;
        let positions = *(POSSIBLE_POS.get(&self.piece.side).unwrap()) as [Pos; 5];
        for Pos(x, y) in positions.iter() {
            if x == dest_x && y == dest_y {
                return true;
            }
        }
        false
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
        let p1 = S::new(Color::Red, Pos(5, 9), Side::Bottom);
        let p2 = S::new(Color::Red, Pos(3, 5), Side::Bottom);
        let p3 = S::new(Color::Red, Pos(5, 5), Side::Bottom);
        // let

        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::S(p1.clone())].to_vec(),
            piece: Piece::S(p1.clone()),
            next_positions: [Pos(4, 8)].to_vec(),
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
        let p1 = S::new(Color::Red, Pos(5, 9), Side::Bottom);

        let testcases = [TestDataCanMove {
            pieces: [Piece::S(p1.clone())].to_vec(),
            piece: Piece::S(p1.clone()),
            pos: Pos(4, 8),
            expected: true,
        }];

        for TestDataCanMove {
            pieces,
            piece,
            pos,
            expected,
        } in testcases
        {
            let board = Board::new(pieces);
            assert_eq!(board.can_move(&piece, &pos), expected);
        }
    }
}
