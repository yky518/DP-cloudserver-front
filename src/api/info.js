import request from '@/utils/request';

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

export function getJobDetails(params) {
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

//新接口分割线

//主页

export function overview() {
  return request({
    url: '/data/statistics/overview',
    method: 'get',
  });
}

export function fee(params) {
  return request({
    url: '/data/statistics/fee',
    method: 'get',
    params: params
  });
}

export function feeChange(params) {
  return request({
    url: '/data/statistics/fee_change',
    method: 'get',
    params: params
  });
}

export function Job(params) {
  return request({
    url: '/data/statistics/job',
    method: 'get',
    params: params
  });
}

export function Machine(params) {
  return request({
    url: '/data/statistics/machine',
    method: 'get',
    params: params
  });
}

export function MachineDel(id) {
  return request({
    url: '/data/machine/' + id + '/del',
    method: 'post',
  })
}

//任务总览

export function Jobs(params) {
  return request({
    url: "/data/jobs",
    method: "get",
    params: params
  })
}

export function Remark(id, data) {
  return request({
    url: '/data/job/' + id + '/remark',
    method: 'post',
    data,
  });
}

export function deleteJob(id) {
  return request({
    url: '/data/job/' + id + '/del',
    method: 'post',
  });
}

export function star(id, data) {
  return request({
    url: '/data/job/' + id + '/star',
    method: 'post',
    data,
  })
}

export function Tasks(id, params) {
  return request({
    url: "/data/job/" + id + "/tasks",
    method: "get",
    params: params
  })
}

export function log(id) {
  return request({
    url: "/data/task/" + id + "/log",
    method: "get",
  })
}

//服务器总览

export function Snapshots(params) {
  return request({
    url: "/data/snapshots",
    method: "get",
    params: params,
  })
}

export function createMachine(data) {
  return request({
    url: '/data/machine/create',
    method: 'post',
    data,
  })
}
//文件总览

export function Files(params) {
  return request({
    url: "/data/files",
    method: "get",
    params: params,
  })
}

export function delFile(id) {
  return request({
    url: "/data/file/" + id + "/del",
    method: "get",
  })
}

export function fileRemark(id, params) {
  return request({
    url: "/data/file/" + id + "/remark",
    method: "get",
    params: params,
  })
}