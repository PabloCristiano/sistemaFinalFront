<template>
  <div>
    <div class="container" style="margin-bottom: -90px;">
      <b-overlay :show="isLoading" rounded="sm">
        <div class="card mb-5">
          <div class="card-header">Cadastrar Serviço</div>
          <div class="card-body">
            <div class="">
              <vue-good-table
                :columns="columns"
                :rows="servico"
                @on-cell-click="selectCellServico"
                :search-options="{
                  enabled: true,
                  placeholder: 'Procure por um Serviço',
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
                      @click="showModalAlterarServico(props.row.id)"
                      size="sm"
                      class="btn btn-sm me-1 mb-1"
                      data-backdrop="static"
                      title="EDITAR"
                      style="background-color: #f0f8ff"
                    >
                      <i class="bx bx-edit-alt"></i>
                    </a>
                    <a
                      @click="showModalExcluirServico(props.row.id)"
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
        :formulario="form_servico"
        :funcgetListServico="getListServico"
        :funcOnReset="onReset"
      ></Modal>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
import { ServiceServico } from "../../services/ServiceServico";
import { currency, Min } from "../../rules/filters";
export default {
  components: { VueGoodTable, Modal },
  props: {
    functionServico: {
      type: Function,
    },
  },
  data() {
    return {
      modal_form_servico: "modal_form_servico",
      isLoading: false,
      servico: [],
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Serviço",
          field: "servico",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Tempo",
          field: "tempo",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Valor",
          field: "valor",
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
      form_servico: {
        id: "",
        servico: "",
        tempo: "",
        valor: "",
        comissao: "",
        observacoes: "",
        data_create: "",
        data_alt: "",
        titulo: "",
        btn: "",
        disabled: false,
      },
    };
  },
  created() {
    this.getListServico();
  },
  methods: {
    getListServico() {
      this.isLoading = true;
      ServiceServico.getAll()
        .then((obj) => {
          if (obj) {
            obj.map(function (obj) {
              obj.tempo = Min(obj.tempo);
              obj.valor = currency(obj.valor);
              return obj;
            });
            this.servico = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCellServico(params) {
      if (this.functionServico) {
        this.functionServico(params);
      }
    },
    showModalAlterarServico(id) {
      this.onReset();
      var titulo = "Alterar Serviço";
      var btn = "Alterar";
      var disabled = false;
      this.funcGetById(id, titulo, btn, disabled);
    },
    showModalExcluirServico(id) {
      this.onReset();
      var titulo = "Excluir Serviço";
      var btn = "Excluir";
      var disabled = true;
      this.funcGetById(id, titulo, btn, disabled);
    },
    ShowModalFormCliente() {
      this.onReset();
      this.form_servico.titulo = "Cadastrar Serviço";
      this.form_servico.btn = "Salvar";
      this.$bvModal.show(this.modal_form_servico);
    },
    onReset() {
      this.form_servico.id = "";
      this.form_servico.servico = "";
      this.form_servico.tempo = "";
      this.form_servico.valor = "";
      this.form_servico.comissao = "";
      this.form_servico.observacoes = "";
      this.form_servico.data_create = "";
      this.form_servico.data_alt = "";
      this.form_servico.disabled = false;
    },
    funcGetById(id, titulo, btn, disabled) {
      this.isLoading = true;
      ServiceServico.getById(id)
        .then((obj) => {
          const valor = obj.data[0].valor;
          this.form_servico.id = obj.data[0].id;
          this.form_servico.servico = obj.data[0].servico;
          this.form_servico.tempo = obj.data[0].tempo;
          this.form_servico.valor = valor.toFixed(2);
          this.form_servico.comissao = obj.data[0].comissao;
          this.form_servico.observacoes = obj.data[0].observacoes;
          this.form_servico.data_create = obj.data[0].data_create;
          this.form_servico.data_alt = obj.data[0].data_alt;
          this.form_servico.titulo = titulo;
          this.form_servico.btn = btn;
          this.form_servico.disabled = disabled;
          this.isLoading = false;
          this.$bvModal.show(this.modal_form_servico);
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
