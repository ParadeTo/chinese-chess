use crate::{piece::IPiece, shared::Pos};

pub struct TestDataCanMove<'a, T: IPiece> {
    pub pieces: Vec<&'a T>,
    pub pos: Pos,
    pub expected: bool,
}

pub struct TestDataGetNextPositions<'a, T: IPiece> {
    pub pieces: Vec<&'a T>,
    pub next_positions: Vec<Pos>,
}
