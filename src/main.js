import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
import '../src/assets/css/all.css';
Vue.prototype.$baseUrl = 'http://47.100.79.78';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
