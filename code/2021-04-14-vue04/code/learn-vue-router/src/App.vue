<template>
  <div id="app">
    <div>
      <router-link to="/user/1">to user</router-link>
      <button @click="handleToUser">to user by button</button>
    </div>

    <router-view></router-view>
    <router-view name="one"></router-view>
    <router-view name="two"></router-view>
    <router-view name="three"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    handleToUser() {
      console.log("to user ----");
      // js 编程式导航
      // push
      this.$router.push({
        path: "/user/4",
      });

      // this.$router.replace({
      //   path: "/user/4",
      // });

      // push vs replace 有什么区别
    },
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
