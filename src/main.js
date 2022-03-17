import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/scss/bootstrap.scss";

import "aos/dist/aos.css";

createApp(App).use(store).use(router).mount("#app");
