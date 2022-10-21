import { Word } from "./game";

export default interface Player {
  nickname: string;
  place: string | null;
  id: string | number;
  team?: string;
  pickedCard?: Word;
}
