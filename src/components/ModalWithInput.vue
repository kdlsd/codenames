<template>
  <div class="modal">
    <div class="modal__block">
      <p>
        <slot></slot>
      </p>
      <input
        @keydown.enter="sendValue(newValue)"
        v-model="newValue"
        type="text"
        class="modal__input"
      />
      <button @click="store.CloseModal()" class="modal__btn">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { useGameStore } from "@/store/store";
const store = useGameStore();
const props = defineProps({
  startedValue: {
    required: false,
    default: "",
    value: String,
  },
});
const newValue = ref(props.startedValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "sendValue", value: string): void;
}>();

function sendValue(value: string) {
  emit("sendValue", value);
}
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
