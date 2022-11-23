<template>
  <div
    class="card"
    :class="[
      `bg-${color}`,
      { revealed: word.revealed && store.HasPermissionToWatchColor },
    ]"
  >
    <span>{{ word.text }}</span>
    <div class="players">
      <span
        v-for="player in store.players.filter(
          (value) => value?.pickedCard === props.word
        )"
        :key="player.id"
      >
        {{ player.nickname }}</span
      >
    </div>
    <div
      class="pick__line"
      :class="{
        red: store.turn === 'red',
        blue: store.turn === 'blue',
        active: props.word.isPicking,
        master: store.CurrentPlayer?.place === 'master',
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { Word } from "@/interfaces/game";
import { useGameStore } from "@/store/store";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    word: {
      type: Object as PropType<Word>,
      required: true,
    },
  },
  setup(props) {
    const store = useGameStore();
    const color = computed(() => {
      if (store.HasPermissionToWatchColor || props.word.revealed)
        return props.word.color;
      return "unknown";
    });
    return { color, store, props };
  },
});
</script>

<style scoped>
.card {
  position: relative;
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
  overflow: hidden;
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
.bg-unknown {
  color: #444;
  background: rgba(222, 197, 179, 0.81);
}
.revealed::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background: #000;
  opacity: 0.7;
}
.players {
  position: absolute;
  bottom: 5px;
  left: 5px;
  font-size: 14px;
}
.players span {
  display: inline-block;
  margin-right: 5px;
}
.pick__line {
  width: 0;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.pick__line.active {
  width: 100%;
  transition: width 1.5s linear;
}
.pick__line.blue {
  background: #50bbff;
}
.pick__line.blue.master {
  background: rgb(58, 121, 255);
}
.pick__line.red {
  background: #ff6450;
}
.pick__line.red.master {
  background: rgb(214, 24, 0);
}
</style>
