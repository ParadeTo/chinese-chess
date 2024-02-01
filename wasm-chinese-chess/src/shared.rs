pub const WIDTH: u32 = 9;
pub const HEIGHT: u32 = 10;

#[derive(Default, Debug, PartialEq, Eq, Hash)]
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

#[derive(Default, Debug)]
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

#[derive(Default, Debug)]
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
