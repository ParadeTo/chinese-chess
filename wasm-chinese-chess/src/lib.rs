mod board;
mod minimax;
mod piece;
mod shared;
mod test_utils;
mod utils;

use crate::board::Move;
use crate::piece::Piece;
use crate::{
    minimax::MiniMax,
    piece::{j::J, m::M, p::P, s::S, x::X, IPiece},
    shared::Pos,
};
use board::Board;
use shared::{Color, Side};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
struct Ai {
    board: Board,
    algo: MiniMax,
}

#[wasm_bindgen]
impl Ai {
    pub fn new() -> Ai {
        Ai {
            board: Board::default(),
            algo: MiniMax::new(3, true),
        }
    }

    pub fn update_board(&mut self, from: Pos, to: Pos) {
        self.board.update_piece(&from, &to);
    }

    pub fn get_next_move(&mut self, color: Color) -> Move {
        self.algo.get_next_move(&mut self.board, &color)
    }
}
