<template>
  <div>
    ComA

    <p>msg:{{ msg }}</p>
    <ComB :title="$attrs.title" :comb="'from ComA'" @a="handleA" @b="handleB" class="comB"></ComB>
    <!-- <ComB :title="title"></ComB> -->
    <!-- <ComB></ComB>
    <button @click="getAttrs">get attrs</button> -->
  </div>
</template>

<script>
import ComB from "./ComB";
import { bus } from "../eventBus";
export default {
  //   props: ["title"],
  inheritAttrs: false,
  components: {
    ComB,
  },
  data() {
    return {
      msg: "msg",
    };
  },
  provide() {
    return {
      // 你给什么，他就传什么过去
      title: "heihei",
      comA: this,
    };
  },
  mounted() {
    const handleFromComc = () => {
      console.log("from-comC");
      bus.$off("from-comC", handleFromComc);
    };

    bus.$on("from-comC", handleFromComc);

    // bus.$once("from-comC", (v) => {
    //   console.log("from-comC", v);
    // });
  },
  methods: {
    handleA() {},

    handleB() {},
    getAttrs() {
      console.log(this.$attrs);
    },
    changeMsg(v) {
      this.msg = v;
    },
  },
  //   provide: {
  //     title: "heihei",
  //     comA: this,
  //   },
};
</script>

<style>
.comB {
  color: gray;
}
</style>
