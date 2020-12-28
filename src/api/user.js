// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

export function passwordModify(data) {
  return request({
    url: '/account/password/modify',
    method: 'post',
    data,
  });
}

export function passwordForget(data) {
  return request({
    url: '/account/password/forget',
    method: 'post',
    data,
  });
}

export function register(data) {
  return request({
    url: '/account/regist',
    method: 'post',
    data,
  });
}

export function subAdd(data) {
  return request({
    url: '/account/sub/add',
    method: 'post',
    data,
  });
}

export function accountModify(data) {
  return request({
    url: '/account/modify',
    method: 'post',
    data,
  });
}

export function accountDel(data) {
  return request({
    url: '/account/del',
    method: 'post',
    data,
  });
}

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data,
  });
}

export function organizationModify(data) {
  return request({
    url: '/account/organization/modify',
    method: 'post',
    data,
  });
}

export function accountList(params) {
  return request({
    url: '/account/list',
    method: 'get',
    params,
  });
}

export function getMenu() {
  return request({
    url: '/account/menu',
    method: 'get',
  });
}

export function organizationList(params) {
  return request({
    url: '/account/organization/list',
    method: 'get',
    params,
  });
}

export function roleList(params) {
  return request({
    url: '/account/role/list',
    method: 'get',
    params,
  });
}

export function roleModify(data) {
  return request({
    url: '/account/role/modify',
    method: 'post',
    data,
  });
}

export function roleDel(data) {
  return request({
    url: '/account/role/del',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/loginout',
    method: 'post',
  });
}

export function verify(data) {
  return request({
    url: '/account/code/verify',
    method: 'post',
    data,
  });
}
