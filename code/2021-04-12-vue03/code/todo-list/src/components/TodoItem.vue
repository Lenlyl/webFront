<template>
  <div>
    {{ item.title }}
    <button id="remove" @click="handleRemove">remove</button>
    <button @click="handleComplete">complete</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleRemove() {
      this.$emit("remove", this.item.id);
    },
    handleComplete() {
      // TODO
      /// 111111
    },
  },
};
</script>

<style></style>
