mod board;
mod piece;
mod shared;
mod test_utils;
mod utils;

use board::Board;
use piece::{x::X, IPiece};
use shared::{Color, Pos, Side};
use wasm_bindgen::prelude::*;

use crate::piece::Piece;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
struct Ai {
    board: Board,
}

#[wasm_bindgen]
impl Ai {
    pub fn new() -> Ai {
        let mut piece: Vec<Piece> = Vec::new();
        let x = piece::x::X::new(
            shared::Color::Red,
            Pos(0, 0),
            shared::Side::Top,
            // "rx1".to_string(),
        );
        piece.push(Piece::X(x));
        let board = board::Board::new(piece);
        Ai { board }
    }
}
