use crate::{
    board::Board,
    shared::{in_own_side, Color, Pos, Role, Side},
};

use super::{IPiece, Piece};

#[derive(Default, Debug)]
pub struct X {
    piece: Piece,
}

impl IPiece for X {
    fn can_place_at_dest<T: IPiece>(dest: &Pos, board: &Board<T>) -> bool {
        todo!()
    }

    fn get_next_positions<T: IPiece>(&self, board: &Board<T>) -> Vec<Pos> {
        let Pos(current_x, current_y) = self.get_pos();
        let moves: [(i32, i32); 4] = [(-2, -2), (2, 2), (-2, 2), (2, -2)];
        let mut positions: Vec<Pos> = Vec::new();
        for (delta_x, delta_y) in moves.iter() {
            let pos = Pos(current_x + delta_x, current_y + delta_y);
            if self.can_move(&pos, board) {
                positions.push(pos)
            }
        }
        positions
    }

    fn can_move<T: IPiece>(&self, dest: &Pos, board: &Board<T>) -> bool {
        let Pos(dest_x, dest_y) = dest;
        let Pos(orig_x, orig_y) = self.get_pos();
        let cells = &board.cells;

        if in_own_side(&dest, &self.piece.side)
            && ((dest_y - orig_y == 2
                && dest_x - orig_x == 2
                && cells[(orig_x + 1) as usize][(orig_y + 1) as usize].is_none())
                || (dest_y - orig_y == 2
                    && dest_x - orig_x == -2
                    && cells[(orig_x - 1) as usize][(orig_y + 1) as usize].is_none())
                || (dest_y - orig_y == -2
                    && dest_x - orig_x == 2
                    && cells[(orig_x + 1) as usize][(orig_y - 1) as usize].is_none())
                || (dest_y - orig_y == -2
                    && dest_x - orig_x == -2
                    && cells[(orig_x - 1) as usize][(orig_y - 1) as usize].is_none()))
        {
            return self.piece.can_place_at_dest(dest, board);
        }

        return false;
    }

    fn clone<T: IPiece>() -> T {
        todo!()
    }

    fn get_pos(&self) -> &Pos {
        &self.piece.pos
    }

    fn get_color(&self) -> &crate::shared::Color {
        &self.piece.color
    }

    fn new(color: Color, pos: Pos, side: Side, key: String) -> Self {
        X {
            piece: Piece::new(Role::RZ, color, pos, side, key),
        }
    }
}

#[cfg(test)]
mod tests {

    use crate::{
        board::Board,
        shared::{Color, Pos, Side},
        test_utils::TestDataGetNextPositions,
    };

    use super::*;

    #[test]
    fn test_get_next_positions() {
        let x = X::new(Color::Red, Pos(2, 9), Side::Bottom, "".to_string());
        let testcases = [TestDataGetNextPositions {
            pieces: [&x].to_vec(),
            next_positions: [Pos(0, 7), Pos(4, 7)].to_vec(),
        }];

        for TestDataGetNextPositions {
            pieces,
            next_positions,
        } in testcases
        {
            let board = Board::new(&pieces);
            assert_eq!(board.get_next_positions(&x), next_positions.to_vec());
        }
    }
}
