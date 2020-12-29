import {personinfo} from '../../util/http' ;
const state ={
    pform:{},
};

const mutations = {
 changeform(state,pform){
      state.pform=pform;
 }
};

const actions = {
  acpersoninfo(context,id){
      personinfo(id).then(res=>{
         if(res.data.code==200){
             context.commit('changeform',res.data.list)
         }
      })
  }
};
const getters={
     pform(state){
         return state.pform;
     }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};