import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Photo from "../views/Photo.vue";
import store from "../store";
// import Details from "../views/Details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/photo",
    name: "Photo",
    component: Photo,
    meta: {
      isAuth: true,
    },
  },
  // {
  //   // path: "/details/:id",
  //   path: "/details",
  //   name: "Details",
  //   component: Details,
  //   props: true,
  // },
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // 动态的加载
  {
    path: "/details",
    name: "Details",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/Details.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    // token ?
    const token = store.state.token;
    if (token) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});

export default router;
