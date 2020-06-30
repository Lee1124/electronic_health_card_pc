import request from '@/utils/request'

export function getCodeImg() {
  return request({
    url: 'api/dz_data/sliding',
    method: 'get'
  })
}

export function login(userName, passWord, verifyCode) {
  return request({
    url: 'api/dz_data/login',
    method: 'post',
    data: {
      userName,
      passWord
    }
  })
}

export function getUserInfo() {
  return request({
    url: 'api/dz_data/getUser',
    method: 'get'
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}


