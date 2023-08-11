import axios from "axios";
import NProgress from 'nprogress'
import router from '../router/index.js';

import {
    TokenService
} from './storage.service';
import {
    Notyf
} from 'notyf';
const notyf = new Notyf({
    duration: 5000,
    position: {
        x: 'center',
        y: 'top',
    },
    types: [{
        type: 'warning',
        background: 'orange',
        icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'warning'
        }
    },
    {
        type: 'error',
        background: 'indianred',
        duration: 5000,
        dismissible: true
    }
    ]
});
const ApiService = {
    _401interceptor: null,
     url: 'http://vmi1033367.contaboserver.net:8085/api/',
     //url: 'http://localhost:8000/api/',
    init(url) {
        axios.defaults.baseURL = url;
        this.url = url;

        axios.interceptors.response.use(response => {
            NProgress.done();
            return response
        })
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`;
    },

    removeHeader() {
        axios.defaults.headers.common = {};
    },

    get(resource) {
        console.log(resource)

        return axios.get(this.url + resource.url)
    },

    getUrl() {
        return this.url;
    },

    post(resource, data) {
        return axios.post(resource, (data))
    },
    put(resource, data) {
        return axios.put(resource, (data))
    },
    delete(resource) {
        return axios.delete(resource)
    },
    customRequest(data) {
        return axios(data)
    },
    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                // console.log(error.request.status == 401);
                NProgress.done();
                if (error.request.status === 403) {
                    notyf.error('Você não tem permissão pra fazer isso');
                    notyf.dismissAll();
                    window.location.href = '/#/';
                    throw error
                }
                // if (error.request.status === 401) {
                //     store.dispatch('auth/logout');
                //     throw error
                // }

                if (error.request.status === 500) {
                    notyf.error("Algo de errado aconteceu");
                    throw error
                }

                if (error.request.status === 0) {
                    notyf.dismissAll();
                    notyf.error('Erro no servidor');
                    throw error
                }

                // If error was not 401 just reject as is
                throw error
            },
            config => {
                NProgress.start();
                return config
            }
        )
    },

    unmount401Interceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    },

    getInterceptor() {
        axios.interceptors.response.use(function (config) {
            return config;
        }, (error) => {
            // if (error.message == 'Network Error') {
            //   notyf.error('Servidor Desconectado');
            //   router.push({
            //     name: 'login'
            //   });
            // }
            if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
                console.log("enviar para o refresh");
                router.push({
                    name: 'Login'
                });
            }
            if (error.response.statusText === 'Unauthorized') {
                console.log("enviar para o refresh");
                router.push({
                    name: 'Login'
                });
            }
            if (error.response.status === 401 && error.response.data.message === 'Wrong number of segments') {
                console.log("enviar para o refresh");
                router.push({
                    name: 'Login'
                });
            }
            return Promise.reject(error);
        });
    },

    getUser(){
        
        return axios.post(this.url + 'v1/me')
    }

};
export default ApiService