import request from '@/utils/request';

export function walletInfo() {
  return request({
    url: '/finance/wallet/info',
    method: 'get',
  });
}

export function walletRecharge(data) {
  return request({
    url: '/finance/wallet/recharge',
    method: 'post',
    data,
  });
}

export function getTrades(params) {
  return request({
    url: '/finance/trades',
    method: 'get',
    params,
  });
}

export function getFlows(params) {
  return request({
    url: '/finance/flows',
    method: 'get',
    params,
  });
}

export function nativePayNotify() {
  return request({
    url: '/finance/tenpay/native_pay_notify',
    method: 'post',
  });
}

export function addInvoices(data) {
  return request({
    url: '/finance/invoice/add',
    method: 'post',
    data,
  });
}

export function modifyInvoices(data) {
  return request({
    url: '/finance/invoice/modify',
    method: 'post',
    data,
  });
}

export function getInvoices(params) {
  return request({
    url: '/finance/invoices',
    method: 'get',
    params,
  });
}
