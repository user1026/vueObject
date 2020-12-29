import {catelist} from '../../util/http'
const state = {
    list: [],
};

const mutations = {
    changeCateList(state, list) {
        state.list=list;
    },
};

const actions = {
    cateList(context) {
        catelist().then(res => {
               context.commit('changeCateList', res.data.list);
        });
    },
};
const getters={
    getcatelist(state){
        return state.list;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};