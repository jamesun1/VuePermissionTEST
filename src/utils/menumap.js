import Layout from '../views/layout/Layout'

const _import = require('../router/_import_' + process.env.NODE_ENV)

function obj2menuData(obj) {
    let menuData = new Object()
    if (obj) {
        menuData = {
            path: obj.menuinstanceurl ? obj.menuinstanceurl.substring(obj.menuinstanceurl.lastIndexOf('/') + 1) : '',
            component: obj.menuinstancesrc ? _import(obj.menuinstancesrc) : Layout,
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
            if (obj.zishuju && obj.zishuju.length > 0) {
                let path = obj.zishuju[0].menuinstanceurl.substring(0, obj.zishuju[0].menuinstanceurl.lastIndexOf('/'))
                menuData.path = path
            }
        }
        if (obj.zishuju && obj.zishuju.length > 0) {
            if (obj.zishuju.length === 1) {
                menuData.redirect = obj.zishuju[0].path
            } else {
                menuData.redirect = 'noredirect'
            }
            if (obj.zishuju.length > 0) {
                menuData.children = arrangeApplyMenu(obj.zishuju)
            }
        }

    }
    return menuData
}

export function arrangeApplyMenu(menuData) {
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
}
