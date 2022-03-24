import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import axios from "axios";
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === '/' ){
    next();
  } else {
    const  token= sessionStorage.getItem("token")
    if (!token) {
      alert('您还没有登录，请先登录');
      next('/')
    } else {
      console.log(1);
      next();
    }
  }
})