import { defineStore } from "pinia";
import Player from "@/interfaces/Player";
import getCookie from "@/scripts/getCookies";

interface GameState {
  players: Array<Player>;
}

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      players: [
        {
          nickname: "Hui",
          place: "spectator",
          team: "red",
          id: getCookie("id"),
        },
        { nickname: "Penis", place: "member", team: "blue", id: "122" },
      ],
    } as GameState;
  },

  getters: {
    SearchPlayer(): Player {
      return this.players.filter((elem) => elem.id === getCookie("id"))[0];
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
  },
});
