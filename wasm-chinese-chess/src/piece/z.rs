use std::{cell, convert::TryInto, num};

use ndarray::iter::Windows;

use crate::{
    board::Board,
    shared::{in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};

use super::{IPiece, PieceFields};

#[derive(Default, Debug, Clone, PartialEq)]
pub struct Z {
    piece: PieceFields,
}

impl IPiece for Z {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let mut moves: Vec<Pos> = Vec::new();
        let mut positions: Vec<Pos> = Vec::new();
        let Pos(current_x, current_y) = *self.get_pos();

        if self.piece.side == Side::Bottom {
            if current_y > 4 {
                moves.push(Pos(0, -1))
            } else {
                if current_y - 1 >= 0 {
                    moves.push(Pos(0, -1))
                }
                if current_x - 1 >= 0 {
                    moves.push(Pos(-1, 0))
                }
                if current_x + 1 < WIDTH.try_into().unwrap() {
                    moves.push(Pos(1, 0))
                }
            }
        } else {
            if current_y < 5 {
                moves.push(Pos(0, 1))
            } else {
                if current_y + 1 < HEIGHT.try_into().unwrap() {
                    moves.push(Pos(0, 1))
                }
                if current_x - 1 >= 0 {
                    moves.push(Pos(-1, 0))
                }
                if current_x + 1 < WIDTH.try_into().unwrap() {
                    moves.push(Pos(1, 0))
                }
            }
        }

        for Pos(x, y) in moves.iter() {
            let dest = Pos(current_x + x, current_y + y);
            if self.can_move(&dest, board) {
                positions.push(dest)
            }
        }

        positions
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = *dest;
        let Pos(orig_x, orig_y) = *self.get_pos();

        if self.piece.side == Side::Bottom && dest_y == orig_y - 1
            || self.piece.side == Side::Top && dest_y == orig_y + 1
            || self.is_crossed_river() && (dest_x - orig_x).abs() == 1
        {
            return self.piece.can_place_at_dest(dest, board);
        }

        return false;
    }

    fn get_pos(&self) -> &Pos {
        &self.piece.pos
    }

    // fn get_side()

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

impl Z {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        Z {
            piece: PieceFields::new(Role::RZ, color, pos, side),
        }
    }

    fn is_crossed_river(&self) -> bool {
        let Pos(x, y) = *self.get_pos();
        return (self.piece.side == Side::Bottom && y <= 4)
            || (self.piece.side == Side::Top && y >= 5);
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
        let p1 = Z::new(Color::Red, Pos(4, 6), Side::Bottom);

        // let

        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::Z(p1.clone())].to_vec(),
            piece: Piece::Z(p1.clone()),
            next_positions: [Pos(4, 5)].to_vec(),
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
        let z1 = Z::new(Color::Red, Pos(4, 6), Side::Bottom);

        let testcases = [TestDataCanMove {
            pieces: [Piece::Z(z1.clone())].to_vec(),
            piece: Piece::Z(z1.clone()),
            pos: Pos(4, 5),
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
