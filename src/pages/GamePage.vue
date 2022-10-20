<template>
  <div class="game">
    <div class="buttons">
      <button @click="store.RestartGame()" class="btn">Рестарт</button>
      <button @click="store.StartGame" v-show="!store.isGameOn" class="btn">
        Старт
      </button>
      <button @click="store.ChangeStateModal" class="btn">
        Сменить никнейм
      </button>
      <button @click="store.ShufflePlayers()" class="btn">
        Перетасовать игроков
      </button>
      <div class="time">
        <div class="time-master">
          <label class="time__label" for="timeMaster">Время мастера: </label>
          <input
            class="time__input"
            id="timeMaster"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMaster"
          />
        </div>
        <div class="time-member">
          <label class="time__label" for="timeMember">Время игроков: </label>
          <input
            class="time__input"
            id="timeMember"
            type="number"
            step="1"
            min="10"
            max="999"
            v-model="store.valueOfTimerMembers"
          />
        </div>
      </div>
    </div>
    <modal-with-input v-show="store.isModalOpen"
      >Введите новый никнейм</modal-with-input
    >

    <spectators-block />
    <div class="game__row">
      <team-block :teamColor="'red'"></team-block>
      <game-board :board="game.board" class="game-board" />
      <team-block :teamColor="'blue'"></team-block>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamBlock from "@/components/TeamBlock.vue";
import GameBoard from "@/components/GameBoard.vue";
import SpectatorsBlock from "@/components/SpectatorsBlock.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue-demi";
import { useGameStore } from "@/store/store";
import ModalWithInput from "@/components/ModalWithInput.vue";

const route = useRoute();
const store = useGameStore();

const game = {
  id: route.params.id,
};
</script>

<!-- <script>
import { toRef } from "vue";
import TeamBlock from "@/components/TeamBlock.vue";
import GameBoard from "@/components/GameBoard.vue";
import SpectatorsBlock from "@/components/SpectatorsBlock.vue";
import { useCounterStore } from "@/store/store";
import { storeToRefs } from "pinia";

export default {
  components: { TeamBlock, GameBoard, SpectatorsBlock },
  setup() {
    const store = useCounterStore();
    const { increment: inc } = store;
    const { count: n } = storeToRefs(store);

    return {
      inc,
      n,
      // count,
    };
  },
};
</script> -->

<style scoped>
.game {
  height: 100vh;
  display: flex;
  align-items: center;
}

.game__row {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10vw;
}

.buttons {
  position: absolute;
  left: 50%;
  top: 100px;
}
.time {
}
.time__label {
}
.time__input {
  width: 50px;
}
.time-master {
}
.time-member {
}
</style>
