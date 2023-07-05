<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Produtos</div>
        <div class="card-body">
          <div>
            <vue-good-table
              :columns="columns"
              :rows="produtos"
              @on-cell-click="selectCellProdutos"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por uma Produto',
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
                    @click="showModalAlterarProduto(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirProduto(props.row.id)"
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
                @click="ShowModalFormProduto()"
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
      :formulario="form_produto"
      :functionGetListProduto="getListProduto"
      :funcOnReset="onReset"
    ></Modal>
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import Modal from "./Modal.vue";
import { ServiceProduto } from "../../services/serviceProduto";
export default {
  components: { VueGoodTable, Modal },
  data() {
    return {
      isLoading: false,
      modal_form_produto: "modal_form_produto",
      produtos: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Produto",
          field: "produto",
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
      form_produto: {
        id:null,
        produto: "",
        unidade: "",
        id_categoria: "",
        categoria: "",
        id_fornecedor: "",
        fornecedor: "",
        qtdEstoque: "",
        precoCusto: "",
        precoVenda: "",
        custoUltCompra: "",
        dataUltCompra: "",
        dataUltVenda: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {
    this.getListProduto();
  },
  methods: {
    getListProduto() {
      this.isLoading = true;
      ServiceProduto.getAll()
        .then((obj) => {
          if (obj) {
            this.produtos = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCellProdutos(params) {
      if (this.functionCategorias) {
          this.functionCidade(params);
      }
    },
    showModalAlterarProduto(id) {
      this.onReset();
      this.form_produto.titulo = "Alterar Produto";
      this.form_produto.btn = "Alterar";
      this.funcGetById(id);
    },
    showModalExcluirProduto(id) { 
      this.form_produto.titulo = "Excluir Produto";
      this.form_produto.btn = "Excluir";
      this.form_produto.disabled = true;
      this.funcGetById(id);
    },
    ShowModalFormProduto() {
      this.form_produto.titulo = "Cadastrar Produto";
      this.form_produto.btn = "Salvar";
      this.$bvModal.show(this.modal_form_produto);
    },
    onReset() {
      this.form_produto.id = "";
      this.form_produto.produto = "";
      this.form_produto.unidade = "";
      this.form_produto.id_categoria = "";
      this.form_produto.categoria = "";
      this.form_produto.id_fornecedor = "";
      this.form_produto.fornecedor = "";
      this.form_produto.qtdEstoque = "";
      this.form_produto.precoCusto = "";
      this.form_produto.precoVenda = "";
      this.form_produto.custoUltCompra = "";
      this.form_produto.dataUltCompra = "";
      this.form_produto.dataUltVenda = "";
      this.form_produto.data_create = "";
      this.form_produto.data_alt = "";
      this.form_produto.disabled = false;
    },
    funcGetById(id) {
      this.isLoading = true;
      ServiceProduto.getById(id)
        .then((obj) => {
          const precoCusto = obj.data[0].precoCusto;
          const precoVenda = obj.data[0].precoVenda;
          const custoUltCompra = obj.data[0].custoUltCompra;
          this.form_produto.id = obj.data[0].id;
          this.form_produto.produto = obj.data[0].produto;
          this.form_produto.unidade = obj.data[0].qtdEstoque;
          this.form_produto.id_categoria = obj.data[0].categoria.id;
          this.form_produto.categoria = obj.data[0].categoria.categoria;
          this.form_produto.id_fornecedor = obj.data[0].fornecedor.id;
          this.form_produto.fornecedor = obj.data[0].fornecedor.razaoSocial;
          this.form_produto.qtdEstoque = obj.data[0].qtdEstoque;
          this.form_produto.precoCusto = precoCusto.toFixed(2);
          this.form_produto.precoVenda = precoVenda.toFixed(2);
          this.form_produto.custoUltCompra = custoUltCompra.toFixed(2);
          this.form_produto.dataUltCompra = obj.data[0].dataUltCompra;
          this.form_produto.dataUltVenda = obj.data[0].dataUltVenda;

          this.form_produto.data_create = obj.data[0].data_create;
          this.form_produto.data_alt = obj.data[0].data_alt;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_produto);
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
