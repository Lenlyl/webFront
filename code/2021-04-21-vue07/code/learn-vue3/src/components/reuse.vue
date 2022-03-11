<template>
  <div></div>
</template>

<script>
// import { computed, ref } from "vue";
import { oneF } from "./oneF";
// import { twoF } from "./twoF";
// import { threeF } from "./threeF";

export default {
  setup() {
    const { one, oneFn } = oneF();
    // const { two} = twoF();
    // const { three } = threeF();

    return {
      one,
      oneFn,
      //   two,
      //   three,
    };

    // two
    // const two = ref(1);
    // const oneVal = computed(() => one.value + "heiehi");
    // watch(one, () => {});
    // const oneFn = () => {
    //   console.log(one.value);
    // };
    // three
    // const three = ref(1);
    // const oneVal = computed(() => one.value + "heiehi");
    // watch(one, () => {});
    // const oneFn = () => {
    //   console.log(one.value);
    // };
  },
  //   data() {
  //     return {
  //       one: 1,
  //       two: 2,
  //       three: 3,
  //     };
  //   },
  //   methods: {
  //     oneFn() {
  //       console.log(this.one);
  //     },
  //     twoFn() {
  //       console.log(this.two);
  //     },
  //     threeFn() {
  //       console.log(this.three);
  //     },
  //   },
  //   computed: {
  //     oneVal() {
  //       return this.one + "heihei";
  //     },
  //     twoVal() {
  //       return this.two + "heihei";
  //     },
  //     threeVal() {
  //       return this.three + "heihei";
  //     },
  //   },
  //   watch: {
  //     one() {
  //       console.log("watch - one");
  //     },
  //     two() {
  //       console.log("watch - two");
  //     },
  //     three() {
  //       console.log("watch - three");
  //     },
  //   },
};
</script>

<style></style>
