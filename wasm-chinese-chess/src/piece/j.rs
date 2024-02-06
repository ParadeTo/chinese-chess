use std::{cell, convert::TryInto};

use ndarray::iter::Windows;

use crate::{
    board::Board,
    shared::{in_board, in_nine_place, in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};

use super::{IPiece, Piece, PieceFields};

#[derive(Default, Debug, Clone, PartialEq)]
pub struct J {
    piece: PieceFields,
}

impl IPiece for J {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(current_x, current_y) = *self.get_pos();
        let mut positions: Vec<Pos> = Vec::new();
        let cells = &board.cells;

        let mut i = current_x - 1;
        while i >= 0 {
            let pos = Pos(i, current_y);
            if let Some(piece) = &cells[[i as usize, current_y as usize]] {
                if self.get_color() != piece.get_color() {
                    positions.push(pos);
                }
                break;
            }
            positions.push(pos);
            i -= 1
        }

        let mut i = current_x + 1;
        while i < WIDTH.try_into().unwrap() {
            let pos = Pos(i, current_y);
            if let Some(piece) = &cells[[i as usize, current_y as usize]] {
                if self.get_color() != piece.get_color() {
                    positions.push(pos);
                }
                break;
            }
            positions.push(pos);
            i += 1
        }

        let mut i = current_y - 1;
        while i >= 0 {
            let pos = Pos(current_x, i);
            if let Some(piece) = &cells[[current_x as usize, i as usize]] {
                if self.get_color() != piece.get_color() {
                    positions.push(pos);
                }
                break;
            }
            positions.push(pos);
            i -= 1
        }

        let mut i = current_y + 1;
        while i < HEIGHT.try_into().unwrap() {
            let pos = Pos(current_x, i);
            if let Some(piece) = &cells[[current_x as usize, i as usize]] {
                if self.get_color() != piece.get_color() {
                    positions.push(pos);
                }
                break;
            }
            positions.push(pos);
            i += 1
        }

        return positions;
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = *dest;
        let Pos(orig_x, orig_y) = *self.get_pos();
        let cells = &board.cells;

        if (dest_x == orig_x && dest_y == orig_y) || (dest_x != orig_x && dest_y != orig_y) {
            return false;
        }

        if dest_x == orig_x {
            let mut start_y = orig_y + 1;
            let mut end_y = dest_y;
            if dest_y < orig_y {
                start_y = dest_y + 1;
                end_y = orig_y;
            }

            for i in start_y..end_y {
                if cells[[orig_x as usize, i as usize]].is_some() {
                    return false;
                }
            }
        }

        if dest_y == orig_y {
            let mut start_x = orig_x + 1;
            let mut end_x = dest_x;
            if dest_x < orig_x {
                start_x = dest_x + 1;
                end_x = orig_x;
            }

            for i in start_x..end_x {
                if cells[[i as usize, orig_y as usize]].is_some() {
                    return false;
                }
            }
        }

        self.piece.can_place_at_dest(dest, board)
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

impl J {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        J {
            piece: PieceFields::new(Role::RJ, color, pos, side),
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
        let p1 = J::new(Color::Red, Pos(4, 4), Side::Bottom);
        let p2 = J::new(Color::Red, Pos(3, 5), Side::Bottom);
        let p3 = J::new(Color::Red, Pos(5, 5), Side::Bottom);
        // let

        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::J(p1.clone())].to_vec(),
            piece: Piece::J(p1.clone()),
            next_positions: [
                Pos(3, 4),
                Pos(2, 4),
                Pos(1, 4),
                Pos(0, 4),
                Pos(5, 4),
                Pos(6, 4),
                Pos(7, 4),
                Pos(8, 4),
                Pos(4, 3),
                Pos(4, 2),
                Pos(4, 1),
                Pos(4, 0),
                Pos(4, 5),
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
        let p1 = J::new(Color::Red, Pos(0, 0), Side::Bottom);

        let testcases = [TestDataCanMove {
            pieces: [Piece::J(p1.clone())].to_vec(),
            piece: Piece::J(p1.clone()),
            pos: Pos(0, 1),
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
