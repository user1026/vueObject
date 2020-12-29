import Vue from "vue";
import Vuex from "vuex";
import menu from './modules/menu';
import person from './modules/person';
import cate from './modules/cate'
import specs from './modules/specs'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters:{},
  modules: {
    menu,
    person,
    cate,
    specs,
  }
});