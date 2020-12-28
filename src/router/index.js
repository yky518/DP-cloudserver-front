import Vue from 'vue';
import VueRouter from 'vue-router';
import MyLayout from '@/layout/Layout.vue';
import { Message } from 'view-design';
// eslint-disable-next-line import/no-cycle
// import { getMenu } from '@/api/user';
// eslint-disable-next-line import/no-cycle
import { getMenu } from '@/api/user';
// eslint-disable-next-line import/no-cycle
import store from '../store';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard/infos',
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/user/index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/user/components/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/components/Register'),
      },
      {
        path: 'modify',
        name: 'Modify',
        component: () => import('@/views/user/components/ModifyInfo'),
      },
      {
        path: 'modify_password',
        name: 'ModifyPassword',
        component: () => import('@/views/user/components/ModifyPassword'),
      },
      {
        path: 'forget',
        name: 'Forget',
        component: () => import('@/views/user/components/Forget'),
      },
    ],

  },
  {
    path: '/help',
    component: MyLayout,
    children: [
      {
        path: 'help',
        name: 'Help',
        component: () => import('../views/Help.vue'),
      },
      {
        path: 'suggestion',
        name: 'Suggestion',
        component: () => import('../views/Suggestion.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layout/Layout'),
    children: [
      {
        path: 'infos',
        name: 'Infos',
        component: () => import('../views/Infos.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: MyLayout,
    children: [
      {
        path: 'userinfo/:name',
        name: 'Userinfo',
        component: () => import('../views/UserInfo.vue'),
      },

      {
        path: 'job/:id',
        name: 'Job',
        component: () => import(/* webpackChunkName: "about" */ '../views/job/Job.vue'),
      },
      {
        path: '/machine/:id',
        name: 'Machine',
        component: () => import(/* webpackChunkName: "about" */ '../components/Machine.vue'),
      },
    ],
  },
  {
    path: '/finance',
    component: MyLayout,
    children: [
      {
        path: 'wallet',
        name: 'Wallet',
        component: () => import('../views/finance/Wallet.vue'),
      },
    ],
  },

];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes: constantRoutes,
});

export function setMenu(tmpRouters) {
  // router.addRoutes([asyncMenu.admin]);
  console.log(tmpRouters);
  router.addRoutes(tmpRouters);
}

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  // 拦截指定路由
  console.log(store.state.user.name);
  if (store.state.user.name) {
    next();
  } else if (/^\/account/.test(to.path) && to.path !== '/account/modify') {
    next();
  } else {
    console.log(to.path);
    Message.error('请先登录');
    // next('/login');
    next({
      path: '/account/login',
      query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
    });
  }
});

export default router;
