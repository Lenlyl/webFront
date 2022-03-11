<template>
  <div>
    home
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log("before-router-enter");
    console.log(to);
    console.log(from);
    console.log(next);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("before-router-leave");
    console.log(to);
    console.log(from);
    console.log(next);
    next();
  },
};
</script>

<style></style>
