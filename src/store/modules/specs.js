import {
    specslist
} from '../../util/http';
const state = {
    list: [],
};

const mutations = {
    changelist(state, list) {
        state.list = list
    },
};

const actions = {
    reqspecslist(conntext) {
        specslist({
            size: 100,
            page: 1
        }).then(res => {
            if (res.data.code == 200) {
                conntext.commit('changelist', res.data.list);
            }
        });
    },
};
const getters = {
    getspecslist(state) {
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