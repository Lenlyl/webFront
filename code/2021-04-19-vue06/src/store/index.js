import Vue from "vue";
import Vuex from "vuex";
import { apiLogin } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    login(state, payload) {
      const { token } = payload;
      state.token = token;
      localStorage.setItem("token", token);
      console.log(state);
    },
  },
  actions: {
    async login({ commit }, payload) {
      const { username, password } = payload;
      const { data } = await apiLogin({
        username,
        password,
      });
      if (data.state === 1) {
        commit("login", {
          token: data.data.token,
        });
      } else {
        alert("login fail");
      }
    },
  },
  modules: {},
});
