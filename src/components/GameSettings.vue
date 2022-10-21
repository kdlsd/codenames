<template>
  <div class="settings">
    <div class="settings__high">
      <div class="settings-timer">
        <div class="timer-master">
          <label class="timer__label" for="timeMaster" title="Таймер мастера"
            >М</label
          >
          <input
            class="timer__input"
            id="timeMaster"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMaster"
          />
        </div>
        <div class="timer-member">
          <label class="timer__label" for="timeMember" title="Таймер игроков"
            >И</label
          >
          <input
            class="timer__input"
            id="timeMember"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMembers"
          />
        </div>
        <div class="timer-adding">
          <label class="timer__label" for="timeAdding" title="Таймер игроков"
            >Д</label
          >
          <input
            class="timer__input"
            id="timeAdding"
            type="number"
            step="1"
            min="5"
            max="999"
            v-model="store.valueOfAddingTime"
          />
        </div>
      </div>
      <button
        title="Перетасовать игроков"
        @click="store.ShufflePlayers()"
        class="btn"
      >
        X
      </button>
    </div>
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

<style scoped>
input {
  color: #cccaca;
}
.settings {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 6px;
  width: 400px;
  background: rgba(63, 63, 62, 0.78);
}
.settings__high {
  display: flex;
  justify-content: space-between;
}
.settings-timer {
  display: flex;
}
.timer__input {
  width: 45px;
  background: transparent;
  border: 1px solid;
  color: #cccaca;
  padding: 2px;
  margin: 3px;
}
</style>
