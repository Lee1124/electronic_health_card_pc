import request from '@/utils/request'

// export function getMenusTree() {
//   return request({
//     url: 'api/menus/tree',
//     method: 'get'
//   })
// }

export function buildMenus() {
  // return request({
  //   url: 'api/menus/build',
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => {
    let menus = [
      {
        alwaysShow: false,
        redirect: "noredirect",
        component: 'Layout',
        hidden: false,
        meta: { title: "", icon: "peoples", noCache: true },
        name: "注册用户统计",
        path: "/users",
        children: [
          {
            component: "users/index",
            hidden: false,
            meta: { title: "注册用户统计", icon: "peoples", noCache: true },
            name: "users",
            path: "users",
          }
        ]
      },
      {
        alwaysShow: false,
        redirect: "noredirect",
        component: 'Layout',
        hidden: false,
        meta: { title: "", icon: "yingxiao", noCache: true },
        name: "用卡数据统计",
        path: "/cards",
        children: [
          {
            component: "cards/index",
            hidden: false,
            meta: { title: "用卡数据统计", icon: "yingxiao", noCache: true },
            name: "cards",
            path: "cards",
          }
        ]
      },
      {
        alwaysShow: false,
        redirect: "noredirect",
        component: 'Layout',
        hidden: false,
        meta: { title: "", icon: "monitor", noCache: true },
        name: "医疗机构查询",
        path: "/orgs",
        children: [
          {
            component: "orgs/index",
            hidden: false,
            meta: { title: "医疗机构查询", icon: "monitor", noCache: true },
            name: "orgs",
            path: "orgs",
          }
        ]
      },
      {
        alwaysShow: false,
        redirect: "noredirect",
        component: 'Layout',
        hidden: false,
        meta: { title: "", icon: "dailyData", noCache: true },
        name: "每日数据统计",
        path: "/dailyData",
        children: [
          {
            component: "dailyData/index",
            hidden: false,
            meta: { title: "每日数据统计", icon: "dailyData", noCache: true },
            name: "dailyData",
            path: "dailyData",
          }
        ]
      }
    ]
    resolve(menus)
  })
}

// export function add(data) {
//   return request({
//     url: 'api/menus',
//     method: 'post',
//     data
//   })
// }

// export function del(ids) {
//   return request({
//     url: 'api/menus',
//     method: 'delete',
//     data: ids
//   })
// }

// export function edit(data) {
//   return request({
//     url: 'api/menus',
//     method: 'put',
//     data
//   })
// }

// export default { add, edit, del, getMenusTree }
