pub mod weight;

use std::{
    cmp::{max, min},
    sync::{mpsc, Arc},
    thread,
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

fn get_color(is_max: bool, color: &Color) -> Color {
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

fn search(
    cut_off: bool,
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

    let moves = board.generate_moves(&get_color(is_max, color));

    for m in moves.iter() {
        board.update_piece(&m.from, &m.to);
        // println!("move: {:?}, {:?}", m.from, m.to);
        // println!("{:}", board);
        let _value = search(cut_off, board, color, depth - 1, !is_max, alpha, beta);
        board.back_moves(1);
        // println!("back_move:");
        // println!("{:}", board);
        if is_max {
            value = max(value, _value);
            if cut_off {
                alpha = max(alpha, value);
                if alpha >= beta {
                    return alpha;
                }
            }
        } else {
            value = min(value, _value);
            if cut_off {
                beta = min(beta, value);
                if alpha >= beta {
                    return beta;
                }
            }
        }
    }
    return value;
}

pub struct MiniMax {
    depth: i32,
    cut_off: bool,
}

const INFINITE: i32 = 999999999;

impl MiniMax {
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

        let moves = board.generate_moves(&get_color(is_max, color));

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
                if self.cut_off {
                    alpha = max(alpha, value);
                    if alpha >= beta {
                        return alpha;
                    }
                }
            } else {
                value = min(value, _value);
                if self.cut_off {
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
        println!("{:?}", moves.len());
        let thread_num = 8;
        let chunks = moves.len().div_ceil(thread_num);
        let moves_ref = Arc::new(moves);

        let (tx, rx) = mpsc::channel::<(Move, i32)>();
        let cut_off = self.cut_off;
        let depth = self.depth;
        for i in 0..moves_ref.chunks(chunks).count() {
            let moves_clone = moves_ref.clone();
            let mut board_clone = board.clone();
            let color_clone = color.clone();
            let tx_clone = tx.clone();
            thread::spawn(move || {
                for moves in moves_clone.chunks(thread_num).nth(i) {
                    for m in moves.iter() {
                        board_clone.update_piece(&m.from, &m.to);
                        let value = search(
                            cut_off,
                            &mut board_clone,
                            &color_clone,
                            depth - 1,
                            false,
                            -INFINITE,
                            INFINITE,
                        );

                        board_clone.back_moves(1);

                        tx_clone.send((m.clone(), value)).unwrap();
                    }
                }
            });
        }

        for _ in 0..thread_num {
            match rx.recv() {
                Ok((m, value)) => {
                    println!("{:?}, {:?}", m, value);
                    if best_move.value < value {
                        best_move.m = m;
                        best_move.value = value;
                    }
                }
                Err(_) => todo!(),
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

    pub fn new(depth: i32, cut_off: bool) -> MiniMax {
        MiniMax { depth, cut_off }
    }
}
