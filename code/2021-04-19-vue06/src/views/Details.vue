<template>
  <div>
    <img :src="item.imgUrl" alt="" />
    <p>
      {{ item.name }}
    </p>
    <button @click="back">back</button>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    back() {
      //TODO -> vuex ? -> api -> id -> photo data
      //           -> id -> vuex -> photo data
      this.$router.back();
    },
  },
};
</script>

<style></style>
