<template>
    <div class="container" style="margin-bottom: -90px;">
      <b-overlay :show="isLoading" rounded="sm">
        <div class="card mb-5">
          <div class="card-header">Cadastrar Cidade</div>
          <div class="card-body">
            <div class="">
              <vue-good-table :columns="columns" :rows="cidades" @on-cell-click="selectCellCidade" :search-options="{
                  enabled: true,
                  placeholder: 'Procure por uma Cidade',
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
                    <a @click="showModalAlterarCidade(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                      data-backdrop="static" title="EDITAR" style="background-color: #f0f8ff">
                      <i class="bx bx-edit-alt"></i>
                    </a>
                    <a @click="showModalExcluirCidade(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
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
                <button class="btn btn-sm btn-dark" @click="ShowModalFormCidade()">
                  <i class="bx bx-plus-circle"></i> Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>
      <br /><br />
      <Modal :formulario="form_cidade" :functionGetListCidade="getListCidade"></Modal>
    </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
import { ServiceCidade } from "../../services/serviceCidade";
export default {
  components: { VueGoodTable, Modal },
  props: {
    functionCidade: {
      type: Function,
    },
  },
  data() {
    return {
      modal_form_cidade: "modal_form_cidade",
      isLoading: false,
      cidades: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Cidade",
          field: "cidade",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "DDD",
          field: "ddd",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Estado",
          field: "estado.estado",
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
      form_cidade: {
        id: 0,
        cidade: "",
        ddd: "",
        id_estado: "",
        estado: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false
      },
    };
  },
  created() {
    this.getListCidade();
  },
  methods: {
    selectCellCidade(params) {
      if (this.functionCidade) {
        this.functionCidade(params);
      }
    },
    getListCidade() {
      this.isLoading = true;
      ServiceCidade.getAll()
        .then((obj) => {
          if (obj) {
            this.cidades = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    showModalAlterarCidade(id) {
      var titulo = "Alterar Cidade";
      var btn = "Alterar";
      var disabled = false;
      this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirCidade(id) {
      var titulo = "Excluir Cidade";
      var btn = "Excluir";
      var disabled = true;
      this.funcGetById(id, titulo, btn, disabled);
    },
    ShowModalFormCidade() {
      this.onReset();
      this.form_cidade.titulo = 'Cadastrar Cidade';
      this.form_cidade.btn = 'Salvar';
      this.$bvModal.show(this.modal_form_cidade);
    },
    onReset() {
      this.form_cidade.id = "";
      this.form_cidade.cidade = "";
      this.form_cidade.ddd = "";
      this.form_cidade.id_estado = "";
      this.form_cidade.estado = "";
      this.form_cidade.data_create = "";
      this.form_cidade.data_alt = "";
      this.form_cidade.disabled = false;
    },
    funcGetById(id, titulo, btn, disabled) {
      this.isLoading = true;
      ServiceCidade.getById(id)
        .then(obj => {
          this.onReset();
          this.form_cidade.titulo = titulo;
          this.form_cidade.btn = btn;
          this.form_cidade.id = obj.data[0].id;
          this.form_cidade.cidade = obj.data[0].cidade;
          this.form_cidade.ddd = obj.data[0].ddd;
          this.form_cidade.id_estado = obj.data[0].estado.id;
          this.form_cidade.estado = obj.data[0].estado.estado;
          this.form_cidade.data_create = obj.data[0].data_create;
          this.form_cidade.data_alt = obj.data[0].data_alt;
          this.form_cidade.disabled = disabled;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_cidade);
        }).catch(error => {
          console.log(error)
        })
    }
  }
};
</script>
<style></style>
