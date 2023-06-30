<template>
  <div class="container" style="margin-bottom: -90px;">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Estado</div>
        <div class="card-body">
          <div class="">
            <vue-good-table :columns="columns" :rows="estados" @on-cell-click="selectCellEstado" :search-options="{
                enabled: true,
                placeholder: 'Procure por um Estado',
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
                  <a @click="showModalAlterarEstado(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                    data-backdrop="static" title="EDITAR" style="background-color: #f0f8ff">
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a @click="showModalExcluirEstado(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
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
              <button class="btn btn-sm btn-dark" @click="ShowModalFormEstado()">
                <i class="bx bx-plus-circle"></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <Modal :formulario="this.form_estado" :functionGetList="getList"></Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
import { ServiceEstado } from "../../services/serviceEstado";
export default {
  components: { VueGoodTable, Modal },
  props: {
    functionEstado: {
      type: Function,
    },
  },
  data() {
    return {
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_estado: "modal_form_estado",
      isLoading: false,
      estados: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Estado",
          field: "estado",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "UF",
          field: "uf",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "País",
          field: "pais.pais",
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
      form_estado: {
        id: 0,
        estado: "",
        uf: "",
        id_pais: "",
        pais: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    selectCellEstado(params) {
      if (this.functionEstado) {
        this.functionEstado(params);
      }
    },
    getList() {
      this.isLoading = true;
      ServiceEstado.getAll()
        .then((obj) => {
          if (obj) {
            this.estados = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        })

    },
    ShowModalFormEstado() {
      this.onReset();
      this.form_estado.titulo = "Cadastrar Estado";
      this.form_estado.btn = "Salvar";
      this.form_estado.nome_modal = "Show_Modal";
      this.$bvModal.show(this.modal_form_estado);
    },
    showModalAlterarEstado(id) {
      this.isLoading = true;
      ServiceEstado.getById(id)
        .then(obj => {
          this.onReset();
          this.form_estado.titulo = "Alterar Estado";
          this.form_estado.btn = "Alterar";
          this.form_estado.id = obj.data[0].id;
          this.form_estado.estado = obj.data[0].estado;
          this.form_estado.uf = obj.data[0].uf;
          this.form_estado.id_pais = obj.data[0].pais.id;
          this.form_estado.pais = obj.data[0].pais.pais;
          this.form_estado.data_create = obj.data[0].data_create;
          this.form_estado.data_alt = obj.data[0].data_alt;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_estado);
        }).catch(error => {
          console.log(error)
        })
    },
    showModalExcluirEstado(id) {
      this.isLoading = true;
      ServiceEstado.getById(id)
        .then(obj => {
          this.onReset();
          this.form_estado.titulo = "Excluir Estado";
          this.form_estado.btn = "Excluir";
          this.form_estado.id = obj.data[0].id;
          this.form_estado.estado = obj.data[0].estado;
          this.form_estado.uf = obj.data[0].uf;
          this.form_estado.id_pais = obj.data[0].pais.id;
          this.form_estado.pais = obj.data[0].pais.pais;
          this.form_estado.data_create = obj.data[0].data_create;
          this.form_estado.data_alt = obj.data[0].data_alt;
          this.form_estado.disabled = true;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_estado);
        }).catch(error => {
          console.log(error)
        })
    },
    closed() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_estado);
    },
    onReset() {
      this.form_estado.id = "";
      this.form_estado.estado = "";
      this.form_estado.uf = "";
      this.form_estado.id_pais = "";
      this.form_estado.pais = "";
      this.form_estado.data_create = "";
      this.form_estado.data_alt = "";
      this.form_estado.disabled = false;
    },
  },
};
</script>
<style></style>
