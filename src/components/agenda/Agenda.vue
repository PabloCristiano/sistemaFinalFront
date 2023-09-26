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
        <div v-if="isEnabled">
          <div class="container">
            <b-overlay :show="isLoading" rounded="sm">
              <div
                class="table-responsive table-wrapper"
                :class="{ 'table-disabled': !isEnabled }"
                style="background-color: #f5f5f561; height: 600px"
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
                        :key="day.label"
                      >
                        {{ day.label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="value in dateRange" :key="value.start_time">
                      <td
                        class="table-default text-center"
                        style="font-weight: 500; border-radius: 29px"
                        v-for="day in dayIndex"
                        :key="day.label"
                        @click="slot($event, value, day)"
                        :disabled="isEnabled"
                      >
                        {{ value.start_time }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-overlay>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="col-md-12 text-end">
          <div class="col-md-2 offset-md-10">
            <button class="btn btn-sm btn-dark" :disabled="!isEnabled">
              <i class="bx bx-plus-circle"></i> Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceProfissional } from "../../services/serviceProfissional";
export default {
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
        this.calcularResultado();
        this.findAllAgendaProfissional(this.selected2.id);
        // console.log(this.selected2.id);
      },

      deep: true,
    },
  },
  data() {
    return {
      isEnabled: false,
      isLoading: false,
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
        //   label: "08:00",
        //   start_time: "08:00",
        //   end_time: "08:30",
        // },
        // {
        //   label: "08:30",
        //   start_time: "08:30",
        //   end_time: "09:00",
        // },
        // {
        //   label: "09:00",
        //   start_time: "09:00",
        //   end_time: "09:30",
        // },
        // {
        //   label: "09:30",
        //   start_time: "09:30",
        //   end_time: "10:00",
        // },
        // {
        //   label: "10:00",
        //   start_time: "10:00",
        //   end_time: "10:30",
        // },
        // {
        //   label: "10:30",
        //   start_time: "10:30",
        //   end_time: "11:00",
        // },
        // {
        //   label: "11:00",
        //   start_time: "11:00",
        //   end_time: "11:30",
        // },
        // {
        //   label: "11:30",
        //   start_time: "11:30",
        //   end_time: "12:00",
        // },
        // {
        //   label: "12:00",
        //   start_time: "12:00",
        //   end_time: "12:30",
        // },
        // {
        //   label: "12:30",
        //   start_time: "12:30",
        //   end_time: "12:00",
        // },
        // {
        //   label: "13:00",
        //   start_time: "13:00",
        //   end_time: "13:30",
        // },
        // {
        //   label: "13:30",
        //   start_time: "13:30",
        //   end_time: "14:00",
        // },
        // {
        //   label: "14:00",
        //   start_time: "14:00",
        //   end_time: "14:30",
        // },
        // {
        //   label: "14:30",
        //   start_time: "14:30",
        //   end_time: "15:00",
        // },
        // {
        //   label: "15:00",
        //   start_time: "15:00",
        //   end_time: "15:30",
        // },
        // {
        //   label: "15:30",
        //   start_time: "15:30",
        //   end_time: "16:00",
        // },
        // {
        //   label: "16:00",
        //   start_time: "16:00",
        //   end_time: "16:30",
        // },
        // {
        //   label: "17:00",
        //   start_time: "17:00",
        //   end_time: "17:30",
        // },
        // {
        //   label: "17:30",
        //   start_time: "17:30",
        //   end_time: "18:00",
        // },
        // {
        //   label: "18:00",
        //   start_time: "18:00",
        //   end_time: "18:30",
        // },
      ],
      dayIndex: [],
      dateIndex: 0,
    };
  },
  created() {
    this.getAllProfissionais();
  },
  mounted() {
    this.createTable();
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
      if (this.isEnabled) {
        event.target.classList.toggle("table-active");
        value.date = day.value;
        this.$emit("callback", value);
        console.log(value);
      }
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
      ServiceProfissional.findAllAgendaProfissional(id)
        .then((obj) => {
          if (obj) {
            // console.log(obj.data.Agenda);
            this.extrairDatasUnicas(obj.data.Agenda);
            this.dateRange = [];
            // obj.data.Agenda.map((a) => {
            //   // this.dateRange.push({
            //   //   label: a.horario_inicio,
            //   //   start_time: a.horario_inicio,
            //   //   end_time: a.horario_fim,
            //   // });
            //   console.log(a)
            // });
          }

          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
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
      console.log(datasUnicas);
      return datasUnicas;
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
</style>
