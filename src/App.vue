<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useGameStore } from "./store/store";

export default defineComponent({
  setup() {
    const store = useGameStore();
    onMounted(() => {
      store.SetIdForPlayer();
      store.CheckNickname();
    });
  },
});
</script>
