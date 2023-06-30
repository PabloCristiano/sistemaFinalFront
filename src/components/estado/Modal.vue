<template>
  <div>
    <b-modal :id="modal_form_estado" size="lg" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
      <template v-slot:modal-header>
        <h5>{{ form.titulo }}</h5>
        <b-button style="border: 0" size="sm" variant="outline-light" @click="closeEstado()">
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Estado">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id" type="text" placeholder="Id" v-model="form.id" disabled>
                </b-form-input>
              </div>
              <div class="col-md-8">
                <label>Estado:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input id="estado" type="text" placeholder="Digite nome do estado" v-model="form.estado"
                  :class="{ 'fail-error': $v.form.estado.$error }" required :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.estado)
                }}</small>
              </div>
              <div class="col-md-2">
                <label>UF:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input id="uf" type="text" placeholder="UF" v-model="form.uf"
                  :class="{ 'fail-error': $v.form.uf.$error }" required :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.uf)
                }}</small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id_pais" type="number" v-model="form.id_pais" v-debounce:1000ms="paisDebounce"
                  placeholder="Id" :class="{ 'fail-error': $v.form.id_pais.$error }" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">{{
                  validationMsg($v.form.id_pais)
                }}</small>
              </div>
              <div class="col-md-10">
                <label>País:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-overlay :show="isLoadingPais" rounded="sm">
                  <b-input-group class="mb-3">
                    <b-form-input id="pais" type="text" placeholder="País" v-model="form.pais"
                      :class="{ 'fail-error': $v.form.id_pais.$error }" disabled></b-form-input>
                    <b-input-group-append>
                      <b-button @click="showSearchPais()" text="Button" variant="dark" :disabled="form.disabled"><svg
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-search" viewBox="0 0 16 16">
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small style="font-size: 11px; color: red">{{
                    validationMsg($v.form.pais)
                  }}</small>
                </b-overlay>
              </div>
              <small class="mt-2" style="font-size: 12px">Campos com <b style="color: rgb(245, 153, 153)">*</b> são
                obrigatórios !</small>
            </div>
          </b-form>
        </slot>
        <slot name="botao">
          <div class="d-flex justify-content-end">
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="closeEstado()">Cancelar
            </b-button>
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="onSubmit()">{{ form.btn }}<i
                class="bx bx-check"></i>
            </b-button>
          </div>
        </slot>
        <slot name="rodape">
          <div class="col-12">
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Criação:</b> {{ form.data_create | formataDataTempo
            }}</small>
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Ult-Alteração:</b> {{ form.data_alt | formataDataTempo
            }}</small>
          </div>
        </slot>
      </b-card>
    </b-modal>
    <div>
      <b-modal :id="modal_search_pais" size="xl" :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
        <template v-slot:modal-header>
          <h5>Pesquisar Pais</h5>
          <b-button style="border: 0" size="sm" variant="outline-light" @click="fecharModalSearchPais()">
            X
          </b-button>
        </template>
        <b-container fluid>
          <HomePais :function="changeVModel"></HomePais>
        </b-container>
        <b-container class="col-sm-12 col-md-12 mt-3" footer style="text-align: center;">
          <b-button @click="fecharModalSearchPais()" type="button" id="" class="btn btn-dark btn-sm">Fechar
            Pesquisa Pais</b-button>
        </b-container>
      </b-modal>
    </div>
  </div>
</template>
<script>
import HomePais from "../pais/HomePais.vue";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import { ServicePais } from "../../services/servicePais";
import { ServiceEstado } from "../../services/serviceEstado";
import { formataDataTempo, currency } from '../../rules/filters';
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
  props: { formulario: { type: Object }, functionGetList: { type: Function } },
  components: { HomePais },
  data() {
    return {
      form:this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_search_pais: "modal_search_pais",
      modal_form_estado: "modal_form_estado",
      isLoadingPais: false,
    };
  },
  filters: {
    formataDataTempo,
    currency
  },
  validations: {
    form: {
      estado: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      uf: {
        required: validators.required,
        txtMinLen: validators.minLength(2),
        txtMaxLen: validators.maxLength(5)

      },
      id_pais: {
        required: validators.required,
        integer: validators.integer
      },
      pais: {
        required: validators.required
      }

    },
  },
  computed: {

  },
  methods: {
    fGetList() {
      this.functionGetList();
    },
    validationMsg: validationMessage(formMessages),
    showSearchPais() {
      // this.form.id_pais = "";
      // this.form.pais = "";
      this.$bvModal.show(this.modal_search_pais);
    },
    fecharModalSearchPais() {
      this.$bvModal.hide(this.modal_search_pais);
    },
    closeEstado() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_estado);
    },
    showModalEstado() {
      this.$bvModal.show(this.id);
    },
    changeVModel(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_pais = obj.row.id;
      this.form.pais = obj.row.pais;
      this.$bvModal.hide(this.modal_search_pais);
    },
    onReset() {
      this.$v.$reset();
      this.form.id = "";
      this.form.estado = "";
      this.form.uf = "";
      this.form.id_pais = "";
      this.form.pais = "";
      this.form.data_create = "";
      this.form.data_alt = "";
    },
    onSubmit() {
      const vm = this;
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        if (this.form.btn === 'Salvar') {
          ServiceEstado.storeEstado(this.form)
            .then(response => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_estado);
                this.fGetList();
              } else {
                if (response.response.data.errors != null) {
                  Object.keys(response.response.data.errors).forEach(function (key) {
                    notyf.error(response.response.data.errors[key][0]);
                  });
                }
              }
            }).catch(error => {
              console.log(error)
            });
        }
        if (this.form.btn === 'Alterar') {
          ServiceEstado.alterarEstado(this.form)
            .then(response => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_estado);
                this.fGetList();
              } else {
                if (response.response.data.errors != null) {
                  Object.keys(response.response.data.errors).forEach(function (key) {
                    notyf.error(response.response.data.errors[key][0]);
                  });
                }
              }
            }).catch(error => {
              console.log(error)
            });
        }

        if (this.form.btn === 'Excluir') {
          ServiceEstado.excluirEstado(this.form.id)
            .then((obj) => {
              if (obj.status === 200) {
                notyf.success(obj.data.success);
                this.onReset();
                this.fGetList();
                this.$bvModal.hide(this.modal_form_estado);
              } else {
                if (obj.response.data.erro.length > 0) {
                  notyf.error(obj.response.data.erro[0]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    paisDebounce(val) {
      this.isLoadingPais = true;
      let vm = this;
      ServicePais.getById(val).then(response => {
        if (response.status === 200) {
          vm.form.pais = response.data.pais;
          this.isLoadingPais = false;
        } else {
          vm.form.pais = '';
          this.isLoadingPais = false;
          notyf.error('Pais não encontrado');
        }
      })
    }
  },
};
</script>
<style>
.fail-error {
  border: 1px solid red;
}
</style>
