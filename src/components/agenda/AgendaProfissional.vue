<template>
  <div class="container">
    <div class="card mb-5">
      <div class="card-header" style="font-size: 18px">
        <i class="bx bx-briefcase"></i> Agenda do Profissional
      </div>
      <div class="card-body">
        <div class="row col-md-12 col-sm-12 mb-2 justify-content-start">
          <div class="col-md-2 col-sm-">
            <label>Data :</label>
            <b-form-input
              id="date"
              type="date"
              v-model="form.horario_inicio"
              ref="horario_inicio"
              :class="{
                'fail-error': $v.form.horario_inicio.$error,
              }"
              @keydown.enter.prevent="moveFocus(1)"
            ></b-form-input>
            <small class="small-msg">
              {{ validationMsg($v.form.horario_inicio) }}
            </small>
          </div>
          <div class="col-md-2">
            <label>Código:</label>
            <b-form-input
              id="id_profissional"
              type="number"
              :class="{
                'fail-error': $v.form.id_profissional.$error,
              }"
              placeholder="Código"
              ref="id_profissional"
              v-model="form.id_profissional"
              @keydown.enter.prevent="
                profissionalDebounce(form.id_profissional)
              "
              @keydown.backspace="handleBackspace_profissional"
            >
            </b-form-input>
            <small class="small-msg">
              {{ validationMsg($v.form.id_profissional) }}
            </small>
          </div>
          <div class="col-md-4">
            <label
              >Profissional:<b style="color: rgb(245, 153, 153)"> *</b></label
            >
            <b-overlay :show="isLoadingProfissional" rounded="sm">
              <b-input-group>
                <b-form-input
                  id="profissional"
                  type="text"
                  :class="{
                    'fail-error': $v.form.profissional.$error,
                  }"
                  placeholder="Profissional"
                  v-model="form.profissional"
                  disabled
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button
                    @click="showSearchProfissional()"
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
                {{ validationMsg($v.form.profissional) }}
              </small>
            </b-overlay>
          </div>
          <div class="col-md-2 mt-4">
            <button
              id="pesquisar"
              class="btn btn-dark"
              ref="pesquisar"
              @click="findAgendaProfissional"
            >
              Pesquisar
            </button>
          </div>
        </div>
        <div class="row col-md-12 col-sm-12 mb-4 justify-content-end"></div>
        <div class="row mb-3" v-if="true">
          <b-overlay :show="isLoadingAgenda" rounded="sm">
            <vue-good-table
              :columns="columns"
              :rows="agenda"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por um Horario Profissional',
                skipDiacritics: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 15,
                position: 'end',
                perPageDropdown: [15, 30],
                prevLabel: 'Anterior',
                nextLabel: 'Proximo',
                rowsPerPageLabel: 'Qtd por página',
                ofLabel: 'de',
                pageLabel: 'Pagina', // for 'pages' mode
              }"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'btn'">
                  <span v-if="props.row.status === 'RESERVADO' ? true : false">
                    <a
                      size="sm"
                      class="btn btn-sm me-1 mb-1"
                      data-backdrop="static"
                      title="EDITAR"
                      style="background-color: #f0f8ff"
                      @click="cancelar_Horario(props.row)"
                    >
                      CANCELAR <i class="bx bx-edit-alt"></i>
                    </a>

                    <a
                      v-if="props.row.status === 'RESERVADO' ? true : false"
                      size="sm"
                      data-backdrop="static"
                      :title="props.row.execucao"
                      :class="{
                        'btn btn-sm btn-danger me-1 mb-1':
                          props.row.execucao === 'EXECUTAR',
                        'btn btn-sm btn-warning me-1 mb-1':
                          props.row.execucao === 'EXECUTANDO',
                        'btn btn-sm btn-success me-1 mb-1':
                          props.row.execucao === 'EXECUTADO',
                      }"
                      @click="executar_Horario(props.row)"
                    >
                      <b-overlay :show="props.row.btn_Inicio" rounded="sm">
                       {{props.row.execucao}} <i class="bx bx-time"></i>
                      </b-overlay>
                    </a>
                  </span>
                </span>
              </template>
            </vue-good-table>
          </b-overlay>
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="col-md-12 text-end">
          <br />
        </div>
      </div>
    </div>
    <!-- Modal HomeProfissional -->
    <b-modal
      :id="modal_search_Profissional"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Profissional</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchProfissional()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeProfissional
          :functionProfissional="changeSearchProfissional"
        ></HomeProfissional>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchProfissional()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Profissional</b-button
        >
      </b-container>
    </b-modal>
    <br /><br />
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import HomeProfissional from "../profissional/HomeProfissional.vue";
import { ServiceAgenda } from "../../services/serviceAgenda";
import { ServiceProfissional } from "../../services/serviceProfissional";
import {
  formatarDataParaPtBR,
  formatarHorarioAgenda,
} from "../../rules/filters";
import { Notyf } from "notyf";
const notyf = new Notyf({
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 5000,
      dismissible: true,
    },
  ],
});
const formMessages = {
  required: () => "Campo Obrigatório",
  txtMinLen: ({ $params }) =>
    `Campo minimo ${$params.txtMinLen.min} characters.`,
  txtMaxLen: ({ $params }) =>
    `Campo maximo ${$params.txtMaxLen.max} characters.`,
  integer: () => "Campo deve ser um Numero inteiro",
};
export default {
  components: { VueGoodTable, HomeProfissional },
  data() {
    return {
      modal_search_Profissional: "modal_search_Profissional",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      columns: [
        {
          label: "Data",
          field: "data",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Horario",
          field: "horario_inicio",
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
          label: "Cliente",
          field: "nome_cliente",
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
          label: "Ações",
          sortable: false,
          field: "btn",
          html: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      form: {
        profissional: "",
        id_profissional: "",
        id_servico: "",
        servico: "",
        horario_inicio: "",
      },
      agenda: [],
      isLoadingAgenda: false,
      isLoadingProfissional: false,
      btn_Inicio: false,
    };
  },
  watch: {
    "form.horario_inicio"() {
      this.agenda = [];
    },
  },
  validations: {
    form: {
      id_profissional: {
        required: validators.required,
        integer: validators.integer,
      },
      profissional: {
        required: validators.required,
      },
      horario_inicio: {
        required: validators.required,
      },
    },
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    showSearchProfissional() {
      this.$bvModal.show(this.modal_search_Profissional);
    },
    fecharModalSearchProfissional() {
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    changeSearchProfissional(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_profissional = "";
      this.form.profissional = "";
      this.agenda = [];
      this.form.id_profissional = obj.row.id;
      this.form.profissional = obj.row.profissional;
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    onsubmit() {},
    findAgendaProfissional() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        notyf.error("Pesquisa está enfrentando alguma irregularidade !");
      } else {
        this.isLoadingAgenda = true;
        this.agenda = [];
        ServiceAgenda.findAgendaProfissional(this.form)
          .then((value) => {
            if (value.data.Success === true) {
              this.isLoadingAgenda = false;
              value.data.Agenda.map((agenda) => {
                agenda.data = formatarDataParaPtBR(agenda.data);
                agenda.horario_inicio = formatarHorarioAgenda(
                  agenda.horario_inicio
                );
                agenda.btn_Inicio = false;
              });
              this.agenda = value.data.Agenda;
            }
            if (value.data.Success === false) {
              this.isLoadingAgenda = false;
              notyf.error(value.data.mensagem);
              this.agenda = [];
            }
          })
          .catch((error) => {
            this.isLoadingAgenda = false;
            console.error("Erro na requisição:", error);
          });
      }
    },
    profissionalDebounce(id) {
      this.isLoadingProfissional = true;
      // this.form.id_profissional = "";
      // this.form.profissional = "";
      this.agenda = [];
      this.$v.form.profissional.$reset();
      this.$v.form.id_profissional.$reset();
      ServiceProfissional.getById(id).then((response) => {
        if (response.status === 200) {
          this.form.id_profissional = response.data[0].id;
          this.form.profissional = response.data[0].profissional;
          this.isLoadingProfissional = false;
          this.findAgendaProfissional();
        } else {
          notyf.error("Profissional não encontrado !");
          this.form.id_profissional = "";
          this.form.profissional = "";
          this.isLoadingProfissional = false;
        }
      });
    },
    handleBackspace_profissional(event) {
      if (event.keyCode === 8) {
        //this.fornecedorDebounce(0);
        this.form.id_profissional = "";
        this.form.profissional = "";
        this.agenda = [];
        this.$v.form.profissional.$reset();
      }
    },
    moveFocus(nextIndex) {
      const inputs = [
        this.$refs.horario_inicio,
        this.$refs.id_profissional,
        this.$refs.pesquisar,
        // ... mais referências de b-form-input ...
      ];

      if (nextIndex >= 0 && nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    },
    executar_Horario(i) {
      i.btn_Inicio = true;
      if (i) {
        ServiceAgenda.AtulizarExecucaoAgenda(i)
          .then((value) => {
            if (value.data.Success === true) {
              ServiceAgenda.findAgendaProfissional(this.form)
                .then((value) => {
                  if (value.data.Success === true) {
                    this.isLoadingAgenda = false;
                    value.data.Agenda.map((agenda) => {
                      agenda.data = formatarDataParaPtBR(agenda.data);
                      agenda.horario_inicio = formatarHorarioAgenda(
                        agenda.horario_inicio
                      );
                      agenda.btn_Inicio = false;
                    });
                    this.agenda = value.data.Agenda;
                  }
                  if (value.data.Success === false) {
                    this.isLoadingAgenda = false;
                    notyf.error(value.data.mensagem);
                    this.agenda = [];
                  }
                })
                .catch((error) => {
                  this.isLoadingAgenda = false;
                  console.error("Erro na requisição:", error);
                });
              i.btn_Inicio = false;
            }
            if (value.data.Success === false) {
              i.btn_Inicio = false;
              notyf.error("Serviço Já Executado");
            }
          })
          .catch((error) => {
            this.isLoadingAgenda = false;
            console.error("Erro na requisição:", error);
          });
      }
      // Object.keys(i).forEach((propriedade) => {
      //   const valor = i[propriedade];
      //   if (i[propriedade] === "RESERVADO") {
      //     i[propriedade] = i[propriedade] + "01";
      //   }
      //   console.log(`${propriedade}: ${valor}`);
      // });
    },
    cancelar_Horario(obj) {
      console.log(obj);
      this.isLoadingAgenda = true;
      ServiceAgenda.cancelarHorario(obj)
        .then((value) => {
          if (value.data.Success === true) {
            ServiceAgenda.findAgendaProfissional(this.form)
              .then((value) => {
                if (value.data.Success === true) {
                  this.isLoadingAgenda = false;
                  value.data.Agenda.map((agenda) => {
                    agenda.data = formatarDataParaPtBR(agenda.data);
                    agenda.horario_inicio = formatarHorarioAgenda(
                      agenda.horario_inicio
                    );
                    agenda.btn_Inicio = false;
                  });
                  this.agenda = value.data.Agenda;
                }
                if (value.data.Success === false) {
                  this.isLoadingAgenda = false;
                  notyf.error(value.data.mensagem);
                  this.agenda = [];
                }
              })
              .catch((error) => {
                this.isLoadingAgenda = false;
                console.error("Erro na requisição:", error);
              });
               notyf.success("Horário Cancelado com Sucesso.");
          }
          if (value.data.Success === false) {
            this.isLoadingAgenda = false;
            notyf.error("Não Foi Possivel Cancelar Horário");
          }
        })
        .catch((error) => {
          this.isLoadingAgenda = false;
          console.error("Erro na requisição:", error);
        });
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb;
}
.small-msg {
  font-size: 11px;
  color: rgba(228, 96, 96, 0.733);
  font-family: sans-serif;
  font-weight: 700;
}
.table-active-reservado {
  --bs-table-accent-bg: rgba(228, 96, 96, 0.733);
  color: var(--bs-table-active-color);
}
.table-active-livre {
  --bs-table-accent-bg: rgb(40 187 120 / 62%);
  color: var(--bs-table-active-color);
}
.table-active-fechado {
  --bs-table-accent-bg: rgba(184, 187, 185, 0.486);
  color: var(--bs-table-active-color);
}
</style>
