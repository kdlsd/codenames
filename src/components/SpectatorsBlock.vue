<template>
  <div class="spectators-block">
    <join-to-placeholder>Стать наблюдателем</join-to-placeholder>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JoinToPlaceholder from "@/components/JoinToPlaceholder.vue";

export default defineComponent({
  components: {
    JoinToPlaceholder,
  },
});
</script>

<style scoped>
.spectators-block {
  position: absolute;
  right: 0;
  top: 0;
  height: 30px;
  padding: 5px 10px;
  background: #000;
}
</style>
