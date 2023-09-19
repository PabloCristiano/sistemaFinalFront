<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="false" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Agenda</div>
        <div class="card-body">
          <div class="">
            <div class="row col-md-12 col-sm-12">
              <div class="col-md-4 col-sm-1">
                <label>Data Inicio:<b style="color: rgb(245, 153, 153)"> *</b></label>
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
                <label>Data Fim:<b style="color: rgb(245, 153, 153)"> *</b></label>
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
                <label>Intervalo Horario:<b style="color: rgb(245, 153, 153)"> *</b></label>
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
                  id="id_estado"
                  type="number"
                  placeholder="Código"
                  :class="{ 'fail-error': false }"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red"> </small>
              </div>
              <div class="col-md-4">
                <label
                  >Profissional:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-overlay :show="false" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="cidade"
                      type="text"
                      placeholder="Profissional"
                      :class="{ 'fail-error': false }"
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
                  <small style="font-size: 11px; color: red"> </small>
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
          <!-- <div class="row mt-4">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th>Data e Hora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in agenda" :key="item">
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->
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
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
const formMessages = {
  required: () => "Campo Obrigatório",
};
export default {
  components: { VueGoodTable },
  data() {
    return {
      form: {
        horario_inicio: "",
        horario_fim: "",
        intervalo: "",
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
    };
  },
  validations: {
    form: {
      horario_inicio: {
        required: validators.required,
      },
      horario_fim: {
        required: validators.required,
      },
      intervalo: {
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
          profissional: "TESTE",
        });
      }
      console.log(this.agenda);
    },
    validarDataHora() {
      const dataHoraAtual = new Date().toISOString().slice(0, 16);

      if (this.form.horario_inicio < dataHoraAtual) {
        this.mensagemErro =
          "A data e hora selecionadas devem ser posteriores à data e hora atual.";
      } else {
        this.mensagemErro = "";
        // Faça algo com a data e hora selecionada, como enviar para o servidor
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
