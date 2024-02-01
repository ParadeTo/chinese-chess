use std::collections::HashMap;

use crate::piece::IPiece;
use crate::shared::{Color, HEIGHT, WIDTH};

#[derive(Default, Debug)]
pub struct Record<T: IPiece> {
    from: (u32, u32),
    to: (u32, u32),
    eaten: T,
}

#[derive(Default, Debug)]
pub struct Board<'a, T: IPiece> {
    cells: [[Option<&'a T>; HEIGHT as usize]; WIDTH as usize],
    pieces: HashMap<Color, Vec<&'a T>>,
    records: Vec<Record<T>>,
}

impl<'a, T: IPiece> Board<'a, T> {
    pub fn new(mut _pieces: &'a mut Vec<T>) -> Board<'a, T> {
        let mut cells: [[Option<&T>; HEIGHT as usize]; WIDTH as usize] =
            [[Option::<&T>::None; HEIGHT as usize]; WIDTH as usize];
        let mut piecesMap = HashMap::new();
        let mut rVec = Vec::new();
        let mut bVec = Vec::new();
        for piece in _pieces.iter_mut() {
            let (x, y) = piece.get_pos();
            cells[x as usize][y as usize] = Option::<&T>::Some(piece);
            match piece.get_color() {
                Color::Red => rVec.push(&*piece),
                Color::Black => bVec.push(&*piece),
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
}
