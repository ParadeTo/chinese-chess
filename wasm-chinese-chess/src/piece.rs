pub mod p;
pub mod x;

use std::default;

use crate::{
    board::{self, Board},
    shared::{Color, Pos, Role, Side},
};

use self::{p::P, x::X};

pub trait IPiece {
    // fn can_place_at_dest<T: IPiece>(dest: &Pos, board: &Board<T>) -> bool;
    fn get_next_positions(&self, board: &Board) -> Vec<Pos>;
    fn can_move(&self, dest: &Pos, board: &Board) -> bool;
    // fn clone<T: IPiece>() -> &T;
    fn get_pos(&self) -> &Pos;
    fn get_color(&self) -> &Color;
    // fn new(color: Color, pos: Pos, side: Side, key: String) -> Self;
}

#[derive(Debug)]
pub enum Piece {
    X(X),
    P(P),
}

impl Clone for Piece {
    fn clone(&self) -> Self {
        match self {
            Self::X(arg0) => Self::X(arg0.clone()),
            Self::P(arg0) => Self::P(arg0.clone()),
        }
    }
}

impl IPiece for Piece {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        let p = match self {
            Piece::X(x) => x.get_next_positions(board),
            Piece::P(p) => p.get_next_positions(board),
        };
        p
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        todo!()
    }

    fn get_pos(&self) -> &Pos {
        let p = match self {
            Piece::X(x) => x.get_pos(),
            Piece::P(p) => p.get_pos(),
        };
        p
    }

    fn get_color(&self) -> &Color {
        match self {
            Piece::X(x) => x.get_color(),
            Piece::P(p) => p.get_color(),
        }
    }
}

// impl Piece {
//     fn get_payload<T: IPiece>(self) -> T {
//         let x = match self {
//             Piece::X(x) => x,
//             Piece::X(x) => x,
//             Piece::X(x) => x,
//             Piece::X(x) => x,
//         };
//         return x;
//     }
// }

#[derive(Default, Debug, Copy, Clone)]
pub struct PieceFields {
    // key: String,
    color: Color,
    role: Role,
    pos: Pos,
    side: Side,
}

impl PieceFields {
    fn default() -> PieceFields {
        PieceFields::default()
    }
    fn new(role: Role, color: Color, pos: Pos, side: Side /* , key: String*/) -> Self {
        PieceFields {
            role,
            color,
            // key,
            pos,
            side,
        }
    }
    fn can_place_at_dest(&self, dest: &Pos, board: &Board) -> bool {
        let dest_piece = board.get_piece_by_pos(dest);

        if dest_piece.is_some() && *dest_piece.unwrap().get_color() == self.color {
            return false;
        }
        return true;
    }
}
