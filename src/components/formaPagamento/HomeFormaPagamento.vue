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
                    @click="showModalAlterarFormaPagamento()"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirFormaPagamento()"
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
    ></Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
export default {
  components: { VueGoodTable, Modal },
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
  created() {},
  methods: {
    selectCellFormaPagamento(params) {
      if (this.functionEstado) {
        this.functionEstado(params);
      }
    },
    ShowModalFormFormaPagamento() {
         this.onReset();
         this.form_formaPagamento.titulo = "Cadastrar Forma de Pagamento";
         this.form_formaPagamento.btn = "Salvar";
         this.form_formaPagamento.nome_modal = "Show_Modal";
         this.$bvModal.show(this.modal_form_formaPagamento);
    },
    showModalAlterarFormaPagamento() {
      //   this.isLoading = true;
      //   ServiceEstado.getById(id)
      //     .then((obj) => {
      //       this.onReset();
      //       this.form_formaPagamento.titulo = "Alterar Forma de Pagamento";
      //       this.form_formaPagamento.btn = "Alterar";
      //       this.form_formaPagamento.id = obj.data[0].id;
      //       this.form_formaPagamento.estado = obj.data[0].estado;
      //       this.form_formaPagamento.uf = obj.data[0].uf;
      //       this.form_formaPagamento.id_pais = obj.data[0].pais.id;
      //       this.form_formaPagamento.pais = obj.data[0].pais.pais;
      //       this.form_formaPagamento.data_create = obj.data[0].data_create;
      //       this.form_formaPagamento.data_alt = obj.data[0].data_alt;
      //       this.isLoading = false;
      //       this.$bvModal.show(this.modal_form_formaPagamento);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    },
    showModalExcluirFormaPagamento() {
      //   this.isLoading = true;
      //   ServiceEstado.getById(id)
      //     .then((obj) => {
      //       this.onReset();
      //       this.form_formaPagamento.titulo = "Excluir Forma de Pagamento";
      //       this.form_formaPagamento.btn = "Excluir";
      //       this.form_formaPagamento.id = obj.data[0].id;
      //       this.form_formaPagamento.estado = obj.data[0].estado;
      //       this.form_formaPagamento.uf = obj.data[0].uf;
      //       this.form_formaPagamento.id_pais = obj.data[0].pais.id;
      //       this.form_formaPagamento.pais = obj.data[0].pais.pais;
      //       this.form_formaPagamento.data_create = obj.data[0].data_create;
      //       this.form_formaPagamento.data_alt = obj.data[0].data_alt;
      //       this.form_formaPagamento.disabled = true;
      //       this.isLoading = false;
      //       this.$bvModal.show(this.modal_form_formaPagamento);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    },
    onReset() {
      this.form_formaPagamento.id = "";
      this.form_formaPagamento.forma_pg = "";
      this.form_formaPagamento.data_create = "";
      this.form_formaPagamento.data_alt = "";
      this.form_formaPagamento.disabled = false;
    },
  },
};
</script>
<style></style>
