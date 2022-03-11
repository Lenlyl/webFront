<template>
  <div>{{ x }} -- {{ y }}</div>
</template>

<script>
// import mousemoveMixin from "./mm.js";
import { toRefs } from "vue";
import { useMousemove } from "./mousemove.composition.js";
export default {
  // fooMixn
  // x y ?? 我还能知道是从哪里来得嘛？ -> 来源不清晰
  // fooMixin -> x, y 命名冲突
  //   mixins: [mousemoveMixin, fooMixin, barMixin],
  //   mixins: [mousemoveMixin],

  data() {
      return {
        //   key: value
      }
  },
  setup() {
      // created beforeCreate 
      // this.data->key 
    // useFoo()  useBar()
    // position(rective) -> x, y
    // 响应式值得丢失
    // position -> {} x y 都变成 ref
    const { x, y } = toRefs(useMousemove());
    console.log("-=----------------------");
    console.log(x, y);
    // const { x: fooX, y:fooY } = useFoo();

    return {
      x,
      y,
    };
  },
};
</script>

<style></style>
