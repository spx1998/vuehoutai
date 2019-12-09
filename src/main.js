import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import $ from 'jquery'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import el from "element-ui/src/locale/lang/el";

import http from './http';  //此处问http文件的路径
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){
        if(sessionStorage.getItem("token")){
            next();
        }else{
            next({
                path:'/login',
            })
        }
    }else {
        next();
    }
});


