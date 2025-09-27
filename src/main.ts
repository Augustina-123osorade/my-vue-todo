import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";



import "./assets/main.css"; // Tailwind or global CSS

// Create app
const app = createApp(App);

// Add Pinia (state management)
const pinia = createPinia();
app.use(pinia);

// Add Router
app.use(router);

// Mount to #app
app.mount("#app");
