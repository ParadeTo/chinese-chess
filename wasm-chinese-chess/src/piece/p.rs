use std::{cell, convert::TryInto};

use ndarray::iter::Windows;

use crate::{
    board::Board,
    shared::{in_own_side, Color, Pos, Role, Side, HEIGHT, WIDTH},
};

use super::{IPiece, PieceFields};

#[derive(Default, Debug, Clone)]
pub struct P {
    piece: PieceFields,
}

impl IPiece for P {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(x, y) = *self.get_pos();
        let current_x: usize = x.try_into().unwrap();
        let current_y: usize = y.try_into().unwrap();
        let mut positions: Vec<Pos> = Vec::new();
        let cells = &board.cells;

        let mut i = current_x - 1;
        while i >= 0 {
            if cells[[i, current_y]].is_some() {
                let mut j = i - 1;
                while j >= 0 {
                    if let Some(piece2) = &cells[[j, current_y]] {
                        if piece2.get_color() != self.get_color() {
                            positions.push(Pos(j as isize, current_y as isize));
                        }
                        break;
                    }
                    j -= 1;
                }
                break;
            }
            positions.push(Pos(i as isize, current_y as isize));
            if i == 0 {
                break;
            }
            i -= 1;
        }

        let mut i = current_x + 1;
        while i < WIDTH {
            if cells[[i, current_y]].is_some() {
                let mut j = i + 1;
                while j < WIDTH {
                    if let Some(piece2) = &cells[[j, current_y]] {
                        if piece2.get_color() != self.get_color() {
                            positions.push(Pos(j as isize, current_y as isize));
                        }
                        break;
                    }
                    j += 1;
                }
                break;
            }
            positions.push(Pos(i as isize, current_y as isize));
            i += 1;
        }

        let mut i = current_y - 1;
        while i >= 0 {
            if cells[[current_x, i]].is_some() {
                let mut j = i - 1;
                while j >= 0 {
                    if let Some(piece2) = &cells[[current_x, j]] {
                        if piece2.get_color() != self.get_color() {
                            positions.push(Pos(current_x as isize, j as isize));
                        }
                        break;
                    }
                    j -= 1;
                }
                break;
            }
            positions.push(Pos(current_x as isize, i as isize));
            if i == 0 {
                break;
            }
            i -= 1;
        }

        let mut i = current_y + 1;
        while i < HEIGHT {
            if cells[[current_x, i]].is_some() {
                let mut j = i + 1;
                while j < HEIGHT {
                    if let Some(piece2) = &cells[[current_x, j]] {
                        if piece2.get_color() != self.get_color() {
                            positions.push(Pos(current_x as isize, j as isize));
                        }
                        break;
                    }
                    j += 1;
                }
                break;
            }
            positions.push(Pos(current_x as isize, i as isize));
            i += 1;
        }

        positions
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = *dest;
        let Pos(orig_x, orig_y) = *self.get_pos();
        let cells = &board.cells;

        if (dest_x == orig_x && dest_y == orig_y) || (dest_x != orig_x && dest_y != orig_y) {
            return false;
        }

        let dest_piece = board.get_piece_by_pos(dest);
        if dest_x == orig_x {
            let mut start_y = orig_y + 1;
            let mut end_y = dest_y - 1;
            if dest_y < orig_y {
                start_y = dest_y + 1;
                end_y = orig_y - 1;
            }
            let mut barriers = 0;

            for i in start_y..=end_y {
                if cells[[orig_x as usize, i as usize]].is_some() {
                    barriers += 1
                }
                if barriers > 1 {
                    return false;
                }
            }

            if barriers == 1 {
                return match dest_piece {
                    Some(p) => p.get_color() != self.get_color(),
                    None => return false,
                };
            } else {
                return dest_piece.is_none();
            }
        }

        if dest_y == orig_y {
            let mut start_x = orig_x + 1;
            let mut end_x = dest_x - 1;
            if dest_x < orig_x {
                start_x = dest_x + 1;
                end_x = orig_x - 1;
            }
            let mut barriers = 0;
            for i in start_x..=end_x {
                if cells[[i as usize, orig_y as usize]].is_some() {
                    barriers += 1
                }
                if barriers > 1 {
                    return false;
                }
            }

            if barriers == 1 {
                return match dest_piece {
                    Some(p) => p.get_color() != self.get_color(),
                    None => return false,
                };
            } else {
                return dest_piece.is_none();
            }
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
}

impl P {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        P {
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
