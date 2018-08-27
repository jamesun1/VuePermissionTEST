import request from '@/utils/request'
import sxrequest from '@/utils/sunxurequest'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getPermisson(token) {
  return sxrequest({
    url: '/permission/getPermisson',
    method: 'post',
    params: {
      str: '1'
    }
  })
}

