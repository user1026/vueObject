import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$ = $;
import '../src/assets/css/all.css';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
