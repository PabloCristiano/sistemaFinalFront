<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Compra</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="compra"
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
                    @click="showCompra(props.row)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="VISUALIZAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-clipboard"></i>
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
    <!-- <Modal :formulario="form_compra"></Modal> -->
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
// import Modal from "./Modal.vue";
import { ServiceCompra } from "@/services/serviceCompra";
import {
  currency,
  formatarDataParaPtBR,
} from "../../rules/filters";
export default {
  components: { VueGoodTable },
  data() {
    return {
      modal_form_compra: "modal_form_compra",
      isLoading: false,
      compra: [],
      columns: [
        {
          label: "Nº Nota",
          field: "numero_nota",
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
          label: "Série",
          field: "serie",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Fornecedor",
          field: "fornecedor.razaoSocial",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Data Emissão",
          field: "data_emissao",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Valor Total",
          field: "valor_compra",
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
        headerForm: "",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {
    this.getListCompra();
  },
  methods: {
    getListCompra() {
      this.isLoading = true;
      ServiceCompra.getAll()
        .then((obj) => {
          if (obj) {
            if (obj) {
              obj.map(function (obj) {
                obj.valor_compra = currency(obj.valor_compra);
                obj.data_emissao = formatarDataParaPtBR(obj.data_emissao);
                return obj;
              });
            }
            this.compra = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCellCompra(params) {
      if (this.functionEstado) {
        this.functionEstado(params);
      }
    },
    showCompra(row) {
      this.$router.push({
        name: "adicionarCompra",
        params: { formulario: row },
      });
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
      // Modal
      this.form_compra.titulo = "Cadastrar Nova Compra";
      this.form_compra.headerForm =
        "<span class='Text-Card'>Nova Compra</span>";
      this.form_compra.disabled = false;
      this.form_compra.btn = "Salvar";
      //this.$bvModal.show(this.modal_form_compra);
      this.$router.push({
        name: "adicionarCompra",
        params: { formulario: this.form_compra },
      });
    },
  },
};
</script>
<style>
.Text-Card {
  font-size: 16px;
  font-weight: 500;
}
</style>
