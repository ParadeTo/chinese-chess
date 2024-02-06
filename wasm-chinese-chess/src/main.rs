use std::collections::HashMap;

use board::Board;
use piece::{b::B, z::Z};
use shared::{Color, Side};

use crate::{
    piece::{IPiece, Piece},
    shared::Pos,
};
mod board;
mod piece;
mod shared;
mod test_utils;
fn main() {
    let board = Board::new(
        [
            Piece::Z(Z::new(Color::Red, Pos(8, 6), Side::Bottom)),
            Piece::B(B::new(Color::Red, Pos(4, 9), Side::Bottom)),
            Piece::B(B::new(Color::Black, Pos(4, 0), Side::Top)),
        ]
        .to_vec(),
    );
    board.is_finish();
}
