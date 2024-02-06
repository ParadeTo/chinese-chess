use std::{cell, convert::TryInto};

use ndarray::iter::Windows;

use crate::{
    board::Board,
    shared::{in_board, in_nine_place, in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};

use super::{IPiece, Piece, PieceFields};

#[derive(Default, Debug, Clone)]
pub struct M {
    piece: PieceFields,
}

impl IPiece for M {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(current_x, current_y) = *self.get_pos();
        let moves: [(isize, isize); 8] = [
            (-2, -1),
            (2, -1),
            (-2, 1),
            (2, 1),
            (-1, -2),
            (-1, 2),
            (1, -2),
            (1, 2),
        ];
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
        let cells = &board.cells;

        if !in_board(dest) {
            return false;
        }

        if (dest_y - orig_y == 2
            && (dest_x - orig_x).abs() == 1
            && cells[[orig_x as usize, (orig_y + 1) as usize]].is_none())
            || (dest_y - orig_y == -2
                && (dest_x - orig_x).abs() == 1
                && cells[[orig_x as usize, (orig_y - 1) as usize]].is_none())
            || (dest_x - orig_x == 2
                && (dest_y - orig_y).abs() == 1
                && cells[[(orig_x + 1) as usize, orig_y as usize]].is_none())
            || (dest_x - orig_x == -2
                && (dest_y - orig_y).abs() == 1
                && cells[[(orig_x - 1) as usize, orig_y as usize]].is_none())
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

impl M {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        M {
            piece: PieceFields::new(Role::RZ, color, pos, side),
        }
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
        let p1 = M::new(Color::Red, Pos(1, 9), Side::Bottom);
        let p2 = M::new(Color::Red, Pos(3, 5), Side::Bottom);
        let p3 = M::new(Color::Red, Pos(5, 5), Side::Bottom);
        // let

        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::M(p1.clone())].to_vec(),
            piece: Piece::M(p1.clone()),
            next_positions: [Pos(3, 8), Pos(0, 7), Pos(2, 7)].to_vec(),
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
        let p1 = M::new(Color::Red, Pos(4, 5), Side::Bottom);

        let testcases = [TestDataCanMove {
            pieces: [Piece::M(p1.clone())].to_vec(),
            piece: Piece::M(p1.clone()),
            pos: Pos(6, 4),
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
            assert_eq!(board.can_move(piece, &pos), expected);
        }
    }
}
