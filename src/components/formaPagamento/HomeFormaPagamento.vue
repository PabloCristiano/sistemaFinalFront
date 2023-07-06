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
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
export default {
  components: { VueGoodTable },
  data() {
    return {
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
    //   this.onReset();
    //   this.form_estado.titulo = "Cadastrar Estado";
    //   this.form_estado.btn = "Salvar";
    //   this.form_estado.nome_modal = "Show_Modal";
    //   this.$bvModal.show(this.modal_form_estado);
    },
    showModalAlterarFormaPagamento() {
    //   this.isLoading = true;
    //   ServiceEstado.getById(id)
    //     .then((obj) => {
    //       this.onReset();
    //       this.form_estado.titulo = "Alterar Estado";
    //       this.form_estado.btn = "Alterar";
    //       this.form_estado.id = obj.data[0].id;
    //       this.form_estado.estado = obj.data[0].estado;
    //       this.form_estado.uf = obj.data[0].uf;
    //       this.form_estado.id_pais = obj.data[0].pais.id;
    //       this.form_estado.pais = obj.data[0].pais.pais;
    //       this.form_estado.data_create = obj.data[0].data_create;
    //       this.form_estado.data_alt = obj.data[0].data_alt;
    //       this.isLoading = false;
    //       this.$bvModal.show(this.modal_form_estado);
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
    //       this.form_estado.titulo = "Excluir Estado";
    //       this.form_estado.btn = "Excluir";
    //       this.form_estado.id = obj.data[0].id;
    //       this.form_estado.estado = obj.data[0].estado;
    //       this.form_estado.uf = obj.data[0].uf;
    //       this.form_estado.id_pais = obj.data[0].pais.id;
    //       this.form_estado.pais = obj.data[0].pais.pais;
    //       this.form_estado.data_create = obj.data[0].data_create;
    //       this.form_estado.data_alt = obj.data[0].data_alt;
    //       this.form_estado.disabled = true;
    //       this.isLoading = false;
    //       this.$bvModal.show(this.modal_form_estado);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    },
  },
};
</script>
<style></style>
