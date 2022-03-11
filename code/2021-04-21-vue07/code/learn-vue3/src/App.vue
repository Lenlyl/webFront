<template>
  <Foo ref="foo" title="heihei"></Foo>
  <div ref="element">123</div>
  <div>
    <Mousemove></Mousemove>
  </div>
</template>

<script>
import Foo from "./components/Foo.vue";
import Mousemove from "./components/Mousemove";
import { provide, ref, onMounted } from "vue";

// this.$refs

export default {
  name: "App",

  components: {
    Foo,
    Mousemove,
  },

  setup() {
    provide("app", "app --- heiheihei -- hahha");
    provide("title", ref("hsdljfsdk"));

    const foo = ref(null);
    const element = ref(null);

    onMounted(() => {
      console.log(foo);
      console.log(element);
    });
    return {
      foo,
      element,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
