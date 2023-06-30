import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import {TokenService} from "../services/storage.service";
import ApiService from '../services/api.service';

const Login = () => import( /* webpackChunkName: "Login" */ "@/components/Login");
const Site = () => import( /* webpackChunkName: "Site" */ "@/components/Site");
const Home = () => import( /* webpackChunkName: "Home" */ "@/components/home/Home");
const Agenda = () => import( /* webpackChunkName: "Agenda" */ "@/components/agenda/Agenda");
const HomePais = () => import( /* webpackChunkName: "Pais" */ "@/components/pais/HomePais");
const HomeEstado = ()=> import( /* webpackChunkName: "Estado" */ "@/components/estado/HomeEstado");
const HomeCidade = ()=> import( /* webpackChunkName: "Cidade" */ "@/components/cidade/HomeCidade");
const HomeFornecedor = ()=> import( /* webpackChunkName: "Fornecedor" */ "@/components/fornecedores/HomeFornecedor");
const HomeCliente = ()=> import( /* webpackChunkName: "Fornecedor" */ "@/components/cliente/HomeCliente");
const HomeCategorias = ()=> import( /* webpackChunkName: "Fornecedor" */ "@/components/categorias/HomeCategorias");
const HomeServico = ()=> import( /* webpackChunkName: "Servico" */ "@/components/servico/HomeServico");
const HomeProfissional = ()=> import( /* webpackChunkName: "Profissional" */ "@/components/profissional/HomeProfissional");
const HomeProduto = ()=> import( /* webpackChunkName: "Produto" */ "@/components/produto/HomeProduto");

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
      label: "Login"
    }
  },
  {
    path: '/',
    name: 'Site',
    component: Site,
    meta: {
      public: true,
      label: "Site"
    }
  },
  {
    path: '/home',
    name: 'Home',
    titulo: 'Home',
    component: Home,
    meta: {
      public: false,
      label: "Home",
    },
    children: [{
        path: '/agenda',
        component: Agenda,
        titulo: 'Agenda Clientes',
        name: 'Agenda',
        meta: {
          public: false,
          label: 'Agenda Clientes',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/pais',
        component: HomePais,
        titulo: 'Cadastro Pais',
        name: 'Pais',
        meta: {
          public: true,
          label: 'Cadastro Pais',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/estado',
        component: HomeEstado,
        titulo: 'Cadastro Estado',
        name: 'Estado',
        meta: {
          public: true,
          label: 'Cadastro Estado',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/cidade',
        component: HomeCidade,
        titulo: 'Cadastro Cidade',
        name: 'Cidade',
        meta: {
          public: true,
          label: 'Cadastro Cidade',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/fornecedores',
        component: HomeFornecedor,
        titulo: 'Cadastro Fornecedores',
        name: 'fornecedores',
        meta: {
          public: true,
          label: 'Cadastro Fornecedores',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/clientes',
        component: HomeCliente,
        titulo: 'Cadastro Clientes',
        name: 'clientes',
        meta: {
          public: true,
          label: 'Cadastro Clientes',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/categorias',
        component: HomeCategorias,
        titulo: 'Cadastro Categorias',
        name: 'categorias',
        meta: {
          public: true,
          label: 'Cadastro Categorias',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/servico',
        component: HomeServico,
        titulo: 'Cadastro Serviços',
        name: 'servico',
        meta: {
          public: true,
          label: 'Cadastro Serviços',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/profissional',
        component: HomeProfissional,
        titulo: 'Cadastro Profissional',
        name: 'profissional',
        meta: {
          public: true,
          label: 'Cadastro Profissional',
          requiresPermission: 'admin'
        }
      },
      {
        path: '/produto',
        component: HomeProduto,
        titulo: 'Cadastro Produto',
        name: 'produto',
        meta: {
          public: true,
          label: 'Cadastro Produto',
          requiresPermission: 'admin'
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  const isPublic = to.matched.some(record => record.meta.public);
  const loggedIn = !!TokenService.getToken();
  ApiService.getInterceptor();
  if (!isPublic && !loggedIn) {
    NProgress.done();
    return next('/')
  }
  NProgress.done();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router