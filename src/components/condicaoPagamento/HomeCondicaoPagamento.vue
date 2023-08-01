<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Condição de Pagamento</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="condicaoPagamentos"
              @on-cell-click="selectCellCondidaoPagamento"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por uma Condição de Pagamento',
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
                    @click="showModalAlterarCondicaoPagamento(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluirCondicaoPagamento(props.row.id)"
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
                @click="ShowModalCondicaoPagamento()"
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
      :formulario="form_CondicaoPagamento"
      :funcOnReset="onReset"
      :funcgetListCondicaoPagamento="getListCondicaoPagamento"
    ></Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
import { ServiceCondicaoPagamento } from "@/services/serviceCondicaoPagamento";
export default {
  components: { VueGoodTable, Modal },
  data() {
    return {
      modal_form_condicaoPagamento: "modal_form_condicaoPagamento",
      isLoading: false,
      condicaoPagamentos: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Condição de Pagamento",
          field: "condicao_pagamento",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Juros",
          field: "juros",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Multa",
          field: "multa",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Desconto",
          field: "desconto",
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
      form_CondicaoPagamento: {
        id: "",
        condicao_pagamento: "",
        juros: "",
        multa: "",
        desconto: "",
        totalPorcentagem: 0,
        qtd_parcela: 0,
       parcelas: [
          {
            parcela: 1,
            prazo: 0,
            porcentagem: 0,
            formaPagamento: [
              {
                id: "",
                forma_pg: "",
                data_create: "",
                data_alt: "",
              },
            ],
            editing: false,
            mgsPrazo: false,
            mgsPorcentagem: false,
            desativar: true,
          },
        ],
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {
    this.getListCondicaoPagamento();
  },
  methods: {
    selectCellCondidaoPagamento(params) {
      if (this.functionEstado) {
        this.functionEstado(params);
      }
    },
    getListCondicaoPagamento() {
      this.isLoading = true;
      ServiceCondicaoPagamento.getAll()
        .then((obj) => {
          if (obj) {
            console.log(obj);
            this.condicaoPagamentos = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ShowModalCondicaoPagamento() {
      this.onReset();
      this.form_CondicaoPagamento.titulo = "Cadastrar Condição de Pagamento";
      this.form_CondicaoPagamento.btn = "Salvar";
      this.$bvModal.show(this.modal_form_condicaoPagamento);
    },
    showModalAlterarCondicaoPagamento(id) {
      this.onReset();
      var titulo = "Alterar Condição de Pagamento";
      var btn = "Alterar";
      var disabled = false;
      this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirCondicaoPagamento(id) {
      this.onReset();
      var titulo = "Excluir Condição de Pagamento";
      var btn = "Excluir";
      var disabled = true;
      this.funcGetById(id, titulo, btn, disabled);
    },
    onReset() {
      this.form_CondicaoPagamento.id = "";
      this.form_CondicaoPagamento.condicao_pagamento = "";
      this.form_CondicaoPagamento.juros = "";
      this.form_CondicaoPagamento.multa = "";
      this.form_CondicaoPagamento.desconto = "";
      this.form_CondicaoPagamento.totalPorcentagem = 0;
      this.form_CondicaoPagamento.qtd_parcela = 0;
      this.form_CondicaoPagamento.parcelas = [];
      this.form_CondicaoPagamento.data_create = "";
      this.form_CondicaoPagamento.data_alt = "";
      this.form_CondicaoPagamento.disabled = false;
    },
    funcGetById(id, titulo, btn, disabled) {
      this.isLoading = true;
      ServiceCondicaoPagamento.getById(id)
        .then((obj) => {
          // console.log("funcGetById", obj);
          this.form_CondicaoPagamento.id = obj.data[0].id;
          this.form_CondicaoPagamento.condicao_pagamento =
            obj.data[0].condicao_pagamento;
          this.form_CondicaoPagamento.juros = obj.data[0].juros;
          this.form_CondicaoPagamento.multa = obj.data[0].multa;
          this.form_CondicaoPagamento.desconto = obj.data[0].desconto;
          this.form_CondicaoPagamento.qtd_parcela = obj.data[0].qtd_parcela;
          this.form_CondicaoPagamento.data_create = obj.data[0].data_create;
          this.form_CondicaoPagamento.data_alt = obj.data[0].data_alt;
          this.form_CondicaoPagamento.titulo = titulo;
          this.form_CondicaoPagamento.btn = btn;
          this.form_CondicaoPagamento.disabled = disabled;
          obj.data[0].parcelas = obj.data[0].parcelas.map((elemento) => {
            return {
              ...elemento,
              editing: false,
              mgsPrazo: false,
              mgsPorcentagem: false,
              desativar: true,
            };
          });
          this.form_CondicaoPagamento.parcelas = obj.data[0].parcelas;
          this.form_CondicaoPagamento.totalPorcentagem = this.funcCalcPercent(obj.data[0].parcelas);
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_condicaoPagamento);
          if(btn === "Excluir" ){
            this.form_CondicaoPagamento.parcelas.map((e)=>{
              e.desativar = false;
            })
          }
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    funcCalcPercent(obj){
      var total = 0;
     obj.map((el)=>{
      total = total + el.porcentagem
     })
     return  total; 
    }
  },
};
</script>
<style></style>
