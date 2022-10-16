import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/router";
//import store from "@/store/store";
import "@/assets/styles/style.css";
import "@/assets/styles/normalize.css";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
