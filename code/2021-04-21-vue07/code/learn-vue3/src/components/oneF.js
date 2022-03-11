import { ref, computed, watch } from "vue";
export function oneF() {
  // one
  const one = ref(1);
  const oneVal = computed(() => one.value + "heiehi");
  watch(one, () => {});
  const oneFn = () => {
    console.log(one.value);
  };

  return { one, oneFn };
}
