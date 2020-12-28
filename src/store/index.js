import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import user from './modules/user';
import routes from './modules/routes';

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    user,
    routes,
  },
});
