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
            <b-form-input id="date" type="date"></b-form-input>
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
          <div class="col-md-2 mt-4">
            <button id="pesquisar" class="btn btn-dark">Pesquisar</button>
          </div>
        </div>
        <div class="row col-md-12 col-sm-12 mb-4 justify-content-end"></div>
        <div class="row mb-3" v-if="true">
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
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="col-md-12 text-end">
          <br />
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
export default {
  components: { VueGoodTable },
  data() {
    return {
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
      form: {},
      agenda: [],
    };
  },
  methods: {
    onsubmit() {},
    findAgendaProfissional() {},
  },
};
</script>
<style></style>
