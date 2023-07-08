<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Forma de Pagamento</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="formaPagamentos"
              @on-cell-click="selectCellFormaPagamento"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por uma Forma de Pagamento',
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
                    @click="showModalAlterarFormaPagamento(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirFormaPagamento(props.row.id)"
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
                @click="ShowModalFormFormaPagamento()"
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
      :formulario="form_formaPagamento"
      :funcOnReset="onReset"
      :funcgetListFormaPagamento="getListFormaPagamento"
    ></Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
import { ServiceFormaPagamento } from "../../services/serviceFormaPagamento.js";
export default {
  components: { VueGoodTable, Modal },
  props: {
    functionFormaPagamento: {
      type: Function,
    },
  },
  data() {
    return {
      modal_form_formaPagamento: "modal_form_formaPagamento",
      isLoading: false,
      formaPagamentos: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Forma de Pagamento",
          field: "forma_pg",
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
      form_formaPagamento: {
        id: "",
        forma_pg: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {
    this.getListFormaPagamento();
  },
  methods: {
    selectCellFormaPagamento(params) {
      if (this.functionFormaPagamento) {
        this.functionFormaPagamento(params);
      }
    },
    getListFormaPagamento() {
      this.isLoading = true;
      ServiceFormaPagamento.getAll()
        .then((obj) => {
          if (obj) {
            this.formaPagamentos = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ShowModalFormFormaPagamento() {
      this.onReset();
      this.form_formaPagamento.titulo = "Cadastrar Forma de Pagamento";
      this.form_formaPagamento.btn = "Salvar";
      this.$bvModal.show(this.modal_form_formaPagamento);
    },
    showModalAlterarFormaPagamento(id) {
      this.onReset();
      var titulo = "Alterar Forma de Pagamento";
      var btn = "Alterar";
      var disabled = false;
      this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirFormaPagamento(id) {
      this.onReset();
      var titulo = "Excluir Forma de Pagamento";
      var btn = "Excluir";
      var disabled = true;
      this.funcGetById(id, titulo, btn, disabled);
    },
    onReset() {
      this.form_formaPagamento.id = "";
      this.form_formaPagamento.forma_pg = "";
      this.form_formaPagamento.data_create = "";
      this.form_formaPagamento.data_alt = "";
      this.form_formaPagamento.disabled = false;
    },
    funcGetById(id, titulo, btn, disabled) {
      this.isLoading = true;
      ServiceFormaPagamento.getById(id)
        .then((obj) => {
          this.form_formaPagamento.id = obj.data[0].id;
          this.form_formaPagamento.forma_pg = obj.data[0].forma_pg;
          this.form_formaPagamento.data_create = obj.data[0].data_create;
          this.form_formaPagamento.data_alt = obj.data[0].data_alt;
          this.form_formaPagamento.titulo = titulo;
          this.form_formaPagamento.btn = btn;
          this.form_formaPagamento.disabled = disabled;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_formaPagamento);
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
