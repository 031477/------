import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login";
import home from "../views/home/index";
import layout from "../layout";
import regist from "../views/regist";
import lend from "../views/lend/index";
import Return from "../views/Return/index";
import user from "../views/user/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path:"/user",
    name:"asd",
    component:user,
  },
  {
    path: "/layout",
    name: "layout",
    component: layout,
    children: [
      {
        path: "/",
        name: home,
        component: home,
      },
      {
        path: "/lend",
        name: lend,
        component: lend,
      },
      {
        path: "/Return",
        name: Return,
        component: Return,
      },
    ],
  },
  {
    path: "/regist",
    name: "regist",
    component: regist,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
