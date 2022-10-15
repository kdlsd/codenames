<template>
  <div
    class="card"
    :class="{
      'bg-blue': props.color === 'blue',
      'bg-red': props.color === 'red',
      'bg-white': props.color === 'white',
      'bg-black': props.color === 'black',
    }"
  >
    {{ props.word }}
  </div>
</template>

<script lang="ts">
import WordColor from "@/types/WordColor";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    word: {
      type: String,
      required: true,
    },
    color: {
      type: String as PropType<WordColor>,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
.card {
  color: #000;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}
.bg-red {
  background: red;
}
.bg-blue {
  background: blue;
}
.bg-white {
  background: white;
}
.bg-black {
  background: black;
  color: #fff;
}
</style>
