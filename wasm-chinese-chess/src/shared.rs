use wasm_bindgen::prelude::wasm_bindgen;

pub const WIDTH: usize = 9;
pub const HEIGHT: usize = 10;

#[wasm_bindgen]
#[derive(Default, Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct Pos(pub i32, pub i32);

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

#[derive(Default, Debug, Copy, Clone)]
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

#[derive(Default, Debug, PartialEq, Clone, Copy)]
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
    if x < 0 || x >= WIDTH as i32 {
        return false;
    }
    return (y >= 0 && y < 5 && *side == Side::Top)
        || (y > 4 && y < HEIGHT as i32 && *side == Side::Bottom);
}
