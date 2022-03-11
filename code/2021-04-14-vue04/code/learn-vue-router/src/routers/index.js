// vue-router
import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Foo from "../views/Foo.vue";
import Bar from "../views/Bar.vue";
// import NewUser from "../views/NewUser.vue";

// 小步走的思想
console.log(VueRouter);

// 1. 安装
// use 熟悉不？-> koa -> use
// use 就是安装一个插件
// vue-router 插件的存在
Vue.use(VueRouter);

// Vue.use((Vue)=>{
// app -> 各种各样的事
// 你只要不破坏之前的功能就可以
// Vue.component("router-view",{})
// })

// 2. 初始化 vue-router
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      alias: "/heihei",
      //   component: Home,
      name: "Home",
      components: {
        one: Home,
        two: Foo,
        three: Bar,
      },
      beforeEnter(to, from, next) {
        console.log(to);
        console.log(from);
        console.log("before - enter");
        next();
      },
    },
    // 先匹配到谁 就是谁
    // {
    //   path: "/user/2",
    //   component: NewUser,
    // },
    {
      path: "/user/:id",
      component: User,
      meta: {
        isAuth: true,
      },
      //   props: true,
      props: (route) => {
        // TODO -> 看看 object 的形式应该如何使用
        console.log(route);
        return {
          id: route.params.id,
        };
      },
      children: [
        {
          path: "foo", // foo -> /user/:id/foo
          component: Foo,
        },

        {
          path: "bar",
          component: Bar,
        },
      ],
    },
  ],
});
// 本质
// 程序 = 数据结构 + 算法
// url -> view(Component)
// koa -> router 是不是很类似
// koa router : url -> 处理函数
// koa -> next 在中间件里面必须要调用 next

// 全局的前置守卫
// 做一个 前端的 权限校验
// router.beforeEach((to, from, next) => {
//   console.log("before - each");
//   console.log(to);
//   console.log(from);
//   //   console.log(next);
//   // 处理异步的操作

//   // user -> jwt
//   if (to.meta.isAuth) {
//     // 检测 是不是已经 授权了
//     const isLogined = false;
//     if (isLogined) {
//       console.log("????????");
//       next();
//     } else {
//       next({
//         // login
//         name: "Home",
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
