<template>
  <div class="spectators-block">
    <span>Наблюдатели: </span>
    <join-to-placeholder @click="store.SwitchPlace(place)" :place="place"
      >...</join-to-placeholder
    >
    <div class="spectators__row">
      <div
        class="player"
        v-for="player in store.PlayersOnThisPlace(place)"
        :key="player.id"
      >
        {{ player.nickname }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JoinToPlaceholder from "@/components/JoinToPlaceholder.vue";
import { useGameStore } from "@/store/store";

export default defineComponent({
  components: {
    JoinToPlaceholder,
  },
  setup() {
    const place = "spectator";
    const store = useGameStore();
    return { store, place };
  },
});
</script>

<style scoped>
.spectators-block {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  background: #000;
  display: flex;
}
.spectators__row {
  display: flex;
}
.player {
  background: #333;
  padding: 5px 10px;
  margin: 0 5px;
}
</style>
