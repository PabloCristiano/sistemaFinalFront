<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ul class="nav-links">
      <li>
        <router-link :to="{path:'/dashboard'}">
          <i class="bx bx-grid-alt"></i>
          <span class="link_name">Painel</span>
        </router-link>
        <ul class="sub-menu blank" >
          <li><router-link :to="{path:'/dashboard'}">Dashboard</router-link></li>
        </ul>
      </li>
      <li>
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-calendar'></i>
            <span class="link_name">Agenda</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Agenda</a></li>
          <li><router-link :to="{path:'/agenda'}">Agendamento</router-link></li>
          <li><router-link :to="{path:'/homeagendamento'}">Criar Agenda</router-link></li>
          <li><router-link :to="{path:'/agendaprofissional'}">Agenda Profisional</router-link></li>
        </ul>
      </li>
      <li  v-if="data.isUser !== 'false' ? false : true">
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-spreadsheet' ></i>
            <span class="link_name">Cadastro</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Cadastro</a></li>
          <li><router-link :to="{path:'/clientes'}">Clientes</router-link></li>
          <li><router-link :to="{path:'/servico'}">Serviços</router-link></li>
          <li><router-link :to="{path:'/profissional'}">Profissional</router-link></li>
          <li><router-link :to="{path:'/produto'}">Produtos</router-link></li>
          <li><router-link :to="{path:'/categorias'}">Categorias</router-link></li>
          <li><router-link :to="{path:'/fornecedores'}">Fornecedor</router-link></li>
          <li><router-link :to="{path:'/cidade'}">Cidade</router-link></li>
          <li><router-link :to="{path:'/estado'}">Estado</router-link></li>
          <li><router-link :to="{path:'/pais'}">Pais</router-link></li>
        </ul>
      </li>
      <li v-if="data.isUser !== 'false' ? false : true">
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-wallet'></i>
            <span class="link_name">Financeiro</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Financeiro</a></li>
          <li><router-link :to="{path:'/formapagamento'}">Forma de Pagamento</router-link></li>
          <li><router-link :to="{path:'/condicaopagamento'}">Condição de Pagamento</router-link></li>
          <li><router-link :to="{path:'/financeiro/contaspagar'}">Contas a Pagar</router-link></li>
        </ul>
      </li>
      <li v-if="data.isUser !== 'false' ? false : true">
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-cart-alt'></i>
            <span class="link_name">Comercial</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Comercial</a></li>
          <li><router-link :to="{path:'/compra'}">Compra</router-link></li>
          <li><a class="" href="#">Venda</a></li>
        </ul>
      </li>
      <!-- <li>
        <a href="#">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="link_name">Analytics</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Analytics</a></li>
        </ul>
      </li> -->
      <!-- <li>
        <a href="#">
          <i class="bx bx-line-chart"></i>
          <span class="link_name">Chart</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Chart</a></li>
        </ul>
      </li> -->
      <!-- <li>
        <div class="iocn-link">
          <a href="#">
            <i class="bx bx-plug"></i>
            <span class="link_name">Plugins</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Plugins</a></li>
          <li><a href="#">UI Face</a></li>
          <li><a href="#">Pigments</a></li>
          <li><a href="#">Box Icons</a></li>
        </ul>
      </li> -->
      <!-- <li>
        <a href="#">
          <i class="bx bx-compass"></i>
          <span class="link_name">Explore</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Explore</a></li>
        </ul>
      </li> -->
      <!-- <li>
        <a href="#">
          <i class="bx bx-history"></i>
          <span class="link_name">History</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">History</a></li>
        </ul>
      </li> -->
      <li>
        <a href="#">
          <i class="bx bx-cog"></i>
          <span class="link_name">Configuração</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Configuração</a></li>
        </ul>
      </li>
      <li>
        <div class="profile-details">
          <div class="profile-content">
          </div>
          <div class="name-job">
            <div class="profile_name">{{ this.data.nome }}</div>
            <!-- <div class="job">{{data.isUser !== 'false' ? 'Cliente' : 'Usuário'}}</div> -->
          </div>
          <i class="bx bx-log-out" @click.prevent="sair()"></i>
        </div>
      </li>
      
    </ul>
</template>
<script>
import {UserService} from '../../services/user.service';
import { TokenService } from '../../services/storage.service'

export default {
  components: {  },
    data() {
        return {
          data : {
            nome : '',
            email : '',
            isUser : false,
          }
        };
    },
    created(){
      this.getUsuario();
    },
    methods: {
        sair() {
          UserService.logout();
        },
        getUsuario (){
           var data =  TokenService.getUser();
           this.data.nome = data.Nome;
           this.data.email = data.Email;
           this.data.isUser = data.isUser;
        }
    },
};
</script>

<style scoped>

</style>