pub mod weight;

use std::{
    cmp::{max, min},
    sync::Arc,
};

use crate::{
    board::{Board, Move},
    shared::{Color, Pos},
};

use self::weight::WeightEvalModel;

struct BestMove {
    m: Move,
    value: i32,
}

pub struct MiniMax {
    depth: i32,
    cutOff: bool,
}

const INFINITE: i32 = 999999999;

impl MiniMax {
    fn get_color(&self, is_max: bool, color: &Color) -> Color {
        if is_max {
            return *color;
        } else {
            if *color == Color::Red {
                return Color::Black;
            } else {
                return Color::Red;
            }
        }
    }

    pub fn search(
        &self,
        board: &mut Board,
        color: &Color,
        depth: i32,
        is_max: bool,
        mut alpha: i32,
        mut beta: i32,
    ) -> i32 {
        if depth == 0 || board.is_finish() {
            return WeightEvalModel::eval(board, color);
        }

        let mut value: i32;
        if is_max {
            value = -INFINITE;
        } else {
            value = INFINITE;
        }

        let moves = board.generate_moves(&self.get_color(is_max, color));

        for m in moves.iter() {
            board.update_piece(&m.from, &m.to);
            // println!("move: {:?}, {:?}", m.from, m.to);
            // println!("{:}", board);
            let _value = self.search(board, color, depth - 1, !is_max, alpha, beta);
            board.back_moves(1);
            // println!("back_move:");
            // println!("{:}", board);
            if is_max {
                value = max(value, _value);
                if self.cutOff {
                    alpha = max(alpha, value);
                    if alpha >= beta {
                        return alpha;
                    }
                }
            } else {
                value = min(value, _value);
                if self.cutOff {
                    beta = min(beta, value);
                    if alpha >= beta {
                        return beta;
                    }
                }
            }
        }
        return value;
    }

    pub fn get_best_move(&self, board: &mut Board, color: &Color, moves: Vec<Move>) -> BestMove {
        let mut best_move = BestMove {
            value: -INFINITE,
            m: Move {
                from: Pos(0, 0),
                to: Pos(0, 0),
            },
        };
        let moves_ref = Arc::new(moves);
        let thread_num = 4;
        for m in moves.iter() {
            board.update_piece(&m.from, &m.to);
            let value = self.search(board, color, self.depth - 1, false, -INFINITE, INFINITE);

            board.back_moves(1);

            if best_move.value < value {
                best_move.m = m.clone();
                best_move.value = value
            }
        }

        return best_move;
    }

    pub fn get_next_move(&self, board: &mut Board, color: &Color) -> Move {
        let pieces_moves = board.generate_moves(color);
        let best_move = self.get_best_move(board, color, pieces_moves);
        println!("{}", best_move.value);
        best_move.m
    }

    pub fn new(depth: i32, cutOff: bool) -> MiniMax {
        MiniMax { depth, cutOff }
    }
}
