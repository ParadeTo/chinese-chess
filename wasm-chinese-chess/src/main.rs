use std::collections::HashMap;

use crate::{
    piece::{IPiece, Piece},
    shared::Pos,
};
mod board;
mod piece;
mod shared;
mod test_utils;
fn main() {
    let mut piece: Vec<Piece> = Vec::new();
    let x = piece::x::X::new(
        shared::Color::Red,
        Pos(0, 0),
        shared::Side::Top,
        // "rx1".to_string(),
    );
    piece.push(Piece::X(x));
    let board = board::Board::new(piece);
    println!("{:?}", board)
}
