import Vue from 'vue';
import ViewUI from 'view-design';
import echarts from 'echarts';
import {
  parseRouter, asyncRouters
} from '@/utils/parse';
import App from './App.vue';
import router, { setMenu } from './router';
import store from './store';
import 'view-design/dist/styles/iview.css';

if (localStorage.getItem('name')) {
  console.log(store.state.routes.routes);
  const menus = store.state.routes.routes;
  const tmpRouters = [];
  let n = 0;
  for (const menu of menus) {
    const tmp = parseRouter(asyncRouters, menu);
    if (tmp) {
      if (tmp.path === '/jobs' && n === 0) {
        tmpRouters.push({
          name: 'function',
          path: '/functions',
          redirect: `/jobs/function/${tmp.children[0].children[0].path}`,
        });
        n += 1;
      }
      tmpRouters.push(tmp);
    }
  }
  console.log(tmpRouters);
  setMenu(tmpRouters);
}

Vue.prototype.$echarts = echarts;

Vue.use(ViewUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
