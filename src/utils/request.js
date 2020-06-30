/**
 * axios请求拦截处理
 */
import store from '../store'
import axios from 'axios'
import router from '@/router/routers'
import commonSet from '../settings'
import { getToken } from '@/utils/auth'
import { notify } from '@/utils/index'
import { MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
    timeout: commonSet.timeout, // 请求超时时间
})
// http请求拦截
service.interceptors.request.use(config => {
    if (config.method == 'get') {
        if (!/\?/.test(config.url)) {
            let str = splitJoint(config.data);
            config.url += str;
        }
    }
    if (getToken()) {
        config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
},
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
);

function splitJoint(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(key + '=' + obj[key]);
    }
    return arr.length > 0 ? '?' + arr.join('&') : '';
}

// response 拦截器
service.interceptors.response.use(
    response => {
        const code = response.status
        if (code < 200 || code > 300) {
            notify(response.message, 'error', '异常');
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        let code = 0
        try {
            code = error.response.data.status
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
                notify('网络请求超时', 'error', '失败');
                return Promise.reject(error)
            }
        }
        if (code) {
            if (code === 401) {
                MessageBox.confirm(
                    '登录状态已过期，您可以继续留在该页面，或者重新登录',
                    '系统提示',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('LogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            } else if (code === 403) {
                router.push({ path: '/401' })
            } else {
                const errorMsg = error.response.data.message
                if (errorMsg !== undefined) {
                    notify(errorMsg, 'error', '失败');
                }
            }
        } else {
            notify('接口请求失败', 'error', '失败');
        }
        return Promise.reject(error)
    }
)

export default service;