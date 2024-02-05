use crate::{
    board::Board,
    shared::{in_own_side, Color, Pos, Role, Side},
};

use super::{IPiece, PieceFields};

#[derive(Default, Debug)]
pub struct X {
    piece: PieceFields,
}

impl Clone for X {
    fn clone(&self) -> Self {
        Self {
            piece: self.piece.clone(),
        }
    }
}

impl IPiece for X {
    // fn can_place_at_dest<T: IPiece>(dest: &Pos, board: &Board<T>) -> bool {
    //     todo!()
    // }

    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let Pos(current_x, current_y) = self.get_pos();
        let moves: [(isize, isize); 4] = [(-2, -2), (2, 2), (-2, 2), (2, -2)];
        let mut positions: Vec<Pos> = Vec::new();
        for (delta_x, delta_y) in moves.iter() {
            let pos = Pos(current_x + *delta_x, current_y + *delta_y);
            if self.can_move(&pos, board) {
                positions.push(pos)
            }
        }
        positions
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        let Pos(dest_x, dest_y) = dest;
        let Pos(orig_x, orig_y) = self.get_pos();
        let cells = &board.cells;

        if in_own_side(&dest, &self.piece.side)
            && ((dest_y - orig_y == 2
                && dest_x - orig_x == 2
                && cells[[(orig_x + 1) as usize, (orig_y + 1) as usize]].is_none())
                || (dest_y - orig_y == 2
                    && dest_x - orig_x == -2
                    && cells[[(orig_x - 1) as usize, (orig_y + 1) as usize]].is_none())
                || (dest_y - orig_y == -2
                    && dest_x - orig_x == 2
                    && cells[[(orig_x + 1) as usize, (orig_y - 1) as usize]].is_none())
                || (dest_y - orig_y == -2
                    && dest_x - orig_x == -2
                    && cells[[(orig_x - 1) as usize, (orig_y - 1) as usize]].is_none()))
        {
            return self.piece.can_place_at_dest(dest, board);
        }

        return false;
    }

    // fn clone<T: IPiece>() -> T {
    //     todo!()
    // }

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

impl X {
    pub fn new(color: Color, pos: Pos, side: Side /*key: String */) -> Self {
        X {
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
        test_utils::TestDataGetNextPositions,
    };

    use super::*;

    #[test]
    fn test_get_next_positions() {
        let x = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let testcases = [TestDataGetNextPositions {
            pieces: [Piece::X(x.clone())].to_vec(),
            piece: Piece::X(x.clone()),
            next_positions: [Pos(0, 7), Pos(4, 7)].to_vec(),
        }];

        for TestDataGetNextPositions {
            piece,
            pieces,
            next_positions,
        } in testcases
        {
            let board = Board::new(pieces);
            assert_eq!(board.get_next_positions(piece), next_positions.to_vec());
        }
    }

    #[test]
    fn test_can_move() {
        let x = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let pieces = [Piece::X(x.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(4, 7);
        assert_eq!(board.can_move(Piece::X(x.clone()), pos), true);

        let x1 = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let x2 = X::new(Color::Red, Pos(4, 7), Side::Bottom);
        let pieces = [Piece::X(x1.clone()), Piece::X(x2.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(4, 7);
        assert_eq!(board.can_move(Piece::X(x1.clone()), pos), false);

        let x = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let pieces = [Piece::X(x.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(5, 7);
        assert_eq!(board.can_move(Piece::X(x.clone()), pos), false);

        let x1 = X::new(Color::Red, Pos(2, 9), Side::Bottom);
        let x2 = X::new(Color::Red, Pos(3, 8), Side::Bottom);
        let pieces = [Piece::X(x1.clone()), Piece::X(x2.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(4, 7);
        assert_eq!(board.can_move(Piece::X(x1.clone()), pos), false);

        let x = X::new(Color::Red, Pos(2, 5), Side::Bottom);
        let pieces = [Piece::X(x.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(0, 3);
        assert_eq!(board.can_move(Piece::X(x.clone()), pos), false);

        let x = X::new(Color::Black, Pos(2, 0), Side::Top);
        let pieces = [Piece::X(x.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(4, 2);
        assert_eq!(board.can_move(Piece::X(x.clone()), pos), true);

        let x = X::new(Color::Black, Pos(2, 0), Side::Top);
        let pieces = [Piece::X(x.clone())].to_vec();
        let board = Board::new(pieces);
        let pos = &Pos(0, 2);
        assert_eq!(board.can_move(Piece::X(x.clone()), pos), true);
    }
}
