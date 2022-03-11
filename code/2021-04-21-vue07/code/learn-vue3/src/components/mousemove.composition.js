// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted, ref, reactive } from "vue";

export function useMousemove() {
  //   const x = ref(0);
  //   const y = ref(0);

  const position = reactive({
    x: 0,
    y: 0,
  });

  function handleMousemove(e) {
    // x.value = e.pageX;
    // y.value = e.pageY;
    position.x = e.pageX;
    position.y = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", handleMousemove);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMousemove);
  });

  //   return {
  //     x,
  //     y,
  //   };
  //   return {
  //       position
  //   }
  return position;
}
