pub mod b;
pub mod p;
pub mod x;
pub mod z;

use crate::{
    board::Board,
    shared::{Color, Pos, Role, Side},
};

use self::{p::P, x::X, z::Z};

pub trait IPiece {
    fn get_role(&self) -> &Role;
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
    Z(Z),
}

impl Clone for Piece {
    fn clone(&self) -> Self {
        match self {
            Self::X(arg0) => Self::X(arg0.clone()),
            Self::P(arg0) => Self::P(arg0.clone()),
            Self::Z(arg0) => Self::Z(arg0.clone()),
        }
    }
}

impl IPiece for Piece {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        self.to_owned().get_next_positions(board)
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        self.to_owned().can_move(dest, board)
    }

    fn get_pos(&self) -> &Pos {
        self.to_owned().get_pos()
    }

    fn get_color(&self) -> &Color {
        self.to_owned().get_color()
    }

    fn get_role(&self) -> &Role {
        self.to_owned().get_role()
    }
}

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
