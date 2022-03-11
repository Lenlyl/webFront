<template>
  <div>foo count:{{ count }}</div>
  <div>state count:{{ state.count }}</div>
  <div>double count:{{ double }}</div>
  <button @click="handleChangeCount">change count</button>
  <div>
    {{ user }}
    <button @click="user.age = 28">change user age</button>
  </div>

  <button @click="stopWatchEffect">stop watcheffect</button>
</template>

<script>
import {
  ref,
  reactive,
  readonly,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUpdated,
  inject,
} from "vue";
export default {
  // data() {
  //     return {
  //         count: 0
  //     }
  // },
  props: ["title"],
  setup(props) {
    console.log(props);
    // 尝试修改 props 的值
    // eslint-disable-next-line vue/no-mutating-props
    // props.title = "hahahah" // props 是 readonly 是不可以被修改的

    // setup 是没有 this 的
    // vue2 -> this.$props
    // beforeCreate + created
    // composition api 入口函数
    // count 他不是一个响应式对象
    // 0 -> 值类型
    // 引用类型 -> object array
    // js
    // object
    // number string boolean

    // 等价与 reactive
    // const obj = {
    //   name: "string",
    //   age: 18,
    // };

    // 等价与 ref
    // const name = "string";
    // const age = 18;

    // inject/ provide -> 子组件一个响应式对象，但是我们又不希望 readonly

    const state = reactive({
      count: 0,
    });

    const readonlyState = readonly({
      count: 0,
    });
    console.log(readonlyState);
    // console.log(state);

    let count = ref(10);
    // let name = ref("heihei");

    const handleChangeCount = () => {
      console.log("click");
      // ref
      count.value++;
      // reactive
      state.count++;
      // readonly
      readonlyState.count++;
    };

    // 和ref 是一样的，都必须要通过 .value 来获取值
    const double = computed(() => count.value * 2);

    // watch
    // 第一个参数 ，可以接受一个响应式对象
    watch(
      count,
      (newVal, oldVal) => {
        console.log("count - watch", newVal, oldVal);
      },
      {
        immediate: true,
        // deep:
      }
    );
    watch(state, (newVal) => {
      console.log("state - watch");
      console.log(newVal);
    });

    const user = reactive({
      age: 18,
      name: "xiaohong",
    });

    // 观察对象里面的具体某个 key
    // 必须要用函数返回的形式来写
    watch(
      () => user.age,
      (val) => {
        console.log("user.age -- watch");
        console.log(val);
      }
    );

    // watchEffect
    // watch 更方便一些  -> 更具体
    // 立即执行
    // 支持多个响应式的触发之后就被调用的
    // 功能a -> (a,b,c)
    const stop = watchEffect((onInvalidate) => {
      // 做对应的逻辑
      console.log("watch - effect");
      // 只要是在里面触发了 get set 。。。
      console.log(count.value);
      console.log(user.age);

      // clear -> logic
      onInvalidate(() => {
        // reset
        console.log("clear logic");
      });
    });

    const stopWatchEffect = () => {
      console.log("stop watcheffect");
      stop();
    };

    // 生命周期
    onMounted(() => {
      console.log("on - mounted - one");
    });

    onMounted(() => {
      console.log("on - mounted - two");
    });

    onUpdated(() => {
      console.log("update");
    });

    // 依赖注入
    const app = inject("app");

    console.log("依赖注入", app);

    const title = inject("title", "my name is a title");
    console.log("依赖注入", title);

    return {
      stopWatchEffect,
      user,
      double,
      count,
      state,
      handleChangeCount,
    };
  },
};
</script>

<style></style>
