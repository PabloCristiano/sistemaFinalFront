<template>
  <div class="col-md-12 p-3" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Contas A Pagar</div>
        <div class="card-body">
          <div
            class="row col-md-8 col-sm-8 offset-2 mb-2 justify-content-center align-items-center"
          >
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <label>Data Emissão:</label>
                <b-form-input
                  id="date"
                  type="date"
                  v-model="form.horario_inicio"
                  ref="horario_inicio"
                  :class="{
                    'fail-error': false,
                  }"
                ></b-form-input>
                <small class="small-msg">
                  <!-- {{ validationMsg($v.form.horario_inicio) }} -->
                </small>
              </div>
              <div class="col-md-6 col-sm-6">
                <label>Data Vencimento:</label>
                <b-form-input
                  id="date"
                  type="date"
                  v-model="form.horario_inicio"
                  ref="horario_inicio"
                  :class="{
                    'fail-error': false,
                  }"
                ></b-form-input>
                <small class="small-msg">
                  <!-- {{ validationMsg($v.form.horario_inicio) }} -->
                </small>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-6">
                <label>Nº Nota:</label>
                <b-form-input
                  id="id_cliente_"
                  type="number"
                  :class="{
                    'fail-error': false,
                  }"
                  placeholder="Nº Nota"
                  v-model="form.num_nota"
                >
                </b-form-input>
                <small class="small-msg">
                  <!-- {{ validationMsg($v.form.id_cliente) }} -->
                </small>
              </div>
              <div class="col-md-3 col-sm-6">
                <label for="status">Status:</label>
                <v-select
                  class="form-select"
                  :options="statusOptions"
                  placeholder="Status"
                  label="status"
                  v-model="selectedStatus"
                  style="padding: 2px"
                ></v-select>
              </div>
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input
                  id="id_profissional"
                  type="number"
                  :class="{
                    'fail-error': false,
                  }"
                  placeholder="Código"
                  ref="id_profissional"
                  v-model="form.id_profissional"
                >
                </b-form-input>
                <small class="small-msg">
                  <!-- {{ validationMsg($v.form.id_profissional) }} -->
                </small>
              </div>
              <div class="col-md-4">
                <label>Fornecedor:</label>
                <b-overlay :show="false" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="profissional"
                      type="text"
                      :class="{
                        'fail-error': false,
                      }"
                      placeholder="Profissional"
                      v-model="form.profissional"
                      disabled
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        text="Button"
                        variant="dark"
                        title="Pesquisar Profissional"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                          /></svg
                      ></b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small class="small-msg">
                    <!-- {{ validationMsg($v.form.profissional) }} -->
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row justify-content-center mt-2">
              <div class="col-md-2 col-sm-2 mt-2 text-center">
                <button id="pesquisar" class="btn btn-dark" ref="pesquisar">
                  Pesquisar
                </button>
              </div>
              <div class="col-md-2 col-sm-2 mt-2 text-center text-sm-start">
                <button class="btn btn-dark" title="LIMPAR CAMPOS">
                  <i class="bx bx-revision"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <vue-good-table
              :columns="columns"
              :rows="contasPagar"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por Contas a Pagar',
                skipDiacritics: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 15,
                position: 'end',
                perPageDropdown: [30, 50],
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
                    @click="showConta(props.row)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="Exibir Conta a Pagar"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="Excluir Conta a Pagar"
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
            <br />
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
  </div>
</template>
<script>
import { ServiceContasPagar } from "@/services/serviceContasPagar";
import { formatarDataParaPtBR, currency_t } from "../../rules/filters";
export default {
  data() {
    return {
      statusOptions: [
        { status: "PAGO" },
        { status: "PENDENTE" },
        { status: "CANCELADA" },
      ],
      selectedStatus: null,
      form: {
        horario_inicio: "",
        id_profissional: "",
        profissional: "",
        num_nota: "",
      },
      contasPagar: [],
      columns: [
        {
          label: "Nº Nota",
          field: "compra_numero_nota",
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
          label: "Nº Parcela",
          field: "numero_parcela",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Forma Pagamento",
          field: "formaPagamento.forma_pg",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Valor Parcela",
          field: "valor_parcela",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Data Vencimento",
          field: "data_vencimento",
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
          label: "Status",
          field: "status",
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
      isLoading: false,
    };
  },
  created() {
    this.getListContasPagar();
  },
  methods: {
    getListContasPagar() {
      this.isLoading = true;
      ServiceContasPagar.getAll()
        .then((obj) => {
          if (obj) {
            if (obj) {
              obj.map((conta) => {
                conta.valor_parcela = currency_t(conta.valor_parcela);
                conta.data_vencimento = formatarDataParaPtBR(
                  conta.data_vencimento
                );
                conta.data_emissao = formatarDataParaPtBR(conta.data_emissao);
              });
            }
            this.contasPagar = obj;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showConta(row) {
      this.$router.push({
        name: "viewContasPagar",
        params: { obj: row },
      });
    },
  },
};
</script>
<style></style>
