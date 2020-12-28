const state = {
  routes: localStorage.getItem('routes') ? localStorage.getItem('routes').split(',') : [],
};

const getters = {
  routes: (state) => state.routes,
};

const mutations = {
  setRoutes(state, routeList) {
    console.log(routeList);
    state.routes = routeList;
    localStorage.setItem('routes', routeList);
  },
};

const actions = {
  setRoutes({ commit }, routeList) {
    commit('setRoutes', routeList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
