<template>
  <div class="game">
    <button @click="store.RestartGame()" class="restart">рестарт</button>
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

.restart {
  position: absolute;
  left: 50%;
  top: 100px;
}
</style>
