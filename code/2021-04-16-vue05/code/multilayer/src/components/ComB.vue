<template>
  <div>
    ComB
    from ComA title:
    <p>{{$attrs}}</p>
    <!-- <ComC :title="title"></ComC> -->
    <ComC :title="$attrs.title" :comC="'from ComB'"></ComC>
  </div>
</template>

<script>
import ComC from "./ComC";
export default {
  // props: ["title"],
  inheritAttrs: false,
  mounted() {
    console.log("comB")
    console.log('$attrs', this.$attrs);
    console.log('$listeners', this.$listeners);

  },
  components: {
    ComC,
  },
};
</script>

<style></style>
