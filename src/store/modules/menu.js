import {menuinfo} from '../../util/http' ;
const state ={
    form:{},
};

const mutations = {
 changeform(state,form){
      state.form=form;
 }
};

const actions = {
  acmenuinfo(context,id){
      menuinfo(id).then(res=>{
         if(res.data.code==200){
             context.commit('changeform',res.data.list)
         }
      })
  }
};
const getters={
     form(state){
         return state.form;
     }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};