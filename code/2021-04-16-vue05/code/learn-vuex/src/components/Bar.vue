<template>
  <div>
    Bar

    <p>title: {{ title }}</p>
    <p>10年后的年龄: {{ tenYearsOld }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$store.state.title,
    };
  },

  computed: {
    tenYearsOld() {
      return this.$store.getters.tenYearsOld
      // return this.$store.state.age + 10;
    },
  },
};
</script>

<style></style>
