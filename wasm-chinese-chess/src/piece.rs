pub mod x;

use crate::{
    board::Board,
    shared::{Color, Role, Side},
};

pub trait IPiece {
    fn can_place_at_dest<T: IPiece>(dest: (u32, u32), board: Board<T>) -> bool;
    fn get_next_positions<T: IPiece>(board: Board<T>) -> Vec<(u32, u32)>;
    fn can_move<T: IPiece>(pos: (u32, u32), board: Board<T>) -> bool;
    fn clone<T: IPiece>() -> T;
    fn get_pos(&self) -> (u32, u32);
    fn get_color(&self) -> &Color;
    fn new(color: Color, pos: (u32, u32), side: Side, key: String) -> Self;
}

#[derive(Default, Debug)]
pub struct Piece {
    key: String,
    color: Color,
    role: Role,
    pos: (u32, u32),
    side: Side,
}

impl Piece {
    fn default() -> Piece {
        Piece::default()
    }
    fn new(role: Role, color: Color, pos: (u32, u32), side: Side, key: String) -> Self {
        Piece {
            role,
            color,
            key,
            pos,
            side,
        }
    }
}
