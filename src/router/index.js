import {createRouter, createWebHistory} from 'vue-router'
// vue-router使用
export default createRouter({
    'history':createWebHistory(),
    'routes':[
        {
            path:"/",
            redirect:"index"
        },
        {
            path:'/index',
            name:'index',
            component: ()=>import("../pages/index.vue")
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        // 滚动到顶部
        return { top: 0 }
      }
})
