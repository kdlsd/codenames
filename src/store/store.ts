import { defineStore } from "pinia";

interface CounterState {
  count: number;
}

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 } as CounterState;
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
});
