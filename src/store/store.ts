import { defineStore } from "pinia";
import Player from "@/interfaces/Player";
import getCookie from "@/scripts/getCookies";
import { Word } from "@/interfaces/game";
import { genWords } from "@/kekback/game";

interface GameState {
  players: Array<Player>;
  board: Array<Word>;
  turn: string;
  hints: Hints;
  isGameOn: boolean;
  isMasterGiveHint: boolean;
  valueOfTimerMaster: number;
  valueOfTimerMembers: number;
  valueOfAddingTime: number;
  timeForMaster: number;
  timeForMembers: number;
  currentTimer: string;
  idForStopTimer: null | number;
  idForStopPickCard: null | number;
  isModalOpen: boolean;
  isMasterUseMembersTime: boolean;
}

interface Hints {
  red: Array<string>;
  blue: Array<string>;
}

interface Timer {
  minutes: string | number;
  seconds: string | number;
}

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      players: [
        {
          nickname: getCookie("nickname"),
          place: null,
          team: null,
          id: getCookie("id"),
          pickedCard: null,
        },
        {
          nickname: "Влад",
          place: "member",
          team: "blue",
          id: "122",
          pickedCard: null,
        },
        {
          nickname: "Антон",
          place: "member",
          team: "blue",
          id: "123",
          pickedCard: null,
        },
        {
          nickname: "Вася",
          place: "member",
          team: "blue",
          id: "124",
          pickedCard: null,
        },
        {
          nickname: "Инна",
          place: "member",
          team: "blue",
          id: "125",
          pickedCard: null,
        },
      ],
      board: genWords(),
      turn: "red",
      hints: { red: [], blue: [] },
      isGameOn: false,
      isMasterGiveHint: true,
      valueOfTimerMaster: 61,
      valueOfTimerMembers: 61,
      valueOfAddingTime: 15,
      timeForMaster: 61,
      timeForMembers: 61,
      currentTimer: "",
      idForStopTimer: null,
      idForStopPickCard: null,
      isModalOpen: false,
      isMasterUseMembersTime: false,
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
    UnsolvedRedWords(): number {
      return this.board.filter((word) => word.color === "red" && !word.revealed)
        .length;
    },
    UnsolvedBlueWords(): number {
      return this.board.filter(
        (word) => word.color === "blue" && !word.revealed
      ).length;
    },
    PlayersInRedTeam(): Array<Player> {
      return this.players.filter((player) => player.team === "red");
    },
    PlayersInBlueTeam(): Array<Player> {
      return this.players.filter((player) => player.team === "blue");
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
      if (
        this.HasPermissionToOpenCard &&
        this.isGameOn &&
        !this.isMasterGiveHint
      ) {
        if (this.SearchPlayer.pickedCard === card) {
          this.SearchPlayer.pickedCard = null;
          card.isPicking = false;
          clearTimeout(this.idForStopPickCard);
        } else {
          if (this.idForStopPickCard) {
            card.isPicking = false;
            clearTimeout(this.idForStopPickCard);
          }
          if (this.SearchPlayer.pickedCard !== null)
            this.SearchPlayer.pickedCard.isPicking = false;
          this.SearchPlayer.pickedCard = card;
        }
        if (this.turn === "red") {
          if (
            this.PlayersInRedTeam.length ===
            this.PlayersInRedTeam.filter((player) => player.pickedCard === card)
              .length
          ) {
            this.CreateTimerForPickCard(card);
          }
        } else {
          if (
            this.players.length ===
            this.PlayersInBlueTeam.filter(
              (player) => player.pickedCard === card
            )
          ) {
            this.CreateTimerForPickCard(card);
          }
        }
      }
      if (this.UnsolvedBlueWords === 0 || this.UnsolvedRedWords === 0)
        this.EndGame();
    },
    OpenCard(card: Word): void {
      card.isPicking = false;
      this.board.find((word) => word === card).revealed = true;
      this.CheckTurn(card.color);
      if (this.turn === "blue") {
        this.PlayersInBlueTeam.map((player) => (player.pickedCard = null));
      } else {
        this.PlayersInRedTeam.map((player) => (player.pickedCard = null));
      }
    },
    CreateTimerForPickCard(card: Word): void {
      card.isPicking = true;
      this.idForStopPickCard = setTimeout(this.OpenCard, 1500, card);
    },
    SwitchTurn(): void {
      if (this.turn === "red") {
        this.turn = "blue";
      } else {
        this.turn = "red";
      }
      this.isMasterGiveHint = true;
      this.isMasterUseMembersTime = false;
      clearInterval(this.idForStopTimer);
      this.SetDefaultTimer();
      this.SetIntervalForTimer("timeForMaster");
      this.players.map((player) => (player.pickedCard = null));
    },
    CheckTurn(color: string): void {
      if (color === "black") {
        this.EndGame();
        return;
      }
      if (this.SearchPlayer.team !== color) {
        this.SwitchTurn();
      } else {
        this.timeForMembers += this.valueOfAddingTime;
      }
    },
    EndGame(): void {
      this.isGameOn = false;
      this.board.map((elem) => (elem.revealed = true));
      clearInterval(this.idForStopTimer);
      this.SetDefaultTimer();
    },
    RestartGame(): void {
      this.board = genWords();
      this.turn = "red";
      this.isGameOn = false;
      this.isMasterGiveHint = true;
      this.hints = { red: [], blue: [] };
      clearInterval(this.idForStopTimer);
      this.SetDefaultTimer();
      this.SetСurrentTimer("timeForMaster");
      this.players.map((player) => (player.pickedCard = null));
    },
    CorrectUnsolvedWords(team: string): number {
      return team === "red" ? this.UnsolvedRedWords : this.UnsolvedBlueWords;
    },
    HidePlaceholderTojoin(team: string, place: string): boolean {
      return (
        this.SearchPlayer?.team === team && this.SearchPlayer.place === place
      );
    },
    AddHint(team: string, hint: string): void {
      this.hints[team] = [...this.hints[team], hint];
      this.isMasterGiveHint = false;
      clearInterval(this.idForStopTimer);
      this.SetIntervalForTimer("timeForMembers");
    },
    StartGame() {
      this.isGameOn = true;
      this.SetIntervalForTimer("timeForMaster");
    },
    SetIntervalForTimer(place: string) {
      this.timeForMaster = this.valueOfTimerMaster;
      if (!this.isMasterUseMembersTime)
        this.timeForMembers = this.valueOfTimerMembers;
      this.SetTimer(place);
      this.idForStopTimer = setInterval(this.SetTimer, 1000, place);
    },
    SetTimer(place: string): void {
      this[place] -= 1;
      this.SetСurrentTimer(place);
      if (this[place] === 0 && this.timeForMembers === 0) {
        this.SwitchTurn();
        return;
      }
      if (this[place] === 0) {
        clearInterval(this.idForStopTimer);
        this.isMasterUseMembersTime = true;
        this.timeForMembers = this.valueOfTimerMembers;
        this.SetIntervalForTimer("timeForMembers");
      }
    },
    SetDefaultTimer(): void {
      this.timeForMaster = this.valueOfTimerMaster;
      this.timeForMembers = this.valueOfTimerMembers;
    },
    SetСurrentTimer(place: string): void {
      const timer: Timer = {
        minutes: Math.floor(this[place] / 60),
        seconds: this[place] % 60,
      };
      if (timer.minutes < 10) timer.minutes = "0" + timer.minutes;
      if (timer.seconds < 10) timer.seconds = "0" + timer.seconds;
      this.currentTimer =
        timer.minutes.toString() + ":" + timer.seconds.toString();
    },
    ChangeStateModal(): void {
      this.isModalOpen = !this.isModalOpen;
    },
    ChangeNickname(nickname: string): void {
      document.cookie = "nickname=" + nickname;
      this.SearchPlayer.nickname = nickname;
      this.ChangeStateModal();
    },
    CheckNickname(): void {
      if (getCookie("nickname") === undefined) this.isModalOpen = true;
    },
    ShufflePlayers(): void {
      let players = [...this.players.filter((elem) => elem.place !== null)];
      const length = players.length;
      for (let i = 0; i < length; i++) {
        const random = Math.random();
        const idOfCurrentPlayer =
          players[Math.round(random * (players.length - 1))].id;
        const currentPlayer = this.players.find(
          (elem) => elem.id === idOfCurrentPlayer
        );
        if (i < 2) {
          currentPlayer.place = "master";
          currentPlayer.team = i === 0 ? "red" : "blue";
        } else {
          currentPlayer.place = "member";
          if (players.length !== 1) {
            currentPlayer.team = i % 2 === 0 ? "blue" : "red";
          } else {
            currentPlayer.team =
              Math.round(Math.random()) === 1 ? "blue" : "red";
          }
        }
        players = players.filter((elem) => elem !== currentPlayer);
      }
      this.RestartGame();
    },
  },
});
