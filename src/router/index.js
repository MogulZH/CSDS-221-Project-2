import {createRouter, createWebHistory} from 'vue-router'
// vue-router
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
        // scroll to the top
        return { top: 0 }
      }
})
