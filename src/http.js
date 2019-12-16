import axios from 'axios';
import router from './router';

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = '/api';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const status=response.status;
        if (status === 403) {
            router.replace('/');
        }
        return response;
    },
    error => {
        if(error.response.status===403){
            //TODO: 上线需修改
            if("http://39.106.81.211:8888/admin/list"===error.response.request.responseURL){
                router.replace('/noAuths');
            }else
                router.replace('/');
        }
        return Promise.reject(error);
    }
);



export default axios;
