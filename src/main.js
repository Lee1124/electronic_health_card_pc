import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router/routers";
import store from "./store";
import './router/index';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//是一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一
import 'normalize.css/normalize.css'
// global css
import './assets/styles/index.scss';
import Cookies from 'js-cookie'

import './utils/VueComponent';//全局注册组件
// import './utils/flexible';//适配模块
import './assets/icons' // svg-icon
// import "./utils/gt";//图形滑块验证

// import htmlToPdf from '@/utils/htmlToPdf'
// Vue.use(htmlToPdf)


// 权限指令
import permission from './components/Permission'

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(permission);

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
