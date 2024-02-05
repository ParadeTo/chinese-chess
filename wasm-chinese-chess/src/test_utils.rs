use crate::{piece::Piece, shared::Pos};

pub struct TestDataCanMove {
    pub piece: Piece,
    pub pieces: Vec<Piece>,
    pub pos: Pos,
    pub expected: bool,
}

pub struct TestDataGetNextPositions {
    pub piece: Piece,
    pub pieces: Vec<Piece>,
    pub next_positions: Vec<Pos>,
}
