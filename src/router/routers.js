import Vue from "vue";
import VueRouter from "vue-router";
import router_one from "./routers/router_one";
Vue.use(VueRouter);

//避免vue-router路由版本不一致重复点击时的报的错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

//默认路由
export const constantRouterMap=[...router_one];
export default new VueRouter({
  // mode: "history",
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  scrollBehavior: () => ({ x: 0, y: 0 }),
  // base: process.env.BASE_URL,
  routes:constantRouterMap
});

