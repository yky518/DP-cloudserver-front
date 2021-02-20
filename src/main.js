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
import i18n from './assets/languages/i18n.js'
import './utils/drog'
if (localStorage.getItem('name')) {
  console.log(store.state.routes.routes);
  const menus = store.state.routes.routes;
  const tmpRouters = [];
  let n = 0;
  for (const menu of menus) {
    const tmp = parseRouter(asyncRouters, menu);
    if (tmp) {
      if (tmp.path === '/jobs' && n === 0) {
        console.log(tmp)
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
  setMenu(tmpRouters);
}
if(!localStorage.getItem('lang'))
  localStorage.setItem('lang','zh')

Vue.prototype.$echarts = echarts;

Vue.use(ViewUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
