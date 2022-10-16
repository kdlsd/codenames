/* eslint-disable */ 
import { Color } from "@/interfaces/game";
import words from "@/assets/words.json";

const r = (arr: any[]) => {
  const i = Math.floor(Math.random() * arr.length);

  return arr[i];
};

const pick = (n: number, color: Color): any[] => {
  return new Array(n)
        .fill(null).map(() => ({ color, text: r(words), revealed: false }));
};

export const genWords = () => {
  const words = [];

  console.log(pick(1, Color.BLACK));

  words.push(...pick(1, Color.BLACK));
  words.push(...pick(8, Color.RED));
  words.push(...pick(9, Color.BLUE));
  words.push(...pick(7, Color.NEUTRAL));

  shuffle(words);

  return words;
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}