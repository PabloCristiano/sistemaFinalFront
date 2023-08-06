<template>
  <div>
    <b-modal
      :id="modal_form_servico"
      size="lg"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>{{ form.titulo }}</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="closeCategoria()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Serviço">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input
                  id="id"
                  type="text"
                  placeholder="Id"
                  v-model="form.id"
                  disabled
                >
                </b-form-input>
              </div>
              <div class="col-md-10">
                <label
                  >Serviço:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="servico"
                  type="text"
                  placeholder="Digite nome do Serviço"
                  :class="{ 'fail-error': $v.form.servico.$error }"
                  v-model="form.servico"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.servico) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>Tempo:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-input-group prepend="Min">
                  <b-form-input
                    id="tempo"
                    type="number"
                    placeholder="Minutos"
                    :class="{ 'fail-error': $v.form.tempo.$error }"
                    v-model="form.tempo"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>

                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.tempo) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Valor:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-input-group prepend="R$">
                  <b-form-input
                    id="valor"
                    type="number"
                    placeholder="0,00"
                    :class="{ 'fail-error': $v.form.valor.$error }"
                    v-model="form.valor"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.valor) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Comissão:</label>
                <b-input-group prepend="%">
                  <b-form-input
                    id="comissao"
                    type="number"
                    placeholder="%"
                    :class="{ 'fail-error': $v.form.comissao.$error }"
                    v-model="form.comissao"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>

                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.comissao) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-12">
                <label>Observações:</label>
                <b-form-textarea
                  id="observacoes"
                  v-model="form.observacoes"
                  placeholder="Digite alguma Observação..."
                  rows="3"
                  max-rows="6"
                  :title="form.observacoes"
                  :disabled="form.disabled"
                ></b-form-textarea>
              </div>
            </div>
            <div>
              <small class="mt-2" style="font-size: 12px"
                >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
                obrigatórios !</small
              >
            </div>
          </b-form>
        </slot>
        <slot name="botao">
          <div class="d-flex justify-content-end">
            <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="closeCategoria()"
            >
              Cancelar
            </b-button>
            <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="onSubmit()"
            >
              {{ form.btn }}<i class="bx bx-check"></i>
            </b-button>
          </div>
        </slot>
        <slot name="rodape">
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
        </slot>
      </b-card>
    </b-modal>
  </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import { ServiceServico } from "../../services/ServiceServico.js";
import { formataDataTempo } from "../../rules/filters";
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
  props: {
    formulario: { type: Object },
    funcgetListServico: { type: Function },
    funcOnReset: { type: Function },
  },
  data() {
    return {
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_servico: "modal_form_servico",
    };
  },
  filters: {
    formataDataTempo,
  },
  validations: {
    form: {
      servico: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      tempo: {
        required: validators.required,
      },
      valor: {
        required: validators.required,
      },
      comissao: {},
      observacoes: {},
    },
  },
  methods: {
    fGetListServico() {
      this.funcgetListServico();
    },
    validationMsg: validationMessage(formMessages),
    onReset() {
      this.$v.$reset();
      this.funcOnReset();
    },
    closeCategoria() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_servico);
    },
    onSubmit() {
      const vm = this;
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        if (this.form.btn === "Salvar") {
          ServiceServico.storeServico(this.form)
            .then((response) => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_servico);
                this.fGetListServico();
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
        if (this.form.btn === "Alterar") {
          ServiceServico.alterarServico(this.form)
            .then((response) => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_servico);
                this.fGetListServico();
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
        if (this.form.btn === "Excluir") {
          ServiceServico.excluirServico(this.form.id)
            .then((obj) => {
              if (obj.status === 200) {
                notyf.success(obj.data.success);
                this.onReset();
                this.$bvModal.hide(this.modal_form_servico);
                this.fGetListServico();
              } else {
                if (obj.response.data.error.length > 0) {
                  notyf.error(obj.response.data.error[0]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb;
}
</style>
