<template>
  <div>
    Foo
    <p>title: {{ title }}</p>
    <p>age: {{ age }}</p>
    <p>username: {{ username }}</p>
    <p>10年后的年龄: {{ tenYearsOld }}</p>
    <p>异步更新title: {{ asyncTitle }}</p>
    <button @click="changeTitle">changeTitle</button>
    <button @click="asyncChangeTitle">asyncChangeTitle</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// const result = mapState(["title"]);
// console.log(result);
export default {
  data() {
    return {
      // 值得传递
      // heihei
      //   title: this.$store.state.title,
    };
  },

  computed: {
    ...mapState(["title", "age", "username"]),
    ...mapGetters(["tenYearsOld"]),
    ...mapActions({asyncTitle: 'changeTitle'}),
    // tenYearsOld() {
    //   return this.$store.getters.tenYearsOld;
    //   // return this.$store.state.age + 10;
    // },
    // tenYearsOld() {
    //   return this.$store.state.age + 10;
    // },
    // title() {
    //   return this.$store.state.title;
    // },
    // age() {
    //   return this.$store.state.age;
    // },
    // username() {
    //   return this.$store.state.username;
    // },
  },
  methods: {
    async asyncChangeTitle() {
      const result = await this.$store.dispatch("changeTitle", {
        title: "ahhahahahahhsdlfjasdlkfjdslfjdslfjdsk",
      })
      console.log(result);
    },

    changeTitle() {
      // 直接修改的 title
        // this.$store.state.title = "hahahahahah";
      this.$store.commit("changeTitle", {
        title: "hahahhahhhaahh",
      });

      console.log("change title");
    },
  },
};

// function changeTitle(val) {
//   this.$store.state.title = val;
// }
</script>

<style></style>
