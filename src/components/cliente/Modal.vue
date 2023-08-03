<template>
  <div>
    <b-modal
      :id="modal_form_cliente"
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
          @click="closeCliente()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Cliente">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12 mt-2">
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
              <div class="col-md-5">
                <label
                  >Cliente:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="cliente"
                  type="text"
                  placeholder="Nome completo"
                  v-model="form.cliente"
                  :class="{ 'fail-error': $v.form.cliente.$error }"
                  :title="form.cliente"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cliente) }}
                </small>
              </div>
              <div class="col-md-5">
                <label
                  >Apelido:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="apelido"
                  type="text"
                  v-model="form.apelido"
                  :class="{ 'fail-error': $v.form.apelido.$error }"
                  placeholder="Digite Nome Fantasia"
                  :title="form.apelido"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.apelido) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>CPF:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input
                  id="form.cpf"
                  type="text"
                  v-model="form.cpf"
                  :class="{ 'fail-error': $v.form.cpf.$error }"
                  placeholder="Número CPF"
                  v-mask="'###.###.###-##'"
                  :maxlength="form.maxCpf"
                  :title="form.cpf"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cpf) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>RG:</label>
                <b-form-input
                  id="rg"
                  type="text"
                  v-model="form.rg"
                  placeholder="Número do RG"
                  v-mask="'#######-#'"
                  :maxlength="form.maxRg"
                  :title="form.rg"
                  :disabled="form.disabled"
                >
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label
                  >Data Nascimento:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  id="dataNasc"
                  type="date"
                  v-model="form.dataNasc"
                  :class="{ 'fail-error': $v.form.dataNasc.$error }"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.dataNasc) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>CEP:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input
                  id="cep"
                  type="text"
                  v-model="form.cep"
                  placeholder="_____-___"
                  :class="{ 'fail-error': $v.form.cep.$error }"
                  v-debounce:1000ms="cepDebounce"
                  v-mask="'#####-###'"
                  :maxlength="form.maxCep"
                  :minlength="form.maxCep"
                  :title="form.cep"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cep) }}
                </small>
              </div>
              <div class="col-md-8">
                <label
                  >Logradouro:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="logradouro"
                  type="text"
                  v-model="form.logradouro"
                  placeholder="Logradouro"
                  :class="{ 'fail-error': $v.form.logradouro.$error }"
                  :title="form.logradouro"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.logradouro) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-2">
                <label
                  >Número:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="numero"
                  type="number"
                  v-model="form.numero"
                  placeholder="Número"
                  :class="{ 'fail-error': $v.form.numero.$error }"
                  :title="form.numero"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.numero) }}
                </small>
              </div>
              <div class="col-md-5">
                <label>Complemento:</label>
                <b-form-input
                  id="complemento"
                  type="text"
                  v-model="form.complemento"
                  placeholder="Complemento"
                  :title="form.complemento"
                  :disabled="form.disabled"
                >
                </b-form-input>
              </div>
              <div class="col-md-5">
                <label
                  >Bairro:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="bairro"
                  type="text"
                  v-model="form.bairro"
                  placeholder="Bairro"
                  :class="{ 'fail-error': $v.form.bairro.$error }"
                  :title="form.bairro"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.bairro) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>Código:</label>
                <b-form-input
                  id="id_estado"
                  type="number"
                  v-model="form.id_cidade"
                  placeholder="Código"
                  :class="{ 'fail-error': $v.form.id_cidade.$error }"
                  v-debounce:1000ms="cidadeDebounce"
                  :title="form.id_cidade"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_cidade) }}
                </small>
              </div>
              <div class="col-md-8">
                <label
                  >Cidade:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-overlay :show="isLoadingCidade" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="cidade"
                      type="text"
                      v-model="form.cidade"
                      placeholder="Cidade"
                      :class="{ 'fail-error': $v.form.cidade.$error }"
                      disabled
                      :title="form.cidade"
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        @click="showSearchCidade()"
                        text="Button"
                        variant="dark"
                        :disabled="form.disabled"
                        title="Pesquisar Cidade"
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
                  <small style="font-size: 11px; color: red">
                    {{ validationMsg($v.form.cidade) }}
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-6">
                <label>WhatsApp:</label>
                <b-form-input
                  id="whatsapp"
                  type="text"
                  v-model="form.whatsapp"
                  placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'"
                  :maxlength="form.maxWhatsapp"
                  :title="form.whatsapp"
                  :disabled="form.disabled"
                >
                </b-form-input>
              </div>
              <div class="col-md-6">
                <label
                  >Telefone:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="telefone"
                  type="text"
                  v-model="form.telefone"
                  placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'"
                  :class="{ 'fail-error': $v.form.telefone.$error }"
                  :maxlength="form.maxTelefone"
                  :title="form.telefone"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.telefone) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label
                  >E-mail:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="email"
                  type="text"
                  v-model="form.email"
                  placeholder="Contato@contato.com"
                  :class="{ 'fail-error': $v.form.email.$error }"
                  :title="form.email"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.email) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Senha:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input
                  id="senha"
                  type="password"
                  v-model="form.senha"
                  placeholder="Digite uma senha"
                  :class="{ 'fail-error': $v.form.senha.$error }"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.senha) }}
                </small>
              </div>
              <div class="col-md-4">
                <label
                  >Confirma Senha:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  id="confsenha"
                  type="password"
                  v-model="form.confSenha"
                  :class="{ 'fail-error': $v.form.confSenha.$error }"
                  placeholder="Confirme a Senha"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.confSenha) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>Código:</label>
                <b-form-input
                  id="id_condicao"
                  type="number"
                  v-model="form.id_condicao"
                  value="487"
                  :class="{ 'fail-error': $v.form.id_condicao.$error }"
                  placeholder="Código"
                  :title="form.id_condicao"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_condicao) }}
                </small>
              </div>
              <div class="col-md-8">
                <label
                  >Condição Pagamento:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-overlay :show="false" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="condicaopg"
                      type="text"
                      v-model="form.condicaopg"
                      :value="30 / 60 / 90"
                      :class="{ 'fail-error': $v.form.condicaopg.$error }"
                      placeholder="Condição Pagamento"
                      disabled
                      :title="form.condicaopg"
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        text="Button"
                        variant="dark"
                        @click="showSearchCondicao()"
                        :disabled="form.disabled"
                        title="Pesquisar Condição de Pagamento"
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
                  <small style="font-size: 11px; color: red">
                    {{ validationMsg($v.form.condicaopg) }}
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-12">
                <label>Observações:</label>
                <b-form-textarea
                  id="observacao"
                  v-model="form.observacao"
                  placeholder="Digite alguma Observação..."
                  rows="3"
                  max-rows="6"
                  :title="form.observacao"
                  :disabled="form.disabled"
                ></b-form-textarea>
              </div>
            </div>
            <small class="mt-2" style="font-size: 12px"
              >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small
            >
          </b-form>
        </slot>
        <slot name="botao">
          <div class="d-flex justify-content-end">
            <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="closeCliente()"
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
    <b-modal
      :id="modal_search_cidade"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Cidade</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchCidade()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCidade :functionCidade="changeSearchCidade"></HomeCidade>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchCidade()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Cidade</b-button
        >
      </b-container>
    </b-modal>
    <!-- Modal Condição -->
    <b-modal
      :id="modal_search_condicao"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Condição de Pagamento</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchCondicao()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCondicaoPagamento :functionCondicao="changeSearchCondicao"></HomeCondicaoPagamento>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchCondicao()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Condição de Pagamento</b-button
        >
      </b-container>
    </b-modal>

  </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import HomeCidade from "../cidade/HomeCidade.vue";
import HomeCondicaoPagamento from "../condicaoPagamento/HomeCondicaoPagamento.vue";
import { Notyf } from "notyf";
import axios from "axios";
import { ServiceCidade } from "../../services/serviceCidade";
import { ServiceCliente } from "../../services/serviceCliente";
import Rules from "../../rules/rules";
import { formataDataTempo } from "../../rules/filters";
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
  txtCnpj: () => `CNPJ Inválido`,
  txtCpf: () => `CPF Inválido`,
  email: () => "Deve ser um E-mail Válido.",
  txtUrl: () => `Site deve ser uma Url Ex: http://www.exemplo.com `,
  txtConfSenha: () => "Deve ser a mesma Senha",
  txtMaior: () => "Cliente deve ser Maior de Idade",
};
export default {
  props: {
    formulario: { type: Object },
    funcOnReset: { type: Function },
    functionGetListCliente: { type: Function },
  },
  components: { HomeCidade,HomeCondicaoPagamento },
  data() {
    return {
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_cliente: "modal_form_cliente",
      modal_search_cidade: "modal_search_cidade",
      modal_search_condicao: "modal_search_condicao",
      isLoadingCidade: false,
    };
  },
  filters: {
    formataDataTempo,
  },
  validations() {
    return {
      form: {
        cliente: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
        },
        apelido: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
        },
        cpf: {
          required: validators.required,
          txtMinLen: validators.minLength(14),
          txtMaxLen: validators.maxLength(14),
          txtCpf: Rules.ValidarCpf,
        },
        cep: {
          required: validators.required,
          txtMinLen: validators.minLength(9),
          txtMaxLen: validators.maxLength(9),
        },
        logradouro: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
          txtMaxLen: validators.maxLength(50),
        },
        numero: {
          required: validators.required,
          integer: validators.integer,
        },
        bairro: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
          txtMaxLen: validators.maxLength(30),
        },
        id_cidade: {
          required: validators.required,
          integer: validators.integer,
        },
        cidade: {
          required: validators.required,
        },
        id_condicao: {
          required: validators.required,
          integer: validators.integer,
        },
        condicaopg: {
          required: validators.required,
        },
        telefone: {
          required: validators.required,
          txtMinLen: validators.minLength(15),
          txtMaxLen: validators.maxLength(15),
        },
        email: {
          required: validators.required,
          email: validators.email,
        },
        senha: {
          required: validators.required,
          txtMinLen: validators.minLength(4),
          txtMaxLen: validators.maxLength(255),
        },
        confSenha: {
          required: validators.required,
          txtConfSenha: this.validarSenhasIguais,
        },
        dataNasc: {
          required: validators.required,
          txtMaior: Rules.validarMaioridade,
        },
      },
    };
  },
  methods: {
    validarSenhasIguais() {
      var isvalid = this.form.senha === this.form.confSenha ? true : false;
      return isvalid;
    },
    fGetListCliente() {
      this.functionGetListCliente();
    },
    validationMsg: validationMessage(formMessages),
    showSearchCidade() {
      // this.form.id_cidade = "";
      // this.form.cidade = "";
      this.$bvModal.show(this.modal_search_cidade);
    },
    showSearchCondicao() {
      // this.form.id_cidade = "";
      // this.form.cidade = "";
      this.$bvModal.show(this.modal_search_condicao);
    },
    fecharModalSearchCidade() {
      this.$bvModal.hide(this.modal_search_cidade);
    },
    fecharModalSearchCondicao() {
      this.$bvModal.hide(this.modal_search_condicao);
    },
    changeSearchCidade(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_cidade = obj.row.id;
      this.form.cidade = obj.row.cidade;
      this.$bvModal.hide(this.modal_search_cidade);
    },
    changeSearchCondicao(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_condicao = obj.row.id;
      this.form.condicaopg = obj.row.condicao_pagamento;
      this.$bvModal.hide(this.modal_search_condicao);
    },
    closeCliente() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_cliente);
    },
    onReset() {
      this.$v.$reset();
      this.funcOnReset();
    },
    onSubmit() {
      const vm = this;
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        if (this.form.btn === "Salvar") {
          ServiceCliente.storeCliente(this.form)
            .then((response) => {
              if (response.status === 200) {
                if (response.data[0] === "success") {
                  notyf.success(response.data[1]);
                  vm.onReset();
                  vm.$bvModal.hide(vm.modal_form_cliente);
                  this.fGetListCliente();
                }
                if (response.data[0] === "error") {
                  notyf.error(response.data[1]);
                }
              } else {
                console.log(response.response.data.errors);
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
          console.log(this.form);
          ServiceCliente.alterarCliente(this.form)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                console.log(response.data.success);
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_cliente);
                this.fGetListCliente();
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
          ServiceCliente.excluirCliente(this.form.id)
            .then((obj) => {
              if (obj.status === 200) {
                notyf.success(obj.data.success);
                this.onReset();
                this.$bvModal.hide(this.modal_form_cliente);
                this.fGetListCliente();
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
    cepDebounce(id) {
      axios
        .get("https://cep.awesomeapi.com.br/json/" + id)
        .then((resp) => {
          this.form.logradouro = resp.data.address;
          this.form.bairro = resp.data.district;
        })
        .catch((errors) => {
          notyf.error(errors.response.data.message);
          this.form.logradouro = "";
          this.form.bairro = "";
        });
    },
    cidadeDebounce(id) {
      this.isLoadingCidade = true;
      let vm = this;
      ServiceCidade.getById(id).then((response) => {
        if (response.status === 200) {
          vm.form.cidade = response.data[0].cidade;
          this.isLoadingCidade = false;
        } else {
          vm.form.cidade = "";
          vm.form.id_cidade = "";
          this.isLoadingCidade = false;
          notyf.error("Cidade não encontrado");
        }
      });
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb;
}
</style>
