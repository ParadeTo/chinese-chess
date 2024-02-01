pub mod x;

use crate::{
    board::{self, Board},
    shared::{Color, Pos, Role, Side},
};

pub trait IPiece {
    fn can_place_at_dest<T: IPiece>(dest: &Pos, board: &Board<T>) -> bool;
    fn get_next_positions<T: IPiece>(&self, board: &Board<T>) -> Vec<Pos>;
    fn can_move<T: IPiece>(&self, dest: &Pos, board: &Board<T>) -> bool;
    fn clone<T: IPiece>() -> T;
    fn get_pos(&self) -> &Pos;
    fn get_color(&self) -> &Color;
    fn new(color: Color, pos: Pos, side: Side, key: String) -> Self;
}

#[derive(Default, Debug)]
pub struct Piece {
    key: String,
    color: Color,
    role: Role,
    pos: Pos,
    side: Side,
}

impl Piece {
    fn default() -> Piece {
        Piece::default()
    }
    fn new(role: Role, color: Color, pos: Pos, side: Side, key: String) -> Self {
        Piece {
            role,
            color,
            key,
            pos,
            side,
        }
    }
    fn can_place_at_dest<T: IPiece>(&self, dest: &Pos, board: &Board<T>) -> bool {
        let dest_piece = board.get_piece_by_pos(dest);

        if dest_piece.is_some() && *dest_piece.unwrap().get_color() == self.color {
            return false;
        }
        return true;
    }
}
