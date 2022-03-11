<template>
  <!-- <div>user id: {{ $route.params.id }}</div> -->
  <div>
    user id: {{ id }}

    <router-view></router-view>

    <button @click="handleToHome">home</button>
    <button @click="back">back</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    handleToHome() {
      this.$router.push({
        name: "Home",
      });
    },
    back() {
      this.$router.back();
      // this.$router.go(-1)
    },
  },
  created() {
    // console.log("axios - fetch - api", this.$route.params.id);
  },
  mounted() {
    console.log('this.id:', this.id);
    // $route?
    // console.log(this.$route);
  },
  // hook -> router
  //   beforeRouteUpdate(to, from, next) {
  //     console.log("axios - fetch - api", this.$route.params.id);
  //     console.log("update");
  //     next();
  //   },
  //   watch: {
  //     $route() {
  //       console.log("axios - fetch - api", this.$route.params.id);
  //     },
  //   },
};
</script>

<style></style>
