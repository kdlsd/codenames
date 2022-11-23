<template>
  <div class="settings">
    <div class="settings__high">
      <div class="settings-timer">
        <div class="timer-item timer__first">
          <span
            class="timer-item__label material-symbols-outlined"
            title="Первый таймер мастера"
            >timer</span
          >
          <input
            class="timer-item__input"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfFirstTimerMaster"
          />
        </div>
        <div class="timer-item timer__master">
          <span
            class="timer-item__label material-symbols-outlined"
            title="Таймер мастера"
            >alarm</span
          >
          <input
            class="timer-item__input"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMaster"
          />
        </div>
        <div class="timer-item timer__member">
          <span
            title="Таймер команды"
            class="timer-item__label material-symbols-outlined"
            >alarm_on</span
          >
          <input
            class="timer-item__input"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMembers"
          />
        </div>
        <div class="timer-item timer__adding">
          <span
            class="timer-item__label material-symbols-outlined"
            title="Добавляемое время"
            >alarm_add</span
          >
          <input
            class="timer-item__input"
            type="number"
            step="1"
            min="5"
            max="999"
            v-model="store.valueOfAddingTime"
          />
        </div>
      </div>
      <div
        title="Перетасовать игроков"
        @click="store.ShufflePlayers()"
        class="btn material-symbols-outlined"
        v-show="store.gameState != 'playing'"
      >
        casino
      </div>
    </div>
    <div class="settings__lower">
      <div
        @click="store.RestartGame()"
        class="btn material-symbols-outlined"
        title="Рестарт игры"
        v-show="store.board !== null"
      >
        sync
      </div>
      <div
        @click="store.StartGame"
        v-show="store.gameState !== 'playing'"
        class="btn material-symbols-outlined"
        title="Старт"
      >
        play_arrow
      </div>
      <div
        @click="store.StopGame"
        v-show="store.gameState === 'playing'"
        class="btn material-symbols-outlined"
        title="Стоп"
      >
        pause
      </div>
      <div
        @click="store.SwitchStateOfPlaceholders"
        v-show="store.placeholdersIsLock"
        class="btn material-symbols-outlined"
        title="Разблокировать перемещение"
      >
        lock
      </div>
      <div
        @click="store.SwitchStateOfPlaceholders"
        v-show="!store.placeholdersIsLock"
        class="btn material-symbols-outlined"
        title="Заблокировать перемещение"
      >
        lock_open
      </div>
      <div
        @click="store.OpenModal('nickname')"
        class="btn material-symbols-outlined"
        title="Сменить никнейм"
      >
        edit
      </div>
    </div>
    <div class="material-symbols-outlined settings__open">settings</div>
  </div>
</template>

<script lang="ts">
import { useGameStore } from "@/store/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useGameStore();
    return { store };
  },
});
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
input {
  color: #cccaca;
}
.settings {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  padding: 6px 0 0 6px;
  background: rgba(63, 63, 62, 0.78);
  &:hover {
    width: 400px;
    height: auto;
    .settings__high {
      display: flex;
    }
    .settings__lower {
      display: flex;
      justify-content: end;
    }
  }
  &__high {
    display: flex;
    position: relative;
    justify-content: space-between;
    display: none;
    margin-bottom: 10px;
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      right: 6px;
      left: 0;
      height: 1px;
      background: #cccaca;
    }
  }
  &__lower {
    display: none;
    height: 40px;
    padding-right: 40px;
  }
  &-timer {
    display: flex;
  }
  &__open {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
  }
}
.timer-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  position: relative;
  &__label {
    padding: 0 3px;
  }
  &__input {
    width: 45px;
    background: transparent;
    border: 1px solid;
    color: #cccaca;
    padding: 2px;
    margin: 3px;
  }
}
.btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
</style>
