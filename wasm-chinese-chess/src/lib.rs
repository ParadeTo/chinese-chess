mod board;
mod piece;
mod shared;
mod test_utils;
mod utils;

use board::Board;
use piece::{x::X, IPiece};
use shared::{Color, Pos, Side};
use wasm_bindgen::prelude::*;

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
        let mut piece = Vec::new();
        let x = piece::x::X::new(
            shared::Color::Red,
            Pos(0, 0),
            shared::Side::Top,
            "rx1".to_string(),
        );
        piece.push(&x);
        let board = board::Board::<piece::x::X>::new(&mut piece);
        let next_positions = board.get_next_positions(&x);
        Ai {}
    }
}
