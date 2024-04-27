import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { key, quakeStore } from "./state/quakeStore";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

// Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

app.use(vuetify);

// Use vuex store
app.use(quakeStore, key);

app.mount("#app");
