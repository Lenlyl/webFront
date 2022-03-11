// import { createApp, defineComponent, createRenderer, defineProps } from "vue";

// api -> tree-shaking
// function
// tree-shaking -> esm

import { createApp } from "vue";
import App from "./App.vue";

// console.log(defineComponent);
// console.log(createRenderer);
// console.log(defineProps);

// options
const Foo = {
    data() {
        return {
            key: value
        }
    },
  methods: {
      name() {
          
      }
  },
};

// function b(arguments) {}

// function a() {}

// a();

// ---
// a , (b) ->

// ts
// const Bar = defineComponent({
//   data() {},
//   setup() {},
// });

createApp(App).mount("#app");
