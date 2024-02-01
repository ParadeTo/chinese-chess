use std::collections::HashMap;

use crate::piece::{IPiece, Piece};
use crate::shared::{Color, Pos, HEIGHT, WIDTH};

#[derive(Default, Debug)]
pub struct Record<T: IPiece> {
    from: Pos,
    to: Pos,
    eaten: T,
}

#[derive(Default, Debug)]
pub struct Board<'a, T: IPiece> {
    pub cells: [[Option<&'a T>; HEIGHT as usize]; WIDTH as usize],
    pieces: HashMap<Color, Vec<&'a T>>,
    records: Vec<Record<T>>,
}

impl<'a, T: IPiece> Board<'a, T> {
    pub fn new(_pieces: &'a Vec<&T>) -> Board<'a, T> {
        let mut cells: [[Option<&T>; HEIGHT as usize]; WIDTH as usize] =
            [[Option::<&T>::None; HEIGHT as usize]; WIDTH as usize];
        let mut piecesMap = HashMap::new();
        let mut rVec = Vec::new();
        let mut bVec = Vec::new();
        for piece in _pieces.iter() {
            let Pos(x, y) = *piece.get_pos();
            cells[x as usize][y as usize] = Option::<&T>::Some(piece);
            match piece.get_color() {
                Color::Red => rVec.push(*piece),
                Color::Black => bVec.push(*piece),
            }
        }
        piecesMap.insert(Color::Black, bVec);
        piecesMap.insert(Color::Red, rVec);
        // Box::new(
        Board {
            cells,
            pieces: piecesMap,
            records: Vec::new(),
        }
        // )
        // board
        // Box::new(board)
        // Board::<'a, T>::default()
        // piecesMap.insert(Color::Black, bVec);
        // piecesMap.insert(Color::Red, rVec);
        // Box::new(Board {
        //     cells,
        //     pieces: piecesMap,
        //     records: Vec::new(),
        // })
    }

    pub fn get_piece_by_pos(&self, pos: &Pos) -> Option<&T> {
        let Pos(x, y) = *pos;
        self.cells[x as usize][y as usize]
    }

    pub fn get_next_positions(&self, piece: &T) -> Vec<Pos> {
        piece.get_next_positions(&self)
    }
}
