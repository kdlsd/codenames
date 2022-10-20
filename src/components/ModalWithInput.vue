<template>
  <div class="modal">
    <div class="modal__block">
      <p>
        <slot></slot>
      </p>
      <input
        @keydown.enter="store.ChangeNickname(value)"
        v-model="value"
        type="text"
        class="modal__input"
      />
      <button @click="store.ChangeStateModal" class="modal__btn">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useGameStore } from "@/store/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useGameStore();
    const value = store.SearchPlayer?.nickname || "";
    return { store, value };
  },
});
</script>

<style scoped>
.modal {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5;
}
.modal__block {
  position: relative;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  background: #fff;
  width: 300px;
  height: 120px;
  padding: 20px;
}
.modal__block p {
  color: #000;
  text-align: center;
}
.modal__input {
  display: block;
  width: 250px;
  margin: 0 auto;
}
.modal__btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
