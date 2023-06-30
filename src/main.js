import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import NProgress from 'vue-nprogress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import Vuelidate from 'vuelidate';
import vueDebounce from 'vue-debounce'
// import VueMask from "v-mask";
import VueMask from 'vue-the-mask';
Vue.use(vueDebounce);
Vue.use(VueMask);
Vue.component('v-select', vSelect)
Vue.use(Vuelidate);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(NProgress)
Vue.use(VueGoodTablePlugin);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')