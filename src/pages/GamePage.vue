<template>
  <div class="game">
    <spectators-block />
    <div class="game__row">
      <team-block :teamColor="'red'"></team-block>
      <game-board class="game-board" />
      <team-block :teamColor="'blue'"></team-block>
    </div>
  </div>
</template>

<script>
import TeamBlock from "@/components/TeamBlock.vue";
import GameBoard from "@/components/GameBoard.vue";
import SpectatorsBlock from "@/components/SpectatorsBlock.vue";

export default {
  components: { TeamBlock, GameBoard, SpectatorsBlock },
  setup() {
    const n = 10;
    return {
      n,
    };
  },
};
</script>

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
