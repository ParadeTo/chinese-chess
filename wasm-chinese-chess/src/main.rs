use std::collections::HashMap;

use crate::piece::{IPiece, Piece};
mod board;
mod piece;
mod shared;
fn main() {
    let mut piece = Vec::new();
    piece.push(piece::x::X::new(
        shared::Color::Red,
        (0, 0),
        shared::Side::Top,
        "rx1".to_string(),
    ));
    let board = board::Board::<piece::x::X>::new(&mut piece);
    println!("{:?}", board)
}
