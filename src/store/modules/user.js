// eslint-disable-next-line import/no-cycle
import { login, getMenu } from '@/api/user';
import store from '@/store';
import { asyncRouters, parseRouter } from '@/utils/parse';
import { setMenu } from '@/router';

const state = {
  name: localStorage.getItem('name') || '',
  organization_bid: localStorage.getItem('organization_bid') || '',
  user_bid: localStorage.getItem('user_bid') || '',
};

const getters = {
  name: (state) => state.name,
  organization_bid: (state) => state.organization_bid,
  user_bid: (state) => state.user_bid,
};

const mutations = {
  login(state, data) {
    console.log(data);
    localStorage.setItem('name', data.user_name);
    state.name = data.user_name;
    localStorage.setItem('organization_bid', data.organization_bid);
    state.organization_bid = data.organization_bid;
    localStorage.setItem('user_bid', data.user_bid);
    state.user_bid = data.user_bid;
  },
  logout(state) {
    localStorage.removeItem('name');
    state.name = '';
    localStorage.removeItem('organization_bid');
    state.organization_bid = '';
    localStorage.removeItem('user_bid');
    state.user_bid = '';
  },
};

const actions = {
  async login({ commit }, userInfo) {
    console.log(userInfo);
    // eslint-disable-next-line no-unused-vars
    const data = await login(userInfo);
    const menusList = await getMenu(userInfo);
    console.log(data);
    commit('login', data);
    commit('routes/setRoutes', menusList.menus, { root: true });
    // setMenu();
    const tmpRouters = [];
    for (const menu of menusList.menus) {
      const tmp = parseRouter(asyncRouters, menu);
      if (tmp) {
        tmpRouters.push(tmp);
      }
    }
    setMenu(tmpRouters);
  },
  async logout({ commit }) {
    commit('logout');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
