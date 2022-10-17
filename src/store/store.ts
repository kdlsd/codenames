import { defineStore } from "pinia";
import Player from "@/interfaces/Player";
import getCookie from "@/scripts/getCookies";
import { Word } from "@/interfaces/game";
import { genWords } from "@/kekback/game";

interface GameState {
  players: Array<Player>;
  board: Array<Word>;
  turn: string;
  isGameOn: boolean;
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
      turn: "red",
      isGameOn: true,
    } as GameState;
  },

  getters: {
    SearchPlayer(): Player {
      return this.players.filter((elem) => elem.id === getCookie("id"))[0];
    },
    HasPermissionToWatchColor(): boolean {
      return this.SearchPlayer.place === "master";
    },
    HasPermissionToOpenCard(): boolean {
      return this.SearchPlayer.place === "member" && this.IsCorrectTeamTurn;
    },
    IsCorrectTeamTurn(): boolean {
      return this.SearchPlayer.team === this.turn;
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
      if (this.HasPermissionToOpenCard && this.isGameOn) {
        this.board.find((word) => word === card).revealed = true;
        this.SwitchTurn(card.color);
      }
    },
    SwitchTurn(color: string): void {
      if (color === "black") {
        this.EndGame();
        return;
      }
      if (this.SearchPlayer.team !== color) {
        if (this.turn === "red") {
          this.turn = "blue";
        } else {
          this.turn = "red";
        }
      }
    },
    EndGame(): void {
      this.isGameOn = false;
      this.board.map((elem) => (elem.revealed = true));
    },
    RestartGame(): void {
      this.board = genWords();
      this.turn = "red";
      this.isGameOn = true;
    },
  },
});
