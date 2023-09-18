<template>
  <div class="container" style="margin-bottom: -90px;">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Profissionais</div>
        <div class="card-body">
          <div>
            <vue-good-table :columns="columns" :rows="profissionais" @on-cell-click="selectCellProfissional"
              :search-options="{
                  enabled: true,
                  placeholder: 'Procure por um Profissional',
                  skipDiacritics: true,
                }" :pagination-options="{
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
    }">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'btn'">
                  <a @click="showModalAlterarProfissional(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                    data-backdrop="static" title="EDITAR" style="background-color: #f0f8ff">
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a @click="showModalExcluirProfissional(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                    data-backdrop="static" title="EXCLUIR" style="background-color: #f0f8ff">
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
              <button class="btn btn-sm btn-dark" @click="ShowModalFormProfissional()">
                <i class="bx bx-plus-circle"></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <Modal :formulario="form_Profissional" :functionGetListProfissional="getListProfissionais" :funcOnReset="onReset">
    </Modal>
  </div>
</template>
<script>
import { ServiceProfissional } from "../../services/serviceProfissional";
import { VueGoodTable } from "vue-good-table";
import Modal from "./Modal.vue";
export default {
  components: { VueGoodTable, Modal },
  data() {
    return {
      modal_form_profisional: "modal_form_profisional",
      isLoading: false,
      profissionais: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Profissional",
          field: "profissional",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Tipo Profissional",
          field: "tipoProf",
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
      form_Profissional: {
        id: 0,
        profissional: "",
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
        whatsapp: "",
        telefone: "",
        email: "",
        senha: "",
        confSenha: "",
        tipoProf: "",
        qtd_servico: 0,
        servico: [],
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
        radio: false,
      },
    };
  },
  created() {
    this.getListProfissionais();
  },
  methods: {
    selectCellProfissional(params) {
      console.log(params.rowIndex);
      // if (this.functionCategorias) {
      //     this.functionCidade(params);
      // }
    },
    getListProfissionais() {
      this.isLoading = true;
      ServiceProfissional.getAll()
        .then((obj) => {
          if (obj) {
            this.profissionais = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showModalAlterarProfissional(id) {
      this.onReset();
      this.form_Profissional.titulo = "Alterar Profissional";
      this.form_Profissional.btn = "Alterar";
      this.funcGetById(id);
    },
    showModalExcluirProfissional(id) {
      this.form_Profissional.titulo = "Excluir Profissional";
      this.form_Profissional.btn = "Excluir";
      this.form_Profissional.disabled = true;
      this.funcGetById(id);
    },
    ShowModalFormProfissional() {
      this.onReset();
      this.form_Profissional.titulo = "Cadastrar Profissional";
      this.form_Profissional.btn = "Salvar";
      this.$bvModal.show(this.modal_form_profisional);
    },
    onReset() {
      this.form_Profissional.id = "";
      this.form_Profissional.profissional = "";
      this.form_Profissional.apelido = "";
      this.form_Profissional.cpf = "";
      this.form_Profissional.rg = "";
      this.form_Profissional.dataNasc = "";
      this.form_Profissional.logradouro = "";
      this.form_Profissional.numero = "";
      this.form_Profissional.complemento = "";
      this.form_Profissional.bairro = "";
      this.form_Profissional.cep = "";
      this.form_Profissional.id_cidade = "";
      this.form_Profissional.cidade = "";
      this.form_Profissional.whatsapp = "";
      this.form_Profissional.telefone = "";
      this.form_Profissional.email = "";
      this.form_Profissional.senha = "";
      this.form_Profissional.confSenha = "";
      this.form_Profissional.servico = [];
      this.form_Profissional.tipoProf = "";
      this.form_Profissional.data_create = "";
      this.form_Profissional.data_alt = "";
      this.form_Profissional.disabled = false;
    },
    funcGetById(id) {
      this.isLoading = true;
      ServiceProfissional.getById(id)
        .then(obj => {
          this.form_Profissional.id = obj.data[0].id;
          this.form_Profissional.profissional = obj.data[0].profissional;
          this.form_Profissional.apelido = obj.data[0].apelido;
          this.form_Profissional.cpf = obj.data[0].cpf;
          this.form_Profissional.rg = obj.data[0].rg;
          this.form_Profissional.dataNasc = obj.data[0].dataNasc;
          this.form_Profissional.logradouro = obj.data[0].logradouro;
          this.form_Profissional.numero = obj.data[0].numero;
          this.form_Profissional.complemento = obj.data[0].complemento;
          this.form_Profissional.bairro = obj.data[0].bairro;
          this.form_Profissional.cep = obj.data[0].cep;
          this.form_Profissional.id_cidade = obj.data[0].Cidade.id;
          this.form_Profissional.cidade = obj.data[0].Cidade.cidade;
          this.form_Profissional.whatsapp = obj.data[0].whatsapp;
          this.form_Profissional.telefone = obj.data[0].telefone;
          this.form_Profissional.email = obj.data[0].email;
          this.form_Profissional.senha = obj.data[0].senha;
          this.form_Profissional.confSenha = obj.data[0].senha;
          this.form_Profissional.tipoProf = obj.data[0].tipoProf;
          this.form_Profissional.servico = obj.data[0].servico;
          this.form_Profissional.data_create = obj.data[0].data_create;
          this.form_Profissional.data_alt = obj.data[0].data_alt;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_profisional);
          return
        }).catch(error => {
          console.log(error)
        })
    },
  },
};
</script>
<style></style>
