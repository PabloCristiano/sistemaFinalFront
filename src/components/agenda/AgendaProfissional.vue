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
              ref="horario_inicio_"
            ></b-form-input>
            <small class="small-msg">
              <!-- {{ validationMsg($v.form.horario_inicio) }} -->
            </small>
          </div>
          <div class="col-md-2">
            <label>Código:</label>
            <b-form-input
              id="id_profissional"
              type="number"
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
            <label
              >Profissional:<b style="color: rgb(245, 153, 153)"> *</b></label
            >
            <b-overlay :show="false" rounded="sm">
              <b-input-group>
                <b-form-input
                  id="profissional"
                  type="text"
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
                <!-- {{ validationMsg($v.form.profissional) }} -->
              </small>
            </b-overlay>
          </div>
          <div class="col-md-2 mt-4">
            <button
              id="pesquisar"
              class="btn btn-dark"
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
import HomeProfissional from "../profissional/HomeProfissional.vue";
import { ServiceAgenda } from "../../services/serviceAgenda";
import {
  formatarDataParaPtBR,
  formatarHorarioAgenda,
} from "../../rules/filters";
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
      ],
      form: {
        profissional: "",
        id_profissinal: "",
        id_servico: "",
        servico: "",
        horario_inicio: "",
      },
      agenda: [],
      isLoadingAgenda: false,
    };
  },
  methods: {
    showSearchProfissional() {
      this.$bvModal.show(this.modal_search_Profissional);
    },
    changeSearchProfissional(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_profissional = obj.row.id;
      this.form.profissional = obj.row.profissional;
      this.$bvModal.hide(this.modal_search_Profissional);
    },
    onsubmit() {},
    findAgendaProfissional() {
      this.isLoadingAgenda = true;
      this.agenda = [];
      ServiceAgenda.findAgendaProfissional(this.form)
        .then((value) => {
          if (value.data.Success === true) {
            this.isLoadingAgenda = false;
            value.data.Agenda.map((agenda) => {
              console.log(agenda);
              agenda.data = formatarDataParaPtBR(agenda.data);
              agenda.horario_inicio = formatarHorarioAgenda(
                agenda.horario_inicio
              );
            });
            this.agenda = value.data.Agenda;
          }
          console.log(value);
        })
        .catch((error) => {
          this.isLoadingAgenda = false;
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
