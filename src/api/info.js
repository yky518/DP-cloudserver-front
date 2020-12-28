import request from '@/utils/request';

export function getJobSummary() {
  return request({
    url: 'data/get_job_summary',
    method: 'get',
  });
}

export function getUserDetails() {
  return request({
    url: 'data/get_user_details',
    method: 'get',
  });
}

export function getMachineSummary() {
  return request({
    url: 'data/get_machine_summary',
    method: 'get',
  });
}

export function getUserSummary() {
  return request({
    url: 'data/get_user_summary',
    method: 'get',
  });
}

export function getJodDetails(params) {
  return request({
    url: 'data/get_job_details',
    method: 'get',
    params,
  });
}

export function getAliveMachine() {
  return request({
    url: 'data/get_alive_machine',
    method: 'get',
  });
}

export function updateTaskOperation(data) {
  return request({
    url: 'data/update_task_operation',
    method: 'post',
    data,
  });
}

export function getIterData(data) {
  return request({
    url: 'data/get_iter_data',
    method: 'post',
    data,
  });
}
