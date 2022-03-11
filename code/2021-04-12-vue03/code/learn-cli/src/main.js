import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// template -> render()
// h 创建一个 vnode () -> 
// render
// tempalte :`<div><App></App></div>`
// el: "#app"

new Vue({
  render: (h) => h(App),
}).$mount("#app");
// mount && el