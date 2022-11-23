<template>
  <div class="game">
    <div class="buttons"></div>
    <modal-with-input
      @send-value="store.ChangeNickname"
      :startedValue="store.CurrentPlayer.nickname"
      v-if="store.currentModal === 'nickname'"
      >Введите новый никнейм</modal-with-input
    >
    <modal-with-input
      @send-value="store.ChangeHint"
      :startedValue="
        store.hints[store.currentHint.color][store.currentHint.index]
      "
      v-if="store.currentModal === 'hint'"
      >Измените подсказку</modal-with-input
    >

    <spectators-block />
    <div class="game__row">
      <team-block :teamColor="'red'"></team-block>
      <game-board :board="game.board" class="game-board" />
      <team-block :teamColor="'blue'"></team-block>
    </div>
    <game-settings />
  </div>
</template>

<script setup lang="ts">
import TeamBlock from "@/components/TeamBlock.vue";
import GameBoard from "@/components/GameBoard.vue";
import SpectatorsBlock from "@/components/SpectatorsBlock.vue";
import { useRoute } from "vue-router";
import { useGameStore } from "@/store/store";
import ModalWithInput from "@/components/ModalWithInput.vue";
import GameSettings from "@/components/GameSettings.vue";

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
  height: 100%;
  max-height: 600px;
}

.buttons {
  position: absolute;
  left: 50%;
  top: 100px;
}
.time__input {
  width: 50px;
}
</style>
