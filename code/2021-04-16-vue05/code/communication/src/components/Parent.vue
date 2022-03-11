<template>
  <div>
    Parent
    <!-- <Child
      ref="child"
      title="first child"
      @from-child="handleFromChild"
    ></Child> -->
    <Foo></Foo>

    <p>msg:{{ msg }}</p>
    <!-- <Child
      ref="child"
      title="second child"
      @from-child="handleFromChild"
    ></Child> -->
    <input type="text" ref="input" />
    <button @click="$refs.input.focus()">focus</button>
    <button ref="btn" @click="hadnleGetChildByRef">get child by ref</button>
    <button @click="getChildren">get children</button>
  </div>
</template>

<script>
import Child from "./Child.vue";

export default {
  components: {
    Child,
  },
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    setMsg(val) {
      this.msg = val;
    },
    getChildren() {
      console.log(this.$children);

      // 获取 组件实例的方式是通过 $children
      const child = this.$children[0];
      // 获取到组件的实例之后，就可以调用组件实例上的方法了
      // 通信

      // Foo setCount ?  --> error
      child.setCount(100);
    },
    hadnleGetChildByRef() {
      console.log(this.$refs);
      // 获取到组件的实例之后，就可以调用组件实例上的方法了
      // 通信
      const { child } = this.$refs;
      child.setCount(10);
    },
    handleFromChild(v) {
      console.log("from - child", v);
    },
  },
};
</script>

<style scoped></style>
