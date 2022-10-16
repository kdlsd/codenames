<template>
  <div class="game-board">
    <word-card
      class="game-board__item"
      v-for="word of board.words"
      :key="word.id"
      :word="word"
    />
  </div>
</template>

<script lang="ts">
import { Board } from "@/interfaces/game";
import { defineComponent, PropType } from "vue";
import WordCard from "@/components/WordCard.vue";

export default defineComponent({
  props: {
    board: {
      type: Object as PropType<Board>,
    },
  },
  components: {
    WordCard,
  },
});
</script>

<style scoped>
.game-board {
  max-width: 900px;
  width: 100%;
  flex-grow: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 100px);
}
.game-board__item {
  flex: 0 0 17%;
}
</style>
