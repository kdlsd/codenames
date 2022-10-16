export enum Color {
  NEUTRAL = "white",
  BLACK = "black",
  BLUE = "blue",
  RED = "red",
}

export interface Word {
  text: string;
  color: Color;
  revealed?: boolean;
}

export interface Board {
  words: Word[];
}

export interface Game {
  id: string;
  board: Board;
}
