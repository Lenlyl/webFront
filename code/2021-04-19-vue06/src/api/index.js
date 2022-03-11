// 和后端通信的接口逻辑

// api -> 他是和后端通信的
// import axios from "axios";
import { http } from "../utils";

export function apiLogin({ username, password }) {
  // baseURL + /login => /api/login
  return http.post("/login", {
    username,
    password,
  });
}

export function apiGetPhotos() {
  return http.get("/getPhotos");
}

export function apiUpload(file) {
  const formData = new FormData();
  formData.append("img", file);

  return http.post("/upload", formData);
}
