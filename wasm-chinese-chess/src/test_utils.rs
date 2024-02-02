use crate::{
    piece::{IPiece, Piece},
    shared::Pos,
};

pub struct TestDataCanMove {
    pub pieces: Vec<Piece>,
    pub pos: Pos,
    pub expected: bool,
}

pub struct TestDataGetNextPositions {
    pub pieces: Vec<Piece>,
    pub next_positions: Vec<Pos>,
}
