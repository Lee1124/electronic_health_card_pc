import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, logout } from '@/api/login'
import { changeRes } from '@/api/common'
//储存用户信息的状态
const user = {
    state: {
        token: getToken(),//token登录状态
        user: {},//用户信息
        roles: [],//权限列表
        // 第一次加载菜单时用到
        loadMenus: false,
        //是否显示导航菜单
        showNav: false,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_LOAD_MENUS: (state, loadMenus) => {
            state.loadMenus = loadMenus
        },
        SET_NAVSTATE: (state, bool) => {
            state.showNav = bool
        }
    },
    actions: {
        //登录
        login({ commit }, userInfo) {
            const rememberMe = userInfo.rememberMe
            return new Promise((resolve, reject) => {
                login(userInfo.username, userInfo.password).then(data => {
                    let res = changeRes(data);
                    if (res.status === 0) {//登陆成功就存token
                        let token = res.data;
                        setToken(token, rememberMe)
                        commit('SET_TOKEN', token);
                        //获取用户信息
                        this.dispatch('GetInfo');
                        // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
                        commit('SET_LOAD_MENUS', true);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    setUserInfo(res, commit)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登录退出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    logOut(commit)
                    resolve()
                }).catch(error => {
                    logOut(commit)
                    reject(error)
                })
            })
        },
        updateLoadMenus({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_LOAD_MENUS', false)
            })
        },
        //修改导航栏的显示状态
        changeNavState({ commit }, bool) {
            commit('SET_NAVSTATE', bool)
        }
    }
}
export const logOut = (commit) => {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
}
export const setUserInfo = (res, commit) => {
    // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
    if (res.roles) {
        if (res.roles.length === 0) {
            commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
        } else {
            commit('SET_ROLES', res.roles)
        }
    } else {
        commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT', 'del'])
    }
    commit('SET_USER', res.data);
}



export default user;