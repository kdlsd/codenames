import { defineStore } from "pinia";
import Player from "@/interfaces/Player";
import getCookie from "@/scripts/getCookies";
import { Word } from "@/interfaces/game";
import { genWords } from "@/kekback/game";

interface GameState {
  players: Array<Player>;
  board: Array<Word>;
}

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      players: [
        {
          nickname: "Егор",
          place: null,
          id: getCookie("id"),
        },
        { nickname: "Влад", place: null, id: "122" },
      ],
      board: genWords(),
    } as GameState;
  },

  getters: {
    SearchPlayer(): Player {
      return this.players.filter((elem) => elem.id === getCookie("id"))[0];
    },
    HasPermissionToWatchColor(): boolean {
      return this.SearchPlayer.place === "master";
    },
  },

  actions: {
    PlayersOnThisPlace(place): Array<Player> {
      return this.players.filter((elem) => elem.place === place);
    },
    PlayersOnThisTeam(teamColor, place): Array<Player> {
      return this.PlayersOnThisPlace(place).filter(
        (elem) => elem.team === teamColor
      );
    },
    SwitchPlace(place, team = null): void {
      this.SearchPlayer.place = place;
      this.SearchPlayer.team = team;
    },
    SetIdForPlayer(): void {
      if (getCookie("id") === undefined) {
        const id = "id=" + Math.ceil(Math.random() * 10000);
        document.cookie = id;
      }
    },
    SelectCard(card: Word): void {
      this.board.find((word) => word === card).revealed = true;
    },
  },
});
