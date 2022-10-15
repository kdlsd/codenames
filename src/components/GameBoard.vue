<template>
  <div class="game-board">
    <word-card
      class="game-board__item"
      v-for="word in wordsArray"
      :key="word.id"
      :word="word.name"
      :color="word.color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import wordsArray from "@/assets/words";
import WordCard from "@/components/WordCard.vue";

export default defineComponent({
  components: {
    WordCard,
  },
  setup() {
    return {
      wordsArray,
    };
  },
});
</script>

<style scoped>
.game-board {
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
