use crate::piece::{IPiece, Piece};
use crate::shared::{Color, Pos, HEIGHT, WIDTH};
use ndarray::{Array2, Axis};
use std::collections::HashMap;
use std::convert::TryInto;

#[derive(Default, Debug)]
pub struct Record<Piece> {
    from: Pos,
    to: Pos,
    eaten: Piece,
}

const NONE: Option<Piece> = Option::None;

#[derive(Debug, Default)]
struct OneHeight([Option<Piece>; HEIGHT as usize]);

#[derive(Debug)]
pub struct Board {
    pub cells: Array2<Option<Piece>>,
    pieces: HashMap<Color, Vec<Piece>>,
    records: Vec<Record<Piece>>,
}
impl Board {
    pub fn new(_pieces: Vec<Piece>) -> Board {
        let mut cells: Array2<Option<Piece>> = Array2::<Option<Piece>>::default((WIDTH, HEIGHT));
        let mut piecesMap = HashMap::new();
        let mut rVec = Vec::new();
        let mut bVec = Vec::new();
        for piece in _pieces.iter() {
            let Pos(x, y) = *piece.get_pos();
            cells[[x as usize, y as usize]] = Option::<Piece>::Some(piece.clone());
            match piece.get_color() {
                Color::Red => rVec.push(piece.clone()),
                Color::Black => bVec.push(piece.clone()),
            }
        }
        piecesMap.insert(Color::Black, bVec);
        piecesMap.insert(Color::Red, rVec);
        Board {
            cells,
            pieces: piecesMap,
            records: Vec::new(),
        }
    }

    pub fn get_piece_by_pos(&self, pos: &Pos) -> Option<Piece> {
        let Pos(x, y) = *pos;
        self.cells[[x as usize, y as usize]].clone()
    }

    pub fn get_next_positions(&self, piece: Piece) -> Vec<Pos> {
        piece.get_next_positions(self)
    }

    pub fn can_move(&self, piece: Piece, pos: &Pos) -> bool {
        return self.in_board(pos) && piece.can_move(pos, self);
    }

    fn in_board(&self, pos: &Pos) -> bool {
        let Pos(x, y) = *pos;
        return x >= 0 && x < WIDTH.try_into().unwrap() && y >= 0 && y < HEIGHT.try_into().unwrap();
    }
}
