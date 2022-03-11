import axios from "axios";
import store from "../store";
import router from "../router";

export const http = axios.create({
  baseURL: "/api", // dev /api -> prod /
});

// 请求拦截
http.interceptors.request.use((config) => {
  // headers
  const token = store.state.token;

  if (token) {
    // token
    config.headers.authorization = "Bearer " + token;
  }

  return config;
});

// 响应拦截
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // 通用的
    console.log(err.response);
    if (err.response.status === 401) {
      // 用户登录过期
      router.replace({
        name: "Login",
      });
    }
  }
);
