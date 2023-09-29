<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Cliente</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="clientes"
              @on-cell-click="selectCellCliente"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por um Cliente',
                skipDiacritics: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'end',
                perPageDropdown: [5, 10],
                prevLabel: 'Anterior',
                nextLabel: 'Proximo',
                rowsPerPageLabel: 'Qtd por página',
                ofLabel: 'de',
                pageLabel: 'Pagina', // for 'pages' mode
              }"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'btn'">
                  <a
                    @click="showModalAlterarCliente(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirCliente(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EXCLUIR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-trash-alt"></i>
                  </a>
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
        <div class="card-footer">
          <div class="col-md-12 text-end">
            <div class="col-md-2 offset-md-10">
              <button
                class="btn btn-sm btn-dark"
                @click="ShowModalFormCliente()"
              >
                <i class="bx bx-plus-circle"></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <Modal
      :formulario="form_cliente"
      :functionGetListCliente="getListCliente"
      :funcOnReset="onReset"
    ></Modal>
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import { ServiceCliente } from "../../services/serviceCliente.js";
import Modal from "./Modal.vue";
export default {
  components: { VueGoodTable, Modal },
  props: {
    functionCliente: {
      type: Function,
    },
  },
  data() {
    return {
      modal_form_cliente: "modal_form_cliente",
      isLoading: false,
      clientes: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Cliente",
          field: "cliente",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Telefone",
          field: "telefone",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "WhatsApp",
          field: "whatsapp",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Ações",
          sortable: false,
          field: "btn",
          html: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      form_cliente: {
        id: 0,
        cliente: "",
        apelido: "",
        cpf: "",
        rg: "",
        dataNasc: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cep: "",
        id_cidade: "",
        cidade: "",
        id_condicao: "",
        condicaopg: "",
        whatsapp: "",
        telefone: "",
        email: "",
        senha: "",
        confSenha: "",
        observacao: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false,
        maxCpf: 14,
        maxCep: 9,
        maxWhatsapp: 15,
        maxTelefone: 15,
        maxRg: 9,
      },
    };
  },
  created() {
    this.getListCliente();
  },
  methods: {
    getListCliente() {
      this.isLoading = true;
      ServiceCliente.getAll()
        .then((obj) => {
          if (obj) {
            this.clientes = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCellCliente(params) {
      if (this.functionCliente) {
        this.functionCliente(params);
      }
    },
    showModalAlterarCliente(id) {
      this.onReset();
      var titulo = "Alterar Cliente";
      var btn = "Alterar";
      var disabled = false;
      this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirCliente(id) {
      this.onReset();
      var titulo = "Excluir Cliente";
      var btn = "Excluir";
      var disabled = true;
      this.funcGetById(id, titulo, btn, disabled);
    },
    ShowModalFormCliente() {
      // this.onReset();
      //this.form_cliente.id_condicaopg = '487';
      //this.form_cliente.condicaopg = '30/60/90';
      this.form_cliente.titulo = "Cadastrar Cliente";
      this.form_cliente.btn = "Salvar";
      this.$bvModal.show(this.modal_form_cliente);
    },
    onReset() {
      this.form_cliente.id = "";
      this.form_cliente.cliente = "";
      this.form_cliente.apelido = "";
      this.form_cliente.cpf = "";
      this.form_cliente.ie = "";
      this.form_cliente.rg = "";
      this.form_cliente.dataNasc = "";
      this.form_cliente.logradouro = "";
      this.form_cliente.numero = "";
      this.form_cliente.complemento = "";
      this.form_cliente.bairro = "";
      this.form_cliente.cep = "";
      this.form_cliente.id_cidade = "";
      this.form_cliente.cidade = "";
      this.form_cliente.id_condicao = "";
      this.form_cliente.condicaopg = "";
      this.form_cliente.whatsapp = "";
      this.form_cliente.telefone = "";
      this.form_cliente.email = "";
      this.form_cliente.senha = "";
      this.form_cliente.confSenha = "";
      this.form_cliente.observacao = "";
      this.form_cliente.data_create = "";
      this.form_cliente.data_alt = "";
      this.form_cliente.disabled = false;
    },
    funcGetById(id, titulo, btn, disabled) {
      this.isLoading = true;
      ServiceCliente.getById(id)
        .then((obj) => {
          this.form_cliente.id = obj.data[0].id;
          this.form_cliente.cliente = obj.data[0].cliente;
          this.form_cliente.apelido = obj.data[0].apelido;
          this.form_cliente.cpf = obj.data[0].cpf;
          this.form_cliente.ie = obj.data[0].ie;
          this.form_cliente.rg = obj.data[0].rg;
          this.form_cliente.dataNasc = obj.data[0].dataNasc;
          this.form_cliente.logradouro = obj.data[0].logradouro;
          this.form_cliente.numero = obj.data[0].numero;
          this.form_cliente.complemento = obj.data[0].complemento;
          this.form_cliente.bairro = obj.data[0].bairro;
          this.form_cliente.cep = obj.data[0].cep;
          this.form_cliente.id_cidade = obj.data[0].cidade.id;
          this.form_cliente.cidade = obj.data[0].cidade.cidade;
          this.form_cliente.id_condicao = obj.data[0].condicao_pagemento.id;
          this.form_cliente.condicaopg =
            obj.data[0].condicao_pagemento.condicao_pagamento;
          this.form_cliente.whatsapp = obj.data[0].whatsapp;
          this.form_cliente.telefone = obj.data[0].telefone;
          this.form_cliente.email = obj.data[0].email;
          this.form_cliente.senha = obj.data[0].senha;
          this.form_cliente.confSenha = obj.data[0].confSenha;
          this.form_cliente.observacao = obj.data[0].observacao;
          this.form_cliente.data_create = obj.data[0].data_create;
          this.form_cliente.data_alt = obj.data[0].data_alt;
          this.form_cliente.titulo = titulo;
          this.form_cliente.btn = btn;
          this.form_cliente.disabled = disabled;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_cliente);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
