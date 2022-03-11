<template>
  <div>
    Child
    <p>count: {{ count }}</p>

    <p>title: {{ title }}</p>

    <button @click="handleToParentByEmit">to parent by emit</button>
    <button @click="handleGetParent">get parent</button>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleGetParent() {
      this.$parent.setMsg("heihei  from child");
    },
    handleToParentByEmit() {
      this.$emit("from-child", "child");
    },
    setCount(v) {
      this.count = v;
    },
  },
};
</script>

<style scoped></style>
