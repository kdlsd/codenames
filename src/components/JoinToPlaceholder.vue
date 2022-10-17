<template>
  <p class="placeholder"><slot></slot></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.placeholder {
  margin: 0;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
