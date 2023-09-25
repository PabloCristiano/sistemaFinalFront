<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="false" rounded="sm">
      <div class="card mb-5">
        <div class="card-header" style="font-size: 18px">
          <i class="bx bx-calendar"></i> Cadastrar Agenda
        </div>
        <div class="card-body">
          <div class="">
            <div class="row col-md-12 col-sm-12">
              <div class="col-md-4 col-sm-1">
                <label
                  >Data Inicio:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  id="horario_inicio"
                  type="datetime-local"
                  :class="{ 'fail-error': $v.form.horario_inicio.$error }"
                  v-model="form.horario_inicio"
                  @blur="ValidaDataInicio"
                  ref="horario_inicio_"
                  @keydown.enter.prevent="moveFocus(1)"
                ></b-form-input>
                <small class="small-msg">
                  {{ validationMsg($v.form.horario_inicio) }}
                </small>
              </div>
              <div class="col-md-4 col-sm-1">
                <label
                  >Data Fim:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="data_fim"
                  type="datetime-local"
                  :class="{ 'fail-error': $v.form.horario_fim.$error }"
                  v-model="form.horario_fim"
                  @blur="ValidaDataFim"
                  ref="horario_fim_"
                  @keydown.enter.prevent="moveFocus(2)"
                ></b-form-input>
                <small class="small-msg">
                  {{ validationMsg($v.form.horario_fim) }}
                </small>
              </div>
              <div class="col-md-4">
                <label
                  >Intervalo Horario:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  type="number"
                  :class="{ 'fail-error': $v.form.intervalo.$error }"
                  v-model="form.intervalo"
                  id="intervalo"
                  placeholder="Intervalo Horario"
                  ref="intervalo_"
                  @keydown.enter.prevent="moveFocus(3)"
                >
                </b-form-input>
                <small class="small-msg">
                  {{ validationMsg($v.form.intervalo) }}
                </small>
              </div>
            </div>
            <div class="row col-md-12 col-sm-12 justify-content-start">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input
                  id="id_profissional_"
                  type="number"
                  placeholder="Código"
                  v-model="form.id_profissional"
                  :class="{ 'fail-error': $v.form.id_profissional.$error }"
                  ref="id_profissional_"
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
                  >Profissional:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-overlay :show="isLoadingProfissional" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="profissional_"
                      type="text"
                      v-model="form.profissional"
                      placeholder="Profissional"
                      :class="{ 'fail-error': $v.form.profissional.$error }"
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
              <div class="col-md-2 mt-4 text-center">
                <button
                  id="btnGerarAgenda_"
                  @click="generateAgenda"
                  class="btn btn-dark"
                  ref="btnGerarAgenda_"
                >
                  Gerar Agenda
                </button>
              </div>
              <div class="col-md-2 mt-4">
                <button
                  class="btn btn-dark"
                  @click="limparAgenda"
                  title="LIMPAR AGENDA"
                >
                  <i class="bx bx-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <b-overlay :show="isLoading" rounded="sm">
              <vue-good-table
                :columns="columns"
                :rows="agenda"
                :search-options="{
                  enabled: true,
                  placeholder: 'Procure por um Horario',
                  skipDiacritics: true
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
                  pageLabel: 'Pagina' // for 'pages' mode
                }"
              >
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field === 'btn'">
                    <a
                      size="sm"
                      class="btn btn-sm me-1 mb-1"
                      data-backdrop="static"
                      title="EDITAR"
                      style="background-color: #f0f8ff"
                    >
                      <i class="bx bx-edit-alt"></i>
                    </a>
                    <a
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
            </b-overlay>
            <div v-if="$v.agenda.$error" class="col text-center">
              <div
                class="d-flex justify-content-center align-items-center col-12 mt-2"
              >
                <div class="col-8 alert alert-danger" role="alert">
                  {{ validationMsg($v.agenda) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-end">
            <!-- <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="closeAgenda"
            >
              Cancelar
            </b-button> -->
            <div>
              <b-button
                class="btn btn-sm me-1"
                type="button"
                variant="dark"
                @click.prevent="onSubmit"
              >
                Salvar<i class="bx bx-check"></i>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
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
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import Rules from "../../rules/rules";
import HomeProfissional from "../profissional/HomeProfissional.vue";
import { ServiceProfissional } from "../../services/serviceProfissional";
import { ServiceAgenda } from "../../services/serviceAgenda";
import { Notyf } from "notyf";
const notyf = new Notyf({
  position: {
    x: "center",
    y: "top"
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning"
      }
    },
    {
      type: "error",
      background: "indianred",
      duration: 5000,
      dismissible: true
    }
  ]
});
const formMessages = {
  required: () => "Campo Obrigatório",
  required_Agenda: () => "Deve conter pelo menos um Horário adicionado !",
  txtValidaHorarioInicio: () => "Data e horario Inválida !",
  txtValidaHorarioFim: () => "Data e horario Inválida !"
};
export default {
  components: { VueGoodTable, HomeProfissional },
  data() {
    return {
      isLoading: false,
      modal_search_Profissional: "modal_search_Profissional",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      customDialogClass: "my-custom-modal-dialog",
      form: {
        horario_inicio: "",
        horario_fim: "",
        intervalo: "",
        profissional: "",
        id_profissional: "",
        agenda: []
      },
      columns: [
        {
          label: "Data",
          field: "data",
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Horario",
          field: "horario_inicio",
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Profissioanal",
          field: "profissional",
          thClass: "text-center",
          tdClass: "text-center"
        }
      ],
      agenda: [],
      isLoadingProfissional: false
    };
  },
  watch: {
    "form.horario_inicio"() {
      this.agenda = [];
    },
    "form.horario_fim"() {
      this.agenda = [];
    },
    "form.intervalo"() {
      this.agenda = [];
    }
  },
  validations: {
    form: {
      horario_inicio: {
        required: validators.required,
        txtValidaHorarioInicio: function ValidaHora_inicio(value) {
          return Rules.validarHorario_Inicio(value);
        }
      },
      horario_fim: {
        required: validators.required,
        txtValidaHorarioInicio: function ValidaHora_inicio(value) {
          return Rules.validarHorario_Inicio(value);
        },
        txtValidaHorarioFim: function ValidaHorario_fim(value) {
          return Rules.validarHorario_Fim(value, this.form.horario_inicio);
        }
      },
      intervalo: {
        required: validators.required
      },
      id_profissional: {
        required: validators.required
      },
      profissional: {
        required: validators.required
      }
    },
    agenda: {
      required_Agenda: validators.required
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    limparAgenda() {
      this.agenda = [];
      this.form.horario_inicio = "";
      this.form.horario_fim = "";
      this.form.intervalo = "";
      this.form.profissional = "";
      this.form.id_profissional = "";
      this.$v.form.$reset();
    },
    generateAgenda() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();

        notyf.error(
          "O cadastro Agenda está enfrentando alguma irregularidade !"
        );
      } else {
        // console.log(this.form);
        // async function verificarRegistro() {
        //   var isregistro = await this.pesquisaHorarioAgendaProfissional();

        //   // Faça o que você precisa com a variável isregistro aqui
        // }

        var isregistro = this.pesquisaHorarioAgendaProfissional();
        console.log(isregistro);
        // this.$v.$reset();
        // this.$v.form.$reset();
        // this.agenda = [];
        // const startTime = new Date(this.form.horario_inicio).getTime();
        // const endTime = new Date(this.form.horario_fim).getTime();
        // const interval = parseInt(this.form.intervalo) * 60000; // Converte minutos to millisegundos
        // for (let time = startTime; time <= endTime; time += interval) {
        //   const dateTime = new Date(time);
        //   const data = dateTime.toLocaleDateString();
        //   const horario = dateTime.toLocaleTimeString();

        //   this.agenda.push({
        //     data: data,
        //     horario_inicio: horario,
        //     profissional: this.form.profissional,
        //     id_profissional: this.form.id_profissional,
        //   });
        // }
        // this.form.agenda = this.agenda;
      }
    },
    fecharModalSearchProfissional() {
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    changeSearchProfissional(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_profissional = obj.row.id;
      this.form.profissional = obj.row.profissional;
      this.agenda = [];
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    showSearchProfissional() {
      this.$bvModal.show(this.modal_search_Profissional);
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
          this.$nextTick(() => {
            this.$refs.btnGerarAgenda_.focus();
          });
          this.isLoadingProfissional = false;
        } else {
          this.form.id_profissional = "";
          this.form.profissional = "";
          this.isLoadingProfissional = false;
          notyf.error("Profissional não encontrado !");
        }
      });
    },
    handleBackspace_profissional(event) {
      if (event.keyCode === 8) {
        //this.fornecedorDebounce(0);
        this.form.id_profissional = "";
        this.form.profissional = "";
        this.agenda = [];
      }
    },
    ValidaDataInicio() {
      this.$v.form.horario_inicio.$touch();
    },
    ValidaDataFim() {
      this.$v.form.horario_fim.$touch();
    },
    ValidaIntervalo() {
      this.$v.form.intervalo.$touch();
    },
    ValidaProfissional() {
      this.$v.form.id_profissional.$touch();
      this.$v.form.profissional.$touch();
    },
    moveFocus(nextIndex) {
      const inputs = [
        this.$refs.horario_inicio_,
        this.$refs.horario_fim_,
        this.$refs.intervalo_,
        this.$refs.id_profissional_,
        this.$refs.profissional_,
        this.$refs.btnGerarAgenda_

        // ... mais referências de b-form-input ...
      ];

      if (nextIndex >= 0 && nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    },
    closeAgenda() {
      //   this.onReset();
      //this.$router.push({ name: "compra" });
      console.log("fechar Agenda");
    },
    onSubmit() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        notyf.error("Agenda está enfrentando alguma irregularidade !");
      } else {
        if (this.$v.$invalid) {
          this.$v.$touch();
          notyf.error(
            "O cadastro Agenda está enfrentando alguma irregularidade !"
          );
          return;
        }
        ServiceAgenda.storeAgenda(this.form)
          .then((response) => {
            if (response.status === 200) {
              notyf.success(response.data.message);
              this.limparAgenda();
              this.$v.$reset();
            } else {
              if (response.response.data.errors != null) {
                Object.keys(response.response.data.errors).forEach(function (
                  key
                ) {
                  notyf.error(response.response.data.errors[key][0]);
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    pesquisaHorarioAgendaProfissional() {
      this.isLoading = true;
      ServiceAgenda.findCriarAgendaProfissional(this.form)
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            console.log(response.data.Success);
            return response.data.Success;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    }
  }
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
</style>
