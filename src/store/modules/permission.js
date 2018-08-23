import { asyncRouterMap, constantRouterMap } from '@/router'
import { arrangeApplyMenu } from '@/utils/menumap'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

var router = [{
  "childMenus": [
    {
      "menuinstanceicon": "icon",
      "menuinstanceid": "d7259f04-b076-454b-b21d-a5f701f766c0",
      "menuinstancename": "图标",
      "menuinstanceorderno": 1,
      "menuinstanceparent": "de5666fd-77ca-482e-a3d7-1074f2033398",
      "menuinstancescript": "svg-icons/index",
      "menuinstanceurl": "/svg-icons/index"
    }
  ],
  "menuinstanceid": "de5666fd-77ca-482e-a3d7-1074f2033398",
  "menuinstancename": "图标",
  "menuinstanceorderno": 1
}]

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        debugger;
        // const { roles } = data
        // let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        let accessedRouters = arrangeApplyMenu(router);
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
