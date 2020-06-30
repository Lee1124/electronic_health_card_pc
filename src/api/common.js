import request from '@/utils/request'

// 获取所有的机构
export function getORG() {//GET /home/selectAllOrg
  return request({
    url: 'auth/dz_data/home/selectAllOrg',
    method: 'get'
  })
}

/**
 * 映射请求返回的参数
 * @param {*} data {code:10000,result:''}
 */
export function changeRes(data) {
  return {
      status: data.code === 10000 ? 0 : data.code,
      data: data.code === 10000 ? data.result : "",
      msg: data.code === 10000 ? "" : data.message
  }
}