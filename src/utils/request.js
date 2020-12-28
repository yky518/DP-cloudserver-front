import axios from 'axios';
import { Modal, Message } from 'view-design';
// eslint-disable-next-line import/no-cycle
import router from '../router';
// eslint-disable-next-line import/no-cycle
import store from '../store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    console.log(response);
    if (response.status === 200) {
      if (response.data.code === '0000') {
        return Promise.resolve(response.data.data);
      }
      Message.error(response.data.message);
      router.replace({ path: '/account/login' });
    }
    return Promise.reject(response);
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  // eslint-disable-next-line consistent-return
  (error) => {
    console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/account/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Modal.error({
            content: '登录过期，请重新登录',
          });
          // 清除token
          localStorage.removeItem('name');
          store.dispatch('logout');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/account/login',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Modal.error({
            content: '网络请求不存在',
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Modal.error({
            content: '网络异常',
          });
      }
      return Promise.reject(error.response);
    }
  },
);

export default instance;
