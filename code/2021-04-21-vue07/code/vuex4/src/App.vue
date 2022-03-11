<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  {{ count }}
  <el-button type="primary">主要按钮</el-button>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { computed } from "vue";
import { useStore } from "vuex";
// this.$store

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  setup() {
    const store = useStore();
    console.log(store);

    return {
      count: computed(() => store.state.count),
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
