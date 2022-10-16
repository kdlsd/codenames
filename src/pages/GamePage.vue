<template>
  <div class="game">
    <spectators-block />
    <div class="game__row">
      <team-block :teamColor="'red'"></team-block>
      <game-board :board="game.board" class="game-board" />
      <team-block :teamColor="'blue'"></team-block>
    </div>
  </div>
</template>

<script setup lang="ts">
import { genWords } from "@/kekback/game";
import { toRef } from "vue";
import TeamBlock from "@/components/TeamBlock.vue";
import GameBoard from "@/components/GameBoard.vue";
import SpectatorsBlock from "@/components/SpectatorsBlock.vue";
import { useCounterStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { Color } from "@/interfaces/game";

const game = {
  id: 1,
  board: {
    words: genWords(),
  },
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
</style>
