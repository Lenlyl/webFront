import Vue from "vue";
import Vuex from "vuex";
console.log(Vuex);
// vuex 的入口文件

// 1. 安装 vuex 插件
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 响应式数据
    title: "heihei",
    age: 18,
    username: "xiaohong",
  },
  mutations: {
    // 只能是同步的
    changeTitle(state, payload) {
      const { title } = payload;
        // setTimeout(() => {
      state.title = title;
        // }, 1000);
    },

    changeAge(state, payload) {
      const { age } = payload;
        // setTimeout(() => {
      state.age = age;
        // }, 3000);
    },
  },
  actions: {
    changeTitle({ commit }, payload) {
      setTimeout(() => {
        commit("changeTitle", payload);
      }, 3000);
    },
  },

  getters: {
    // 全局的 计算属性来使用
    tenYearsOld(state) {
      return state.age + 10;
    },
  },
});

export default store;
