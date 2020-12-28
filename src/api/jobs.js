import request from '@/utils/request';

export function getInstanceType() {
  return request({
    url: '/data/get_instance_type',
    method: 'get',
  });
}

export function getBestPrice(data) {
  return request({
    url: '/data/get_best_price',
    method: 'post',
    data,
  });
}

export function insertJob(data) {
  return request({
    url: '/data/insert_job',
    method: 'post',
    data,
  });
}

export function getStsToken() {
  return request({
    url: '/data/get_sts_token',
    method: 'get',
  });
}

export function getDefaultMachine(params) {
  return request({
    url: '/data/get_default_machine',
    method: 'get',
    params,
  });
}

export function getLcurveData(data) {
  return request({
    url: '/data/get_lcurve_data',
    method: 'post',
    data,
  });
}
