use std::collections::HashMap;

use board::Board;
use piece::{b::B, z::Z};
use shared::{Color, Side};

use crate::{
    minimax::MiniMax,
    piece::{j::J, m::M, p::P, s::S, x::X, IPiece, Piece},
    shared::Pos,
};
mod board;
mod minimax;
mod piece;
mod shared;
mod test_utils;
fn main() {
    let bj1 = J::new(Color::Black, Pos(0, 0), Side::Top);
    let bm1 = M::new(Color::Black, Pos(1, 0), Side::Top);
    let bx1 = X::new(Color::Black, Pos(2, 0), Side::Top);
    let bs1 = S::new(Color::Black, Pos(3, 0), Side::Top);
    let bb = B::new(Color::Black, Pos(4, 0), Side::Top);
    let bs2 = S::new(Color::Black, Pos(5, 0), Side::Top);
    let bx2 = X::new(Color::Black, Pos(6, 0), Side::Top);
    let bm2 = M::new(Color::Black, Pos(7, 0), Side::Top);
    let bj2 = J::new(Color::Black, Pos(8, 0), Side::Top);
    let bp1 = P::new(Color::Black, Pos(1, 2), Side::Top);
    let bp2 = P::new(Color::Black, Pos(7, 2), Side::Top);
    let bz1 = Z::new(Color::Black, Pos(0, 3), Side::Top);
    let bz2 = Z::new(Color::Black, Pos(2, 3), Side::Top);
    let bz3 = Z::new(Color::Black, Pos(4, 3), Side::Top);
    let bz4 = Z::new(Color::Black, Pos(6, 3), Side::Top);
    let bz5 = Z::new(Color::Black, Pos(8, 3), Side::Top);

    let rj1 = J::new(Color::Red, Pos(0, 9), Side::Bottom);
    let rm1 = M::new(Color::Red, Pos(1, 9), Side::Bottom);
    let rx1 = X::new(Color::Red, Pos(2, 9), Side::Bottom);
    let rs1 = S::new(Color::Red, Pos(3, 9), Side::Bottom);
    let rb = B::new(Color::Red, Pos(4, 9), Side::Bottom);
    let rs2 = S::new(Color::Red, Pos(5, 9), Side::Bottom);
    let rx2 = X::new(Color::Red, Pos(6, 9), Side::Bottom);
    let rm2 = M::new(Color::Red, Pos(7, 9), Side::Bottom);
    let rj2 = J::new(Color::Red, Pos(8, 9), Side::Bottom);
    let rp1 = P::new(Color::Red, Pos(1, 7), Side::Bottom);
    let rp2 = P::new(Color::Red, Pos(7, 7), Side::Bottom);
    let rz1 = Z::new(Color::Red, Pos(0, 6), Side::Bottom);
    let rz2 = Z::new(Color::Red, Pos(2, 6), Side::Bottom);
    let rz3 = Z::new(Color::Red, Pos(4, 6), Side::Bottom);
    let rz4 = Z::new(Color::Red, Pos(6, 6), Side::Bottom);
    let rz5 = Z::new(Color::Red, Pos(8, 6), Side::Bottom);

    let mut board = Board::new(
        [
            Piece::J(bj1),
            Piece::M(bm1),
            Piece::X(bx1),
            Piece::S(bs1),
            Piece::B(bb),
            Piece::S(bs2),
            Piece::X(bx2),
            Piece::M(bm2),
            Piece::J(bj2),
            Piece::P(bp1),
            Piece::P(bp2),
            Piece::Z(bz1),
            Piece::Z(bz2),
            Piece::Z(bz3),
            Piece::Z(bz4),
            Piece::Z(bz5),
            Piece::J(rj1),
            Piece::M(rm1),
            Piece::X(rx1),
            Piece::S(rs1),
            Piece::B(rb),
            Piece::S(rs2),
            Piece::X(rx2),
            Piece::M(rm2),
            Piece::J(rj2),
            Piece::P(rp1),
            Piece::P(rp2),
            Piece::Z(rz1),
            Piece::Z(rz2),
            Piece::Z(rz3),
            Piece::Z(rz4),
            Piece::Z(rz5),
        ]
        .to_vec(),
    );

    let mini_max = MiniMax::new(4, true);
    let m = mini_max.get_next_move(&mut board, &Color::Red);

    println!("{:?}", m)
}
