<template>
  <div class="card" :class="`bg-` + word.color">
    <span>{{ word.text }}</span>
  </div>
</template>

<script lang="ts">
import { Word } from "@/interfaces/game";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    word: {
      type: Object as PropType<Word>,
      required: true,
    },
  },
});
</script>

<style scoped>
.card {
  cursor: pointer;
  border-radius: 3px;
  color: #000;
  font-size: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
}
.card span {
  user-select: none;
}
.bg-red {
  background: #ff6450;
  color: #8a1000;
  box-shadow: 0 0 0 20px rgb(255 100 80 / 0%);
}
.bg-blue {
  color: #00548a;
  background: #50bbff;
}
.bg-white {
  color: #737065;
  background: rgba(255, 254, 253, 0.81);
}
.bg-black {
  background: #444;
  color: #aaa;
  box-shadow: 0 0 0 20px rgb(68 68 68 / 0%);
}
</style>
