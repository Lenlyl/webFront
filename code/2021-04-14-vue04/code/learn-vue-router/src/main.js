import Vue from "vue";
import App from "./App.vue";
import router from "./routers";

Vue.config.productionTip = false;

// setup - router

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
