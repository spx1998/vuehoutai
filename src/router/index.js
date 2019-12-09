
import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import center from '../components/center'
import menu from "@/components/menu";
import order from "@/components/order";
import owner from "@/components/owner";
import table from "@/components/table";
import user from "@/components/user";
import noAuths from "@/components/noAuths";
import type from "@/components/type";
import stats from "@/components/stats";
Vue.use(Router)
const index = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/',
        redirect:'/login'
    },
    {
        path: '/center',
        name: 'center',
        component: center,
        meta:{
          requireAuth:true,
        },
        children:[
            {
                path:'/noAuths',
                component:noAuths,
                name:'noAuths',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/menu',
                component: menu,
                name:'menu',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/owner',
                component: owner,
                name:'owner',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/order',
                component: order,
                name:'order',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/table',
                component: table,
                name:'table',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/user',
                component: user,
                name:'user',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/type',
                component: type,
                name:'type',
                meta:{
                    requireAuth:true,
                },
            },
            {
                path:'/stats',
                component: stats,
                name:'stats',
                meta:{
                    requireAuth:true,
                },
            },

        ]
    },

]
export default new Router(
    {
        routes: index
})
