<template>
  <p class="placeholder" :class="{ border__bottom: !props.isSpectator }">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isSpectator: {
      required: false,
      default: false,
      value: Boolean,
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

<style scoped>
.placeholder {
  margin: 0;
  padding: 0;
  display: inline-block;
  cursor: pointer;
}
.border__bottom {
  border-bottom: 1px dotted;
}
</style>
