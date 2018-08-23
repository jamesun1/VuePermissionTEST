import Layout from '../views/layout/Layout'

const _import = require('../router/_import_' + process.env.NODE_ENV)

function obj2menuData(obj) {
    let menuData = new Object()
    if (obj) {
        menuData = {
            path: obj.menuinstanceurl ? obj.menuinstanceurl.substring(obj.menuinstanceurl.lastIndexOf('/') + 1) : '',
            component: obj.menuinstancescript ? _import(obj.menuinstancescript) : Layout,
            name: obj.menuinstanceid,
            meta: {
                title: obj.menuinstancename,
                icon: obj.menuinstanceicon
            },
            hidden: false,
        }
        // if (obj.menuinstancevisble) {
        //     menuData.hidden = !obj.menuinstancevisble
        // }
        if (menuData.path === '') {
            // debugger
            if (obj.childMenus && obj.childMenus.length > 0) {
                let path = obj.childMenus[0].menuinstanceurl.substring(0, obj.childMenus[0].menuinstanceurl.lastIndexOf('/'))
                menuData.path = path
            }
        }
        if (obj.childMenus && obj.childMenus.length > 0) {
            if (obj.childMenus.length === 1) {
                menuData.redirect = obj.childMenus[0].path
            } else {
                menuData.redirect = 'noredirect'
            }
            if (obj.childMenus.length > 0) {
                menuData.children = arrangeApplyMenu(obj.childMenus)
            }
        }

    }
    return menuData
}

export function arrangeApplyMenu(menuData) {
    debugger;
    let menumap = []
    if (menuData && menuData.length > 0) {
        menuData.forEach(element => {
            // obj2menuData(element)
            menumap.push(obj2menuData(element))
        });

    }
    console.log('**************************')
    console.log(menumap)
    return menumap

    // console.log('111111111111')
    // let menuMap = new Array()
    // menuMap.push({
    //   path: '/personalCenter',
    //   component: Layout,
    //   redirect: 'noredirect',
    //   name: 'personalCenter',
    //   menuKey: 'personalCenter',
    //   meta: {
    //     title: '个人中心',
    //     icon: 'user_parent'
    //   },
    //   hidden: true,
    //   children: [
    //     { path: 'personalData', component: _import('personalCenter/personalData'), name: 'personalData', meta: { title: '个人资料', icon: 'user_zl' }},
    //     { path: 'headSetting', component: _import('image-editor/image-editor'), name: 'headSetting', meta: { title: '头像设置', icon: 'user_head' }},
    //     { path: 'personalInfoSetting', component: _import('personalCenter/personalInfoSetting'), name: 'personalInfoSetting', meta: { title: '消息设置', icon:'user_xxsz' }}
    //   ]
    // })
    // console.log('222222222222')
    // console.log(menuMap)
}
