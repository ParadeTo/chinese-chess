use std::convert::TryInto;

use wasm_bindgen::prelude::wasm_bindgen;

pub const WIDTH: usize = 9;
pub const HEIGHT: usize = 10;

#[wasm_bindgen]
#[derive(Default, Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct Pos(pub isize, pub isize);

#[derive(Default, Debug, PartialEq, Eq, Hash, Copy, Clone)]
pub enum Color {
    #[default]
    Red,
    Black,
}

impl Color {
    fn as_str(&self) -> &'static str {
        match self {
            Color::Red => "r",
            Color::Black => "b",
        }
    }
}

#[derive(Default, Debug, Copy, Clone, PartialEq, Eq)]
pub enum Role {
    #[default]
    RJ,
    RM,
    RX,
    RS,
    RB,
    RP,
    RZ,
}

impl Role {
    fn as_str(&self) -> &'static str {
        match self {
            Role::RJ => "j",
            Role::RM => "m",
            Role::RX => "x",
            Role::RS => "s",
            Role::RB => "b",
            Role::RP => "p",
            Role::RZ => "z",
        }
    }
}

#[derive(Default, Debug, PartialEq, Eq, Clone, Copy, Hash)]
pub enum Side {
    #[default]
    Top,
    Bottom,
}

impl Side {
    fn as_str(&self) -> &'static str {
        match self {
            Side::Top => "t",
            Side::Bottom => "b",
        }
    }
}

pub fn in_own_side(pos: &Pos, side: &Side) -> bool {
    let Pos(x, y) = *pos;
    if x < 0 || x >= WIDTH as isize {
        return false;
    }
    return (y >= 0 && y < 5 && *side == Side::Top)
        || (y > 4 && y < HEIGHT as isize && *side == Side::Bottom);
}

pub fn in_board(pos: &Pos) -> bool {
    let Pos(x, y) = *pos;
    return x >= 0 && x < WIDTH.try_into().unwrap() && y >= 0 && y < HEIGHT.try_into().unwrap();
}

pub fn in_nine_place(pos: &Pos, side: &Side) -> bool {
    let Pos(x, y) = *pos;
    if x >= 3 && x <= 5 {
        if *side == Side::Top {
            return y >= 0 && y <= 2;
        } else {
            return y >= 7 && y <= 9;
        }
    }
    return false;
}
