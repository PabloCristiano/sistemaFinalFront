<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Compra</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="clientes"
              @on-cell-click="selectCellCompra"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por uma Compra',
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
                    @click="showModalAlterarCompra(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirCompra(props.row.id)"
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
                @click="ShowModalFormCompra()"
              >
                <i class="bx bx-plus-circle"></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <!-- Modal Cadastro Compra -->
    <Modal :formulario="form_compra"></Modal>
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import Modal from "./Modal.vue";
export default {
  components: { VueGoodTable,Modal },
  data() {
    return {
      modal_form_compra: "modal_form_compra",  
      isLoading: false,
      clientes: [],
      columns: [
        {
          label: "Nº Nota",
          field: "numNota",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Série",
          field: "serie",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Modelo",
          field: "modelo",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Fornecedor",
          field: "fornecedor",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Data Emissão",
          field: "fornecedor",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Valor Total",
          field: "fornecedor",
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
      form_compra: {
        titulo: "",
        headerForm:"",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {},
  methods: {
    selectCellCompra(params) {
      if (this.functionEstado) {
        this.functionEstado(params);
      }
    },
    showModalAlterarCompra(id) {
      console.log(id);
      //   this.onReset();
      //   var titulo = "Alterar Cliente";
      //   var btn = "Alterar";
      //   var disabled = false;
      //   this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirCompra(id) {
      console.log(id);
      //   this.onReset();
      //   var titulo = "Excluir Cliente";
      //   var btn = "Excluir";
      //   var disabled = true;
      //   this.funcGetById(id, titulo, btn, disabled);
    },
    ShowModalFormCompra() {
   
      // this.onReset();
      //this.form_cliente.id_condicaopg = '487';
      //this.form_cliente.condicaopg = '30/60/90';
      // <i class='bx bx-cart Text-Card'></i>
      this.form_compra.titulo = "Cadastrar Nova Compra";
      this.form_compra.headerForm = "<span class='Text-Card'>Nova Compra</span>";
      this.form_compra.btn = "Salvar";
      this.$bvModal.show(this.modal_form_compra);
    },
  },
};
</script>
<style>
.Text-Card{
 font-size: 16px;
 font-weight: 500;
}
</style>
