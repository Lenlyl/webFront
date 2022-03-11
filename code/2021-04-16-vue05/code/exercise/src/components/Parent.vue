<template>
  <div>
    <p>Parent: msg {{msg}}</p>
    <Child ref="child" title="from Parent title" @from-child="handleFromChild"></Child>
    <Child ref="childTwo" title="from Parent title 2" @from-child="handleFromChild"></Child>
    <Child ref="childTree" title="from Parent title 3" @from-child="handleFromChild"></Child>
    <p/>
    <button @click="hanldChildren">get children</button>
    <p/>
    <button @click="hanldGetChildRef">get child by ref</button>
    <p/>
    <button @click="hanldSetCount">set child count</button>
    <p/>
    <input ref="input" type="text"/>
    <button @click="$refs.input.focus()">input focus</button>
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    setMsg(value){
      this.msg = value;
    },
    hanldGetChildRef(){
      console.log(this.$refs);
    },
    hanldSetCount(){
      const {child} = this.$refs;
      if(child) child.setCount(100);
    },
    handleFromChild(v) {
      console.log("from-child: ", v);
    },
    hanldChildren() {
      console.log(this.$children);
    }
  }
}
</script>

<style>

</style>