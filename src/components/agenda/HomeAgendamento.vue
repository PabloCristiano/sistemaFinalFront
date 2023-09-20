<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="false" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Agenda</div>
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
                ></b-form-input>
                <small class="small-msg">
                  {{ validationMsg($v.form.horario_inicio) }}
                </small>
              </div>
              <div class="col-md-4 col-sm-4">
                <label
                  >Data Fim:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="data_fim"
                  type="datetime-local"
                  :class="{ 'fail-error': $v.form.horario_fim.$error }"
                  v-model="form.horario_fim"
                  @blur="ValidaDataFim"
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
                  @blur="ValidaIntervalo"
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
                  @blur="ValidaProfissional"
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
              <div class="col-md-2 mt-4">
                <button @click="generateAgenda" class="btn btn-dark">
                  Gerar Agenda
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <vue-good-table
              :columns="columns"
              :rows="agenda"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por um Horario',
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
          </div>
        </div>
        <div class="card-footer">
          <div class="col-md-12 text-end">
            <div class="col-md-2 offset-md-10">
              <button class="btn btn-sm btn-dark">
                <i class="bx bx-plus-circle"></i> SALVAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <!-- <div class="row">
      <div class="col">
        <h2>Agenda</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="startDate">Data de Início:</label>
        <input type="datetime-local" v-model="startDate" id="startDate" />
      </div>
      <div class="col">
        <label for="endDate">Data de Fim:</label>
        <input type="datetime-local" v-model="endDate" id="endDate" />
      </div>
      <div class="col">
        <label for="interval">Intervalo (em minutos):</label>
        <input type="number" v-model="interval" id="interval" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <button @click="generateAgenda" class="btn btn-primary">
          Gerar Agenda
        </button>
      </div>
    </div> -->
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
const formMessages = {
  required: () => "Campo Obrigatório",
  txtValidaHorarioInicio: () => "Data e horario Inválida !",
};
export default {
  components: { VueGoodTable, HomeProfissional },
  data() {
    return {
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
      },
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
          label: "Profissioanal",
          field: "profissional",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      agenda: [],
      isLoadingProfissional: false,
    };
  },
  validations: {
    form: {
      horario_inicio: {
        required: validators.required,
        txtValidaHorarioInicio: function ValidaHora_inicio(value) {
          return Rules.validarHorario_Inicio(value);
        },
      },
      horario_fim: {
        required: validators.required,
        txtValidaHorarioInicio: function ValidaHora_inicio(value) {
          return Rules.validarHorario_Inicio(value);
        },
      },
      intervalo: {
        required: validators.required,
      },
      id_profissional: {
        required: validators.required,
      },
      profissional: {
        required: validators.required,
      },
    },
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    generateAgenda() {
      this.agenda = [];
      const startTime = new Date(this.form.horario_inicio).getTime();
      const endTime = new Date(this.form.horario_fim).getTime();
      const interval = parseInt(this.form.intervalo) * 60000; // Converte minutos to millisegundos
      for (let time = startTime; time <= endTime; time += interval) {
        const dateTime = new Date(time);
        const data = dateTime.toLocaleDateString();
        const horario = dateTime.toLocaleTimeString();

        this.agenda.push({
          data: data,
          horario_inicio: horario,
          profissional: this.form.profissional,
          id_profissional: this.form.id_profissional,
        });
      }
      console.log(this.agenda);
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
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    showSearchProfissional() {
      this.$bvModal.show(this.modal_search_Profissional);
    },
    profissionalDebounce(id) {
      this.isLoadingProfissional = true;
      // this.form.id_profissional = "";
      // this.form.profissional = "";
      this.$v.form.profissional.$reset();
      this.$v.form.id_profissional.$reset();
      ServiceProfissional.getById(id).then((response) => {
        if (response.status === 200) {
          this.form.id_profissional = response.data[0].id;
          this.form.profissional = response.data[0].profissional;
          this.isLoadingProfissional = false;
        } else {
          this.form.id_profissional = "";
          this.form.profissional = "";
          if (
            this.$v.form.id_profissional.$invalid &&
            this.$v.form.profissional.$invalid
          ) {
            this.$v.form.id_profissional.$touch();
            this.$v.form.profissional.$touch();
          }
          this.isLoadingProfissional = false;
          this.$nextTick(() => {
            this.$refs.id_profissional_.focus();
          });
        }
      });
    },
    handleBackspace_profissional(event) {
      if (event.keyCode === 8) {
        //this.fornecedorDebounce(0);
        this.form.id_profissional = "";
        this.form.profissional = "";
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
        this.$refs.id_profissional_,
        // ... mais referências de b-form-input ...
      ];

      if (nextIndex >= 0 && nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
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
</style>
