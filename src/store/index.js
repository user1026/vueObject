import Vue from "vue";
import Vuex from "vuex";
import menu from './modules/menu';
import person from './modules/person';
import cate from './modules/cate'
import specs from './modules/specs'
import {reqlogin } from '../util/http'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo:{}
  },
  mutations: {
    changeuser(state,user){
      state.userinfo=user;
    }
  },
  actions: {
    requserinfo(context,user){
          context.commit('changeuser',user);
    }
  },
  getters:{
    getuserinfo(state){
      return state.userinfo;
    }
  },
  modules: {
    menu,
    person,
    cate,
    specs,
  }
});