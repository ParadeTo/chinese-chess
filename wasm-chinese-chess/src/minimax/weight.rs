use std::{collections::HashMap, convert::TryInto};

use lazy_static::lazy_static;

use crate::{
    board::Board,
    piece::IPiece,
    shared::{Color, Pos, Role, HEIGHT, WIDTH},
};

lazy_static! {
    static ref PIECE_VAL: HashMap<Role, i32> = {
        let mut m = HashMap::new();
        m.insert(Role::RB, 1000000);
        m.insert(Role::RS, 110);
        m.insert(Role::RX, 110);
        m.insert(Role::RM, 300);
        m.insert(Role::RJ, 600);
        m.insert(Role::RP, 300);
        m.insert(Role::RZ, 70);
        m
    };
}

lazy_static! {
    static ref POS_VAL: HashMap<Role, [[i32; WIDTH]; HEIGHT]> = {
        let mut m: HashMap<Role, [[i32; WIDTH]; HEIGHT]> = HashMap::new();
        m.insert(
            Role::RM,
            [
                [4, 8, 16, 12, 4, 12, 16, 8, 4],
                [4, 10, 28, 16, 8, 16, 28, 10, 4],
                [12, 14, 16, 20, 18, 20, 16, 14, 12],
                [8, 24, 18, 24, 20, 24, 18, 24, 8],
                [6, 16, 14, 18, 16, 18, 14, 16, 6],
                [4, 12, 16, 14, 12, 14, 16, 12, 4],
                [2, 6, 8, 6, 10, 6, 8, 6, 2],
                [4, 2, 8, 8, 4, 8, 8, 2, 4],
                [0, 2, 4, 4, -2, 4, 4, 2, 0],
                [0, -4, 0, 0, 0, 0, 0, -4, 0],
            ],
        );
        m.insert(
            Role::RJ,
            [
                [14, 14, 12, 18, 16, 18, 12, 14, 14],
                [16, 20, 18, 24, 26, 24, 18, 20, 16],
                [12, 12, 12, 18, 18, 18, 12, 12, 12],
                [12, 18, 16, 22, 22, 22, 16, 18, 12],
                [12, 14, 12, 18, 18, 18, 12, 14, 12],
                [12, 16, 14, 20, 20, 20, 14, 16, 12],
                [6, 10, 8, 14, 14, 14, 8, 10, 6],
                [4, 8, 6, 14, 12, 14, 6, 8, 4],
                [8, 4, 8, 16, 8, 16, 8, 4, 8],
                [-2, 10, 6, 14, 12, 14, 6, 10, -2],
            ],
        );
        m.insert(
            Role::RP,
            [
                [6, 4, 0, -10, -12, -10, 0, 4, 6],
                [2, 2, 0, -4, -14, -4, 0, 2, 2],
                [2, 2, 0, -10, -8, -10, 0, 2, 2],
                [0, 0, -2, 4, 10, 4, -2, 0, 0],
                [0, 0, 0, 2, 8, 2, 0, 0, 0],
                [-2, 0, 4, 2, 6, 2, 4, 0, -2],
                [0, 0, 0, 2, 4, 2, 0, 0, 0],
                [4, 0, 8, 6, 10, 6, 8, 0, 4],
                [0, 2, 4, 6, 6, 6, 4, 2, 0],
                [0, 0, 2, 6, 6, 6, 2, 0, 0],
            ],
        );
        m.insert(
            Role::RZ,
            [
                [0, 3, 6, 9, 12, 9, 6, 3, 0],
                [18, 36, 56, 80, 120, 80, 56, 36, 18],
                [14, 26, 42, 60, 80, 60, 42, 26, 14],
                [10, 20, 30, 34, 40, 34, 30, 20, 10],
                [6, 12, 18, 18, 20, 18, 18, 12, 6],
                [2, 0, 8, 0, 8, 0, 8, 0, 2],
                [0, 0, -2, 0, 4, 0, -2, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        );
        m
    };
}

pub struct WeightEvalModel;

impl WeightEvalModel {
    fn eval_piece_val(r: &Role) -> i32 {
        return *PIECE_VAL.get(r).unwrap();
    }

    fn eval_pos_val(r: &Role, pos: &Pos) -> i32 {
        let Pos(x, y) = *pos;
        if let Some(p) = POS_VAL.get(r) {
            p[y as usize][x as usize]
        } else {
            0
        }
    }

    pub fn eval(board: &Board, color: &Color) -> i32 {
        let mut self_piece_val = 0;
        let mut self_pos_val = 0;
        let mut opponent_piece_val = 0;
        let mut opponent_pos_val = 0;

        let pieces = board.pieces.get(color).unwrap();
        for p in pieces.iter() {
            self_piece_val += WeightEvalModel::eval_piece_val(p.get_role());
            let Pos(x, y) = *p.get_pos();
            let reversed_pos = &Pos(
                (WIDTH - x as usize - 1).try_into().unwrap(),
                (HEIGHT - y as usize - 1).try_into().unwrap(),
            );
            self_pos_val += WeightEvalModel::eval_pos_val(p.get_role(), reversed_pos);
        }

        let mut opponent_color: Color;
        if *color == Color::Red {
            opponent_color = Color::Black;
        } else {
            opponent_color = Color::Red;
        }

        let pieces = board.pieces.get(&opponent_color).unwrap();
        for p in pieces.iter() {
            opponent_piece_val += WeightEvalModel::eval_piece_val(p.get_role());
            opponent_pos_val += WeightEvalModel::eval_pos_val(p.get_role(), p.get_pos());
        }

        self_piece_val + self_pos_val - opponent_piece_val - opponent_pos_val
    }
}
