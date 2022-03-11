<template>
  <div>
    ComC

    <p>title:{{ title }}</p>
    <button @click="handleGetComA">get comA</button>
    <button @click="handleToComA">to ComA</button>
  </div>
</template>

<script>
import { bus } from "../eventBus";
export default {
  props: ["title"],
  inject: ["title","comA"],
  mounted() {
    console.log("comC")
    console.log('$attrs', this.$attrs);
    console.log('$listeners', this.$listeners);
    // console.log(this.title);
  },
  methods: {
    handleToComA() {
      bus.$emit("from-comC", {
        name: "ComC",
      });
      // once 
      // off
      
    },
    handleGetComA() {
      // console.log(this.comA)
      // console.log(this.title)
      // this.comA.changeMsg("heihei from ComC")
    },
  },
};
</script>

<style></style>
