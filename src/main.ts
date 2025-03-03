import App from "@/App.vue";
import router from "@/router";
import { createApp } from "vue";
import "@/assets/style/global.scss";
import { createPinia } from "pinia";
import vuetify from "@/plugins/vuetify";
import Toast, { PluginOptions, POSITION } from "vue-toastification";

const app = createApp(App);
const pinia = createPinia();

const options: PluginOptions = {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  draggable: false,
  position: POSITION.TOP_CENTER,
  timeout: 5000,
};

app.use(Toast, options);
app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount("#app");
