<template>
  <div class="container">
    <div class="card mb-5">
      <div class="card-header" style="font-size: 18px">Agendar</div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="">Profissional:</label>
            <v-select
              class="form-select"
              :options="profissional"
              placeholder="Selecione um Profissional"
              label="profissional"
              v-model="selected2"
            ></v-select>
          </div>
          <!-- <div class="col-md-6" v-if="true">
            <label for="">Serviço:</label>
            <v-select
              class="form-select"
              :options="servico"
              placeholder="Selecione um Serviço"
              label="text"
              v-model="selected1"
            ></v-select>
          </div> -->
        </div>
        <div>
          <div class="container">
            <b-overlay :show="isLoading" rounded="sm">
              <div
                class="table-responsive table-wrapper"
                :class="{ 'table-disabled': !isEnabled }"
                style="background-color: #f5f5f561; height: 600px"
                v-if="isEnabled"
              >
                <table
                  class="table table-borderless"
                  style="border-width: 0 0px !important"
                >
                  <thead class="fixed-header">
                    <tr class="table-dark">
                      <th
                        class="text-center"
                        scope="col"
                        v-for="day in dayIndex"
                        :key="day.index"
                      >
                        {{ day.data }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(value, valueIndex) in dateRange"
                      :key="value.start_time + valueIndex"
                    >
                      <td
                        class="table-default text-center"
                        style="font-weight: 500; border-radius: 29px"
                        v-for="day in dayIndex"
                        :key="day.index"
                        @click="slot($event, value, day.data)"
                        :disabled="isEnabled"
                      >
                        {{ value.start_time }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex justify-content-center align-items-center col-12 mt-2"
                v-if="isMsgProfissional"
              >
                <div
                  class="col-12 alert alert-warning text-center"
                  role="alert"
                >
                  <b>Profissional sem Agenda !</b>
                </div>
              </div>
            </b-overlay>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="col-md-12 text-end">
          <div class="col-md-2 offset-md-10"><br /><br /></div>
        </div>
      </div>
    </div>
    <b-modal
      :id="modal_search_agendar"
      size="lg"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Agendar um Horário</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalAgendar()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <div class="row col-12 mt-2">
          <div class="col-md-8">
            <label>Profissional:</label>
            <b-form-input
              id="horario_inicio"
              type="text"
              v-model="form.profissional"
              placeholder="Nome Profissional"
              disabled
            >
            </b-form-input>
          </div>
        </div>
        <div class="row col-md-12 mt-2">
          <div class="col-md-2">
            <label>Código:</label>
            <b-form-input
              id="id_cliente_"
              type="number"
              placeholder="Código"
              v-model="form.id_cliente"
            >
            </b-form-input>
            <small class="small-msg"> </small>
          </div>
          <div class="col-md-10">
            <label>Cliente:<b style="color: rgb(245, 153, 153)"> *</b></label>
            <b-overlay :show="false" rounded="sm">
              <b-input-group>
                <b-form-input
                  id="cliente_"
                  type="text"
                  v-model="form.cliente"
                  placeholder="Nome do Cliente"
                  disabled
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button
                    @click="showSearchCliente"
                    text="Button"
                    variant="dark"
                    title="Pesquisar Cliente"
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
              <small class="small-msg"> </small>
            </b-overlay>
          </div>
        </div>
        <div class="row col-md-12 mt-2">
          <div class="col-md-2">
            <label>Código:</label>
            <b-form-input
              id="id_estado"
              type="number"
              placeholder="Código"
              v-model="form.id_servico"
            >
            </b-form-input>
            <small class="small-msg"> </small>
          </div>
          <div class="col-md-10">
            <label>Serviço:<b style="color: rgb(245, 153, 153)"> *</b></label>
            <b-overlay :show="false" rounded="sm">
              <b-input-group>
                <b-form-input
                  id="servico"
                  type="text"
                  v-model="form.servico"
                  placeholder="Nome do Serviço"
                  disabled
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button
                    @click="showSearchServico"
                    text="Button"
                    variant="dark"
                    title="Pesquisar Serviço"
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
              <small class="small-msg"> </small>
            </b-overlay>
          </div>
        </div>
        <div class="row col-md-12 mt-2">
          <div class="col-md-3">
            <label>Hr Inicio:</label>
            <b-form-input
              id="horario_inicio_"
              type="text"
              v-model="form.horario_inicio"
              placeholder="Horario Inicio"
              disabled
            >
            </b-form-input>
          </div>
          <div class="col-md-3">
            <label>Hr Fim:</label>
            <b-form-input
              id="horario_fim"
              v-model="form.horario_fim"
              type="text"
              placeholder="Horario Inicio"
              disabled
            >
            </b-form-input>
          </div>
          <div class="col-md-3">
            <label>Tempo:</label>
            <b-form-input
              id="tempo"
              type="text"
              v-model="form.tempo"
              placeholder="Min"
              disabled
            >
            </b-form-input>
          </div>
          <div class="col-md-3">
            <label>Valor:</label>
            <b-form-input
              id="valor_"
              type="text"
              v-model="form.valor"
              placeholder="R$ 0,00"
              disabled
            >
            </b-form-input>
          </div>
        </div>
      </b-container>
      <b-container class="row col-md-12" footer>
        <div class="d-flex justify-content-end mt-3">
          <b-button
            class="btn btn-sm me-1"
            type="button"
            variant="dark"
            @click="fecharModalAgendar()"
          >
            Cancelar
          </b-button>
          <div>
            <b-button class="btn btn-sm me-1" type="button" variant="dark">
              Agendar<i class="bx bx-check"></i>
            </b-button>
          </div>
        </div>
      </b-container>
    </b-modal>
    <!-- modal Cliente -->
    <b-modal
      :id="modal_search_cliente"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Cliente</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchCliente"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCliente :functionCliente="changeSearchCliente"></HomeCliente>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchCliente"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Cliente</b-button
        >
      </b-container>
    </b-modal>
    <!-- modal Serviço -->
    <b-modal
      :id="modal_search_servico"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Serviço</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchServico"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeServico :functionServico="changeSearchServico"></HomeServico>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchServico"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Serviço</b-button
        >
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { ServiceProfissional } from "../../services/serviceProfissional";
import HomeCliente from "../cliente/HomeCliente.vue";
import HomeServico from "../servico/HomeServico.vue";
import Rules from "../../rules/rules";
// import { Notyf } from "notyf";
// const notyf = new Notyf({
//   position: {
//     x: "center",
//     y: "top"
//   },
//   types: [
//     {
//       type: "warning",
//       background: "orange",
//       icon: {
//         className: "material-icons",
//         tagName: "i",
//         text: "warning"
//       }
//     },
//     {
//       type: "error",
//       background: "indianred",
//       duration: 5000,
//       dismissible: true
//     }
//   ]
// });
export default {
  components: { HomeCliente, HomeServico },
  props: {
    min: {
      type: Number,
      default: 6,
    },
  },
  watch: {
    selected1: {
      handler() {
        this.calcularResultado();
        this.selected2;
      },
      deep: true,
    },
    selected2: {
      handler() {
        // this.calcularResultado();
        if (this.selected2) {
          this.isEnabled = true;
        } else {
          this.isEnabled = false;
        }
        this.dayIndex = [];
        this.dateRange = [];
        this.isMsgProfissional = false;
        if (this.selected2) {
          this.findAllAgendaProfissional(this.selected2.id);
          this.form.id_profissional = this.selected2.id;
          this.form.profissional = this.selected2.profissional;
        }
      },

      deep: true,
    },
  },
  data() {
    return {
      modal_search_agendar: "modal_search_agendar",
      modal_search_cliente: "modal_search_cliente",
      modal_search_servico: "modal_search_servico",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      isEnabled: false,
      isLoading: false,
      isMsgProfissional: false,
      selected2: "",
      selected1: "",
      servico: [
        { id: 55, text: "Cabelo" },
        { id: 45, text: "Barba" },
        { id: 48, text: "Cabelo/Barba" },
      ],
      profissional: [],
      dateRange: [
        // {
        //   label: "18:00",
        //   start_time: "18:00",
        //   end_time: "18:30",
        // },
      ],
      dayIndex: [],
      dateIndex: 0,
      dateProfissional: [],
      form: {
        id_profissional: "",
        profissional: "",
        id_cliente: "",
        cliente: "",
        id_servico: "",
        servico: "",
        horario_inicio: "",
        horario_fim: "",
        valor: "",
        tempo: "",
      },
    };
  },
  created() {
    this.getAllProfissionais();
  },
  mounted() {
    // this.createTable();
  },
  methods: {
    calcularResultado() {
      if (this.selected2) {
        this.isEnabled = true;
      } else {
        this.isEnabled = false;
      }
    },
    fomataData(date) {
      // Cria um novo objeto Date com a data atual
      const data = date;

      // Cria uma array com os nomes dos dias da semana
      const diasDaSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];

      // Obtem o número correspondente ao dia da semana (0-6)
      const numeroDiaDaSemana = data.getDay();

      // Obtem o nome do dia da semana a partir da array
      const nomeDiaDaSemana = diasDaSemana[numeroDiaDaSemana];

      // Formata a data com o nome do dia da semana
      const dataFormatada = `${nomeDiaDaSemana},\n ${data.toLocaleDateString()}`;

      // Exibe a data formatada no console
      return {
        label: dataFormatada,
        value: date,
      };
    },
    addDate() {
      this.dayIndex.push(this.formataData(this.nextDate(this.dateIndex)));
      this.dateIndex++;
    },
    nextDate(index) {
      let dia = new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000);
      console.log(dia);
      return dia;
    },
    slot(event, value, day) {
      // if (this.isEnabled) {
      //   event.target.classList.toggle("table-active");
      //   value.date = day;
      //   this.$emit("callback", value);
      //   console.log(value);
      // }
      value.date = day;
      console.log(value);
      this.form.horario_inicio = value.start_time;
      this.form.horario_fim = value.end_time;
      this.$bvModal.show(this.modal_search_agendar);
    },
    createTable() {
      for (var index = 0; index < this.min; index++) {
        this.dayIndex.push(this.fomataData(this.nextDate(this.dateIndex)));
        this.dateIndex++;
      }
    },
    getAllProfissionais() {
      ServiceProfissional.getAll()
        .then((obj) => {
          if (obj) {
            this.profissional = obj;
          }
          //this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findAllAgendaProfissional(id) {
      this.isLoading = true;
      ServiceProfissional.findAllAgendaProfissional(id)
        .then((obj) => {
          if (obj) {
            this.dateProfissional = this.extrairDatasUnicas(obj.data.Agenda);
            this.dateProfissional.map((a) => {
              var data = this.formatarData(a);
              this.dayIndex.push({
                data,
              });
            });
            obj.data.Agenda.map((a) => {
              this.dateRange.push({
                index: a.id_profissionais_servicos_agenda,
                id_profissional: a.id_profissional,
                date: a.data,
                label: a.horario_inicio,
                start_time: a.horario_inicio,
                end_time: a.horario_fim,
              });
            });
            this.isLoading = false;
            this.isEnabled = true;
            this.isMsgProfissional = false;
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.isEnabled = false;
          this.isMsgProfissional = true;
          // notyf.error("Profissional sem Agenda !");
        });
    },
    extrairDatasUnicas(dados) {
      const datasUnicas = [];
      dados.forEach(function (evento) {
        const data = evento.data;
        if (!datasUnicas.includes(data)) {
          datasUnicas.push(data);
        }
      });
      return datasUnicas;
    },
    formatarData(dataString) {
      const milisegundos = Rules.convertToMilliseconds(dataString);
      const dataaaa = Rules.milissegundosParaDataFormatada_(milisegundos);
      const data = new Date(dataString);
      //const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });
      const diaSemana = Rules.converterDataParaDiaSemana(dataaaa);
      const dia = data.getUTCDate();
      const mes = data.getUTCMonth() + 1; // Adiciona 1, pois os meses em JavaScript são baseados em zero
      const ano = data.getUTCFullYear();

      return `${diaSemana}, ${dia}/${mes < 10 ? "0" : ""}${mes}/${ano}`;
    },
    fecharModalAgendar() {
      this.$bvModal.hide(this.modal_search_agendar);
      this.resetForm();
    },
    showSearchCliente() {
      this.$bvModal.show(this.modal_search_cliente);
    },
    fecharModalSearchCliente() {
      this.$bvModal.hide(this.modal_search_cliente);
    },
    changeSearchCliente(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_cliente = obj.row.id;
      this.form.cliente = obj.row.cliente;
      this.$bvModal.hide(this.modal_search_cliente);
    },
    fecharModalSearchServico() {
      this.$bvModal.hide(this.modal_search_servico);
    },
    showSearchServico() {
      this.$bvModal.show(this.modal_search_servico);
    },
    changeSearchServico(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      console.log(obj);
      this.form.id_servico = obj.row.id;
      this.form.servico = obj.row.servico;
      this.form.valor = obj.row.valor;
      this.form.tempo = obj.row.tempo;
      this.$bvModal.hide(this.modal_search_servico);
    },
    resetForm() {
      (this.form.id_cliente = ""),
        (this.form.cliente = ""),
        (this.form.id_servico = ""),
        (this.form.servico = ""),
        (this.form.horario_inicio = ""),
        (this.form.horario_fim = ""),
        (this.form.valor = ""),
        (this.form.tempo = "");
    },
  },
};
</script>

<style lang="css">
.table-wrapper {
  overflow-y: scroll;
  max-height: 500px;
  /* ajuste o valor conforme necessário */
}

.table-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

.fixed-header {
  position: sticky;
  top: 0;
  background-color: white;
}

.coluna-scroll {
  max-height: 150px;
  /* altura máxima da coluna */
  overflow-y: scroll;
  /* adiciona scroll na coluna */
}

td {
  border-color: #f0f8ff00;
  border-style: double;
  border-width: 5px;
}

.vue-time-slot-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 13px;
}

.vue-time-slot-row-header {
  border: none !important;
  text-align: center;
  cursor: pointer;
  background-color: #ccc;
  font-size: 12px;
  padding: 8px;
  color: #000;
  width: 100%;
  height: 33px;
}

.vue-time-slot-column-header {
  border: none !important;
  text-align: center;
  cursor: pointer;
  background-color: #ccc;
  font-size: 12px;
  padding: 5px 0;
  color: #000;
  white-space: pre-line;
  height: 45px;
}

.vue-time-slot-cell {
  padding: 7px;
  background-color: #fff;
  border-style: solid;
  border-color: #ccc;
  border-width: 1px 1px 0 0;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
}

.vue-time-slot-cell:last-child {
  border-width: 1px 1px 1px 0;
}

.vue-time-slot-cell:hover {
  background-color: #fd8f91;
}

.vue-time-slot-active-cell {
  background-color: #ef4144;
  color: #fff;
}

.vue-time-slot-active-cell:hover {
  background-color: #ef4144;
}

.vue-time-slot-table-row-header {
  display: flex;
  flex-direction: column;
  width: 70px;
}

.vue-time-slot-day-header {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.vue-time-slot-calendar-table {
  background-color: transparent;
  overflow: auto;
  white-space: nowrap;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.vue-time-slot-calendar-table .vue-time-slot-day-header:first-child {
  border-style: solid;
  border-color: #ccc;
  border-width: 0 0 0 1px;
}

.arrow-block {
  font-size: 25px;
  font-weight: bolder;
  color: #ef4144;
  cursor: pointer;
  margin: -10px 15px;
}

.table-disabled {
  opacity: 0.5;
}
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
  --bs-table-accent-bg: var(--bs-table-active-bg);
  color: var(--bs-table-active-color);
}
.table-active-agendado {
  --bs-table-accent-bg: rgb(40 187 120 / 62%);
  color: var(--bs-table-active-color);
}
</style>
