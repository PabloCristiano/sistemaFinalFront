<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Pais</div>
        <div class="card-body">
          <div class="">
            <vue-good-table
              :columns="columns"
              :rows="paises"
              @on-cell-click="selectCell"
              :search-options="{
                enabled: true,
                placeholder: 'Procure por um País',
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
                    @click="showModalAlterar(props.row.id)"
                    size="sm"
                    class="btn btn-sm me-1 mb-1"
                    data-backdrop="static"
                    title="EDITAR"
                    style="background-color: #f0f8ff"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </a>
                  <a
                    @click="showModalExcluir(props.row.id)"
                    size="sm"
                    class="btn btn-sm ms-1 mb-1"
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
              <button class="btn btn-sm btn-dark" @click="showModal()">
                <i class="bx bx-plus-circle"></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
    <b-modal
      :id="modal_form_pais"
      size="lg"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Cadastrar Pais</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fechar()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Pais">
        <div>
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row col-12">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input
                  id="id"
                  v-model="form.id"
                  type="text"
                  placeholder="Id"
                  disabled
                >
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label>País:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input
                  id="pais"
                  v-model="form.pais"
                  type="text"
                  placeholder="Digite nome do país"
                  :class="{ 'fail-error': $v.form.pais.$error }"
                  required
                >
                </b-form-input>
                <!-- <small style="font-size: 11px;color: red;" v-if="$v.form.pais.$error">Campo obrigatório</small> -->
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.pais)
                }}</small>
              </div>
              <div class="col-md-3">
                <label>Sigla:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input
                  id="sigla"
                  v-model="form.sigla"
                  type="text"
                  placeholder="Sigla"
                  :class="{ 'fail-error': $v.form.sigla.$error }"
                  required
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.sigla)
                }}</small>
              </div>
              <div class="col-md-3">
                <label>DDI:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input
                  type="text"
                  id="ddi"
                  v-model="form.ddi"
                  :class="{ 'fail-error': $v.form.ddi.$error }"
                  placeholder="+()"
                  required
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.ddi)
                }}</small>
              </div>
              <small class="mt-2" style="font-size: 12px"
                >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
                obrigatórios !</small
              >
            </div>
            <div class="d-flex justify-content-end">
              <b-button
                class="btn btn-sm me-1"
                type="button"
                @click="fechar()"
                variant="dark"
                >Cancelar
              </b-button>
              <b-button
                class="btn btn-sm ms-1"
                type="submit"
                variant="dark"
                @click.prevent="onSubmit()"
                >Salvar
                <i class="bx bx-check"></i>
              </b-button>
            </div>
          </b-form>
          <div class="col-12">
            <small class="col-6 me-1" style="font-size: 11px; margin: 2px"
              >Data Criação:
            </small>
            <small class="col-6 me-1" style="font-size: 11px"
              >Data Ultima-Alt:</small
            >
          </div>
        </div>
      </b-card>
    </b-modal>
    <Modal :id="modal_form_pais_alterar" titulo="Alterar Pais">
      <template v-slot:conteudo>
        <b-form>
          <div class="row col-12">
            <div class="col-md-2">
              <label>Código:</label>
              <b-form-input
                id="id"
                type="text"
                placeholder="Id"
                :value="form.id"
                v-model="form.id"
                disabled
              >
              </b-form-input>
            </div>
            <div class="col-md-4">
              <label>País:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="pais"
                :value="form.pais"
                v-model="form.pais"
                type="text"
                placeholder="Digite nome do país"
                :title="form.pais"
                @change="$v.form.pais.$touch()"
                :class="{ 'fail-error': $v.form.pais.$error }"
                required
              >
              </b-form-input>
              <small style="font-size: 11px; color: red">{{
                validationMsg($v.form.pais)
              }}</small>
            </div>
            <div class="col-md-3">
              <label>Sigla:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="sigla"
                :value="form.sigla"
                v-model="form.sigla"
                type="text"
                placeholder="Sigla"
                required
              >
              </b-form-input>
              <small style="font-size: 11px; color: red">{{
                validationMsg($v.form.sigla)
              }}</small>
            </div>
            <div class="col-md-3">
              <label>DDI:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="ddi"
                :value="form.ddi"
                v-model="form.ddi"
                placeholder="DDI"
                required
              >
              </b-form-input>
              <small style="font-size: 11px; color: red">{{
                validationMsg($v.form.ddi)
              }}</small>
            </div>
            <small class="mt-2" style="font-size: 12px"
              >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small
            >
          </div>
        </b-form>
      </template>
      <template v-slot:botao>
        <div class="d-flex justify-content-end">
          <b-button
            class="btn btn-sm me-1"
            type="button"
            variant="dark"
            @click="fechar()"
            >Cancelar
          </b-button>
          <b-button
            class="btn btn-sm ms-1"
            type="button"
            variant="dark"
            @click.prevent="alterarPais()"
            >Alterar<i class="bx bx-check"></i>
          </b-button>
        </div>
      </template>
      <template v-slot:rodape>
        <div class="col-12">
          <small class="col-6 me-1" style="font-size: 11px"
            ><b>Data Criação:</b>
            {{ form.data_create | formataDataTempo }}</small
          >
          <small class="col-6 me-1" style="font-size: 11px"
            ><b>Data Ult-Alteração:</b>
            {{ form.data_alt | formataDataTempo }}</small
          >
        </div>
      </template>
    </Modal>
    <Modal :id="modal_form_pais_excluir" titulo="Excluir Pais">
      <template v-slot:conteudo>
        <b-form>
          <div class="row col-12">
            <div class="col-md-2">
              <label>Código:</label>
              <b-form-input
                id="id"
                type="text"
                placeholder="Id"
                :value="form.id"
                v-model="form.id"
                :disabled="true"
              >
              </b-form-input>
            </div>
            <div class="col-md-6">
              <label>País:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="pais"
                type="text"
                :value="form.pais"
                v-model="form.pais"
                placeholder="Digite nome do país"
                disabled
              >
              </b-form-input>
            </div>
            <div class="col-md-2">
              <label>Sigla:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="sigla"
                type="text"
                :value="form.sigla"
                v-model="form.sigla"
                placeholder="Sigla"
                disabled
              >
              </b-form-input>
            </div>
            <div class="col-md-2">
              <label>DDI:<b style="color: rgb(245, 153, 153)">*</b></label>
              <b-form-input
                id="ddi"
                placeholder="DDI"
                :value="form.ddi"
                v-model="form.ddi"
                disabled
              >
              </b-form-input>
            </div>
            <small class="mt-2" style="font-size: 12px"
              >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small
            >
          </div>
        </b-form>
      </template>
      <template v-slot:botao>
        <div class="d-flex justify-content-end">
          <b-button
            class="btn btn-sm me-1"
            type="button"
            variant="dark"
            @click="fechar()"
            >Cancelar
          </b-button>

          <b-button
            class="btn btn-sm me-1"
            type="button"
            variant="dark"
            @click.prevent="excluirPais()"
            >Excluir<i class="bx bx-check"></i>
          </b-button>
        </div>
      </template>
      <template v-slot:rodape>
        <div class="col-12">
          <small class="col-6 me-1" style="font-size: 11px"
            ><b>Data Criação:</b>
            {{ form.data_create | formataDataTempo }}</small
          >
          <small class="col-6 me-1" style="font-size: 11px"
            ><b>Data Ult-Alteração:</b>
            {{ form.data_alt | formataDataTempo }}</small
          >
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import Modal from "./Modal.vue";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import NProgress from "nprogress";
import { ServicePais } from "../../services/servicePais";
import { Notyf } from "notyf";
import { formataDataTempo, currency } from "../../rules/filters";
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
};
export default {
  components: { VueGoodTable, Modal },
  props: {
    function: {
      type: Function,
    },
  },
  data() {
    return {
      modal_form_pais: "modal_form_pais",
      modal_form_pais_alterar: "modal_form_pais_alterar",
      modal_form_pais_excluir: "modal_form_pais_excluir",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      paises: [],
      isLoading: false,
      form: {
        id: "",
        pais: "",
        sigla: "",
        ddi: "",
        data_create: "",
        data_alt: "",
      },
      name: "",
      show: true,
      columns: [
        {
          label: "ID",
          field: "id",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "País",
          field: "pais",
          thClass: "text-center",
          tdClass: "text-center",
          //tdClass: this.tdClassFunc,
        },
        {
          label: "Sigla",
          field: "sigla",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "DDI",
          field: "ddi",
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
  filters: {
    formataDataTempo,
    currency,
  },
  created() {
    NProgress.start();
    this.getList();
    NProgress.done();
  },
  validations: {
    form: {
      pais: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      sigla: {
        required: validators.required,
        txtMinLen: validators.minLength(2),
        txtMaxLen: validators.maxLength(3),
      },
      ddi: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
    },
  },
  computed: {},
  methods: {
    selectCell(params) {
      if (this.function) {
        this.function(params);
      }
    },
    validationMsg: validationMessage(formMessages),
    showModal() {
      this.onReset();
      this.$bvModal.show(this.modal_form_pais);
    },
    showModalAlterar(id) {
      const vm = this;
      this.isLoading = true;
      ServicePais.getById(id)
        .then((response) => {
          vm.form.id = response.data.id;
          vm.form.pais = response.data.pais;
          vm.form.sigla = response.data.sigla;
          vm.form.ddi = response.data.ddi;
          vm.form.data_create = response.data.data_create;
          vm.form.data_alt = response.data.data_alt;
          vm.$bvModal.show(vm.modal_form_pais_alterar);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showModalExcluir(id) {
      const vm = this;
      this.isLoading = true;
      ServicePais.getById(id)
        .then((response) => {
          vm.form.id = response.data.id;
          vm.form.pais = response.data.pais;
          vm.form.sigla = response.data.sigla;
          vm.form.ddi = response.data.ddi;
          vm.form.data_create = response.data.data_create;
          vm.form.data_alt = response.data.data_alt;
          this.$bvModal.show(this.modal_form_pais_excluir);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    alterarPais() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        ServicePais.alterarPAis(this.form)
          .then((obj) => {
            if (obj.status === 200) {
              notyf.success(obj.data.success);
              this.onReset();
              this.getList();
              this.$bvModal.hide(this.modal_form_pais_alterar);
            } else {
              if (obj.response.data.errors != null) {
                Object.keys(obj.response.data.errors).forEach(function (key) {
                  notyf.error(obj.response.data.errors[key][0]);
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    excluirPais() {
      ServicePais.excluirPais(this.form.id)
        .then((obj) => {
          if (obj.status === 200) {
            notyf.success(obj.data.success);
            this.onReset();
            this.getList();
            this.$bvModal.hide(this.modal_form_pais_excluir);
          } else {
            if (obj.response.data.erro.length > 0) {
              notyf.error(obj.response.data.erro[0]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        ServicePais.salvarPais(this.form)
          .then((obj) => {
            if (obj.status === 200) {
              notyf.success(obj.data.success);
              this.onReset();
              this.getList();
              this.$bvModal.hide(this.modal_form_pais);
            } else {
              if (obj.response.data.errors != null) {
                Object.keys(obj.response.data.errors).forEach(function (key) {
                  notyf.error(obj.response.data.errors[key][0]);
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onReset() {
      this.form.id = "";
      this.form.pais = "";
      this.form.sigla = "";
      this.form.ddi = "";
      (this.form.data_create = ""), (this.form.data_alt = ""), this.$v.$reset();
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    fechar() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_pais);
      this.$bvModal.hide(this.modal_form_pais_alterar);
      this.$bvModal.hide(this.modal_form_pais_excluir);
    },
    getList() {
      this.isLoading = true;
      ServicePais.getAll()
        .then((obj) => {
          if (obj) {
            this.paises = obj.data;
            return obj;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {},
};
</script>
<style scoped>
.fail-error {
  border: 2px solid #e46060bb;
}
</style>
