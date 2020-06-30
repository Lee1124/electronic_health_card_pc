import request from '@/utils/request'

// 获取首页数据
export function homeData(data) {
  return request({
    url: 'auth/dz_data/home/main',
    method: 'post',
    data
  })
}