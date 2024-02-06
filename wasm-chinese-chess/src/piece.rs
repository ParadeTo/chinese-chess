pub mod b;
pub mod j;
pub mod m;
pub mod p;
pub mod s;
pub mod x;
pub mod z;

use crate::{
    board::Board,
    shared::{Color, Pos, Role, Side},
};

use self::{b::B, j::J, m::M, p::P, s::S, x::X, z::Z};

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
    B(B),
    J(J),
    M(M),
    S(S),
}

impl Clone for Piece {
    fn clone(&self) -> Self {
        match self {
            Self::X(arg0) => Self::X(arg0.clone()),
            Self::P(arg0) => Self::P(arg0.clone()),
            Self::Z(arg0) => Self::Z(arg0.clone()),
            Self::B(arg0) => Self::B(arg0.clone()),
            Self::J(arg0) => Self::J(arg0.clone()),
            Self::M(arg0) => Self::M(arg0.clone()),
            Self::S(arg0) => Self::S(arg0.clone()),
        }
    }
}

impl IPiece for Piece {
    fn get_next_positions(&self, board: &Board) -> Vec<Pos> {
        match self {
            Piece::X(p) => p.get_next_positions(board),
            Piece::P(p) => p.get_next_positions(board),
            Piece::Z(p) => p.get_next_positions(board),
            Piece::B(p) => p.get_next_positions(board),
            Piece::J(p) => p.get_next_positions(board),
            Piece::M(p) => p.get_next_positions(board),
            Piece::S(p) => p.get_next_positions(board),
        }
    }

    fn can_move(&self, dest: &Pos, board: &Board) -> bool {
        match self {
            Piece::X(p) => p.can_move(dest, board),
            Piece::P(p) => p.can_move(dest, board),
            Piece::Z(p) => p.can_move(dest, board),
            Piece::B(p) => p.can_move(dest, board),
            Piece::J(p) => p.can_move(dest, board),
            Piece::M(p) => p.can_move(dest, board),
            Piece::S(p) => p.can_move(dest, board),
        }
    }

    fn get_pos(&self) -> &Pos {
        match self {
            Piece::X(p) => p.get_pos(),
            Piece::P(p) => p.get_pos(),
            Piece::Z(p) => p.get_pos(),
            Piece::B(p) => p.get_pos(),
            Piece::J(p) => p.get_pos(),
            Piece::M(p) => p.get_pos(),
            Piece::S(p) => p.get_pos(),
        }
    }

    fn get_color(&self) -> &Color {
        match self {
            Piece::X(p) => p.get_color(),
            Piece::P(p) => p.get_color(),
            Piece::Z(p) => p.get_color(),
            Piece::B(p) => p.get_color(),
            Piece::J(p) => p.get_color(),
            Piece::M(p) => p.get_color(),
            Piece::S(p) => p.get_color(),
        }
    }

    fn get_role(&self) -> &Role {
        match self {
            Piece::X(p) => p.get_role(),
            Piece::P(p) => p.get_role(),
            Piece::Z(p) => p.get_role(),
            Piece::B(p) => p.get_role(),
            Piece::J(p) => p.get_role(),
            Piece::M(p) => p.get_role(),
            Piece::S(p) => p.get_role(),
        }
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
