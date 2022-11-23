import { defineStore } from "pinia";
import Player from "@/interfaces/Player";
import getCookie from "@/scripts/getCookies";
import { Word } from "@/interfaces/game";
import { genWords } from "@/kekback/game";
import { createDOMCompilerError } from "@vue/compiler-dom";
import { getTransitionRawChildren } from "vue";

interface GameState {
  players: Array<Player>;
  board: Array<Word> | null;
  turn: string;
  hints: Hints;
  gameState: string;
  isMasterGiveHint: boolean;
  valueOfFirstTimerMaster: number;
  valueOfTimerMaster: number;
  valueOfTimerMembers: number;
  valueOfAddingTime: number;
  timeForMaster: number;
  timeForMembers: number;
  currentTimer: string;
  idForStopTimer: null | number;
  idForStopPickCard: null | number;
  idForStopEndTurn: null | number;
  isModalOpen: boolean;
  isMasterUseMembersTime: boolean;
  isFirstTurn: boolean;
  placeholdersIsLock: boolean;
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
          team: "red",
          id: "125",
          pickedCard: null,
        },
      ],
      board: null,
      turn: "red",
      hints: { red: [], blue: [] },
      gameState: "beforeStart",
      isMasterGiveHint: true,
      valueOfFirstTimerMaster: 120,
      valueOfTimerMaster: 60,
      valueOfTimerMembers: 60,
      valueOfAddingTime: 15,
      timeForMaster: 60,
      timeForMembers: 60,
      currentTimer: "",
      idForStopTimer: null,
      idForStopPickCard: null,
      idForStopEndTurn: null,
      isModalOpen: false,
      isMasterUseMembersTime: false,
      isFirstTurn: true,
      placeholdersIsLock: false,
    } as GameState;
  },

  getters: {
    CurrentPlayer(): Player {
      return this.players.filter((elem) => elem.id === getCookie("id"))[0];
    },
    HasPermissionToWatchColor(): boolean {
      return this.CurrentPlayer?.place === "master";
    },
    HasPermissionToOpenCard(): boolean {
      return this.CurrentPlayer.place === "member" && this.IsCorrectTeamTurn;
    },
    IsCorrectTeamTurn(): boolean {
      return this.CurrentPlayer.team === this.turn;
    },
    UnsolvedRedWords(): number {
      return this.board?.filter(
        (word) => word.color === "red" && !word.revealed
      ).length;
    },
    UnsolvedBlueWords(): number {
      return this.board?.filter(
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
      this.CurrentPlayer.place = place;
      this.CurrentPlayer.team = team;
    },
    SetIdForPlayer(): void {
      if (getCookie("id") === undefined) {
        const randomId = Math.ceil(Math.random() * 10000);
        const id = "id=" + randomId;
        const fullCookie = id + "; max-age=10000000";
        document.cookie = fullCookie;
      }
    },
    SelectCard(card: Word): void {
      if (
        this.HasPermissionToOpenCard &&
        this.gameState === "playing" &&
        !this.isMasterGiveHint
      ) {
        if (this.CurrentPlayer.pickedCard === card) {
          this.CurrentPlayer.pickedCard = null;
          card.isPicking = false;
          clearTimeout(this.idForStopPickCard);
        } else {
          if (this.idForStopPickCard) {
            card.isPicking = false;
            clearTimeout(this.idForStopPickCard);
          }
          if (this.idForStopEndTurn) {
            clearTimeout(this.idForStopEndTurn);
            this.idForStopEndTurn = null;
          }
          if (
            this.CurrentPlayer.pickedCard !== null &&
            this.CurrentPlayer.pickedCard !== "endTurn"
          )
            this.CurrentPlayer.pickedCard.isPicking = false;
          this.CurrentPlayer.pickedCard = card;
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
            this.PlayersInBlueTeam.length ===
            this.PlayersInBlueTeam.filter(
              (player) => player.pickedCard === card
            ).length
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
    CreateTimerForEndTurn(): void {
      this.idForStopEndTurn = setTimeout(this.SwitchTurn, 1500);
    },
    SelectSwitchTurn(): void {
      if (
        this.CurrentPlayer.pickedCard !== "endTurn" &&
        this.CurrentPlayer.pickedCard !== null
      ) {
        this.CurrentPlayer.pickedCard.isPicking = false;
        clearTimeout(this.idForStopPickCard);
      }
      if (this.CurrentPlayer.pickedCard === "endTurn") {
        this.CurrentPlayer.pickedCard = null;
        clearTimeout(this.idForStopEndTurn);
        this.idForStopEndTurn = null;
        return;
      }
      this.CurrentPlayer.pickedCard = "endTurn";
      if (this.turn === "red") {
        if (
          this.PlayersInRedTeam.length ===
          this.PlayersInRedTeam.filter(
            (player) => player.pickedCard === "endTurn"
          ).length
        ) {
          this.CreateTimerForEndTurn();
        }
      } else {
        if (
          this.PlayersInBlueTeam.length ===
          this.PlayersInBlueTeam.filter(
            (player) => player.pickedCard === "endTurn"
          ).length
        ) {
          this.CreateTimerForEndTurn();
        }
      }
    },
    SwitchTurn(): void {
      if (this.turn === "red") {
        this.turn = "blue";
      } else {
        this.turn = "red";
      }
      this.idForStopEndTurn = null;
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
      if (this.CurrentPlayer.team !== color) {
        this.SwitchTurn();
      } else {
        this.timeForMembers += this.valueOfAddingTime;
      }
    },
    EndGame(): void {
      this.gameState = "end";
      this.board.map((elem) => (elem.revealed = true));
      clearInterval(this.idForStopTimer);
      this.SetDefaultTimer();
    },
    RestartGame(): void {
      this.board = genWords();
      this.turn = "red";
      this.gameState = "playing";
      this.isMasterGiveHint = true;
      this.hints = { red: [], blue: [] };
      clearInterval(this.idForStopTimer);
      this.SetDefaultTimer();
      this.SetСurrentTimer("timeForMaster");
      this.players.map((player) => (player.pickedCard = null));
      this.isFirstTurn = true;
      this.StartGame();
    },
    CorrectUnsolvedWords(team: string): number {
      return team === "red" ? this.UnsolvedRedWords : this.UnsolvedBlueWords;
    },
    HidePlaceholderTojoin(team: string, place: string): boolean {
      return (
        this.CurrentPlayer?.team === team && this.CurrentPlayer.place === place
      );
    },
    AddHint(team: string, hint: string): void {
      this.hints[team] = [...this.hints[team], hint];
      this.isMasterGiveHint = false;
      clearInterval(this.idForStopTimer);
      this.SetIntervalForTimer("timeForMembers");
    },
    StartGame() {
      this.gameState = "playing";
      this.placeholdersIsLock = true;
      if (this.isMasterGiveHint) {
        this.SetIntervalForTimer("timeForMaster");
      } else {
        this.SetIntervalForTimer("timeForMembers");
      }
      if (this.board === null) this.board = genWords();
    },
    StopGame() {
      this.gameState = "stoped";
      clearInterval(this.idForStopTimer);
    },
    SetIntervalForTimer(place: string) {
      if (this.isFirstTurn) {
        this.timeForMaster = this.valueOfFirstTimerMaster;
        this.isFirstTurn = false;
      }

      this.DecreaseTimer(place);
      this.idForStopTimer = setInterval(this.DecreaseTimer, 1000, place);
    },
    DecreaseTimer(place: string): void {
      this.SetСurrentTimer(place);
      if (this[place] === 0 && this.timeForMembers === 0) {
        this.SetDefaultTimer;
        this.SwitchTurn();
        return;
      }
      if (this[place] === 0) {
        clearInterval(this.idForStopTimer);
        this.isMasterUseMembersTime = true;
        this.timeForMembers = this.valueOfTimerMembers;
        this.SetIntervalForTimer("timeForMembers");
      }
      this[place] -= 1;
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
      document.cookie = "nickname=" + nickname + "; max-age=10000000";
      this.CurrentPlayer.nickname = nickname;
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
          if (players.length === 1 && length % 2 === 1) {
            currentPlayer.team =
              Math.round(Math.random()) === 1 ? "blue" : "red";
          } else {
            currentPlayer.team = i % 2 === 0 ? "blue" : "red";
          }
        }
        players = players.filter((elem) => elem !== currentPlayer);
      }
      this.RestartGame();
    },
    SwitchStateOfPlaceholders(): void {
      this.placeholdersIsLock = !this.placeholdersIsLock;
    },
  },
});
