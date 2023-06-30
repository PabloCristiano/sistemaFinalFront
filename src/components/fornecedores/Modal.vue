<template>
  <div>
    <b-modal :id="modal_form_fornecedor" size="xl" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
      <template v-slot:modal-header>
        <h5>{{ form.titulo }}</h5>
        <b-button style="border: 0" size="sm" variant="outline-light" @click="closeFornecedor()">
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Fornecedor">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12">
              <div class="col-sm-4 col-md-4" @click="clearInput()">
                <b-form-group label="Tipo Pessoa:" v-on="FuncSelectedPeople()" :disabled="form.radio">
                  <b-form-radio-group v-model="selectedPeople" :options="options" name="plain-inline"
                    plain></b-form-radio-group>
                </b-form-group>
              </div>
              <div class="col-sm-4 col-md-8"></div>
            </div>
            <!-- <div class="mt-1">Selected: <strong>{{ selectedPeople }}</strong></div> -->
            <div class="row col-12 mt-2">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id" type="text" placeholder="Id" v-model="form.id" disabled>
                </b-form-input>
              </div>
              <div class="col-md-5">
                <label>{{ texto }}<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="razaoSocial" type="text" :placeholder="placeholder"
                  :class="{ 'fail-error': $v.form.razaoSocial.$error }" v-model="form.razaoSocial"
                  :title="form.razaoSocial" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.razaoSocial) }}
                </small>
              </div>
              <div class="col-md-5" v-if="visibleDivTipoPessoa">
                <label>Nome Fantasia:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="nomeFantasia" type="text" v-model="form.nomefantasia"
                  :class="{ 'fail-error': $v.form.nomefantasia.$error }" placeholder="Digite Nome Fantasia"
                  :title="form.nomeFantasia" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.nomefantasia) }}
                </small>
              </div>
              <div class="col-md-5" v-else>
                <label>Apelido:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="apelido" type="text" v-model="form.apelido"
                  :class="{ 'fail-error': $v.form.apelido.$error }" placeholder="Digite um Apelido" :title="form.apelido"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.apelido) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2" v-if="visibleDivTipoPessoa">
              <div class="col-md-6">
                <label>CNPJ:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="form.cnpj" type="text" v-model="form.cnpj"
                  :class="{ 'fail-error': $v.form.cnpj.$error }" placeholder="CNPJ" v-mask="'##.###.###/####-##'"
                  :maxlength="form.maxCnpj" :minlength="form.maxCnpj" :title="form.cnpj" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cnpj) }}
                </small>
                <!-- <small style="font-size: 10px;">Somente Numero inteiro</small> -->
              </div>
              <div class="col-md-6">
                <label>Inscrição Estadual:</label>
                <b-form-input id="ie" type="text" v-model="form.ie" placeholder="Inscrição Estadual" :title="form.ie"
                  :disabled="form.disabled">
                </b-form-input>
              </div>
            </div>
            <div class="row col-12 mt-2" v-else>
              <div class="col-md-6">
                <label>CPF:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="form.cpf" type="text" v-model="form.cpf" :class="{ 'fail-error': $v.form.cpf.$error }"
                  placeholder="Número CPF" v-mask="'###.###.###-##'" :maxlength="form.maxCpf" :title="form.cpf"
                  :disabled="form.disabled">
                </b-form-input>
                <!-- <small style="font-size: 10px;">Somente Numero inteiro</small> -->
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cpf) }}
                </small>
              </div>
              <div class="col-md-6">
                <label>RG:</label>
                <b-form-input id="rg" type="text" v-model="form.rg" placeholder="Número do RG" v-mask="'#######-#'"
                  :maxlength="form.maxRg" :title="form.rg" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  <!-- {{ validationMsg($v.form.ddd) }} -->
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-3">
                <label>CEP:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="cep" type="text" v-model="form.cep" placeholder="_____-___"
                  v-debounce:1000ms="cepDebounce" v-mask="'#####-###'" :class="{ 'fail-error': $v.form.cep.$error }"
                  :maxlength="form.maxCep" :minlength="form.maxCep" :title="form.cep" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cep) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Logradouro:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="logradouro" type="text" v-model="form.logradouro" placeholder="Logradouro"
                  :class="{ 'fail-error': $v.form.logradouro.$error }" :title="form.logradouro" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.logradouro) }}
                </small>
              </div>
              <div class="col-md-2">
                <label>Número:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="numero" type="text" v-model="form.numero" placeholder="Número"
                  :class="{ 'fail-error': $v.form.numero.$error }" :title="form.numero" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.numero) }}
                </small>
              </div>
              <div class="col-md-3">
                <label>Complemento:</label>
                <b-form-input id="complemento" type="text" v-model="form.complemento" placeholder="Complemento"
                  :title="form.complemento" :disabled="form.disabled">
                </b-form-input>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-3">
                <label>Bairro:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="complemento" type="text" v-model="form.bairro"
                  :class="{ 'fail-error': $v.form.bairro.$error }" placeholder="Bairro" :title="form.bairro"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.bairro) }}
                </small>
              </div>
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id_estado" type="number" v-model="form.id_cidade" placeholder="Código"
                  :class="{ 'fail-error': $v.form.id_cidade.$error }" v-debounce:1000ms="cidadeDebounce"
                  :title="form.id_cidade" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_cidade) }}
                </small>
              </div>
              <div class="col-md-7">
                <label>Cidade:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-overlay :show="isLoadingCidade" rounded="sm">
                  <b-input-group>
                    <b-form-input id="cidade" type="text" v-model="form.cidade" placeholder="Cidade"
                      :class="{ 'fail-error': $v.form.cidade.$error }" disabled :title="form.cidade">
                    </b-form-input>
                    <b-input-group-append>
                      <b-button @click="showSearchCidade()" text="Button" variant="dark" :disabled="form.disabled"
                        title="Pesquisar Cidade"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small style="font-size: 11px; color: red">
                    {{ validationMsg($v.form.cidade) }}
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>WhatsApp:</label>
                <b-form-input id="whatsapp" type="text" v-model="form.whatsapp" placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'" :maxlength="form.maxWhatsapp" :title="form.whatsapp"
                  :disabled="form.disabled">
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label>Telefone:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="telefone" type="text" v-model="form.telefone" placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'" :class="{ 'fail-error': $v.form.telefone.$error }"
                  :maxlength="form.maxTelefone" :title="form.telefone" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.telefone) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>E-mail:</label>
                <b-form-input id="email" type="text" v-model="form.email" placeholder="Contato@contato.com"
                  :title="form.email" :disabled="form.disabled" :class="{ 'fail-error': $v.form.email.$error }">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.email) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-6">
                <label>Site:</label>
                <b-form-input id="form.pagSite" type="text" v-model="form.pagSite"
                  :class="{ 'fail-error': $v.form.pagSite.$error }" placeholder="http://www.exemplo.com"
                  :title="form.pagSite" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.pagSite) }}
                </small>
              </div>
              <div class="col-md-6">
                <label>Contato:</label>
                <b-form-input id="contato" type="text" v-model="form.contato" placeholder="Contato" :title="form.contato"
                  :disabled="form.disabled" :class="{ 'fail-error': $v.form.contato.$error }">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.contato) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-3">
                <label>Limite de Crédito:</label>
                <b-input-group prepend="R$">
                  <b-form-input id="limiteCredito" type="text" v-model="form.limiteCredito" placeholder="0,00"
                    :title="form.limiteCredito" :disabled="form.disabled">
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id_condicaopg" type="number" v-model="form.id_condicaopg" value="487"
                  :class="{ 'fail-error': $v.form.id_condicaopg.$error }" placeholder="Código" :title="form.id_condicaopg"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_condicaopg) }}
                </small>
              </div>
              <div class="col-md-7">
                <label>Condição Pagamento:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-overlay :show="false" rounded="sm">
                  <b-input-group>
                    <b-form-input id="condicaopg" type="text" v-model="form.condicaopg" :value="30 / 60 / 90"
                      :class="{ 'fail-error': $v.form.condicaopg.$error }" placeholder="Condição Pagamento" disabled
                      :title="form.condicaopg">
                    </b-form-input>
                    <b-input-group-append>
                      <b-button text="Button" variant="dark" :disabled="form.disabled"
                        title="Pesquisar Condição de Pagamento"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                          height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></b-button>
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
                <b-form-textarea id="obs" v-model="form.obs" placeholder="Digite alguma Observação..." rows="3"
                  max-rows="6" :title="form.obs" :disabled="form.disabled"></b-form-textarea>
              </div>
            </div>
            <small class="mt-2" style="font-size: 12px">Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small>
          </b-form>
        </slot>
        <slot name="botao">
          <div class="d-flex justify-content-end">
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="closeFornecedor()">
              Cancelar
            </b-button>
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="onSubmit()">
              {{ form.btn }}<i class="bx bx-check"></i>
            </b-button>
          </div>
        </slot>
        <slot name="rodape">
          <div class="col-12">
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Criação:</b> {{ form.data_create |
              formataDataTempo
            }}</small>
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Ult-Alteração:</b> {{ form.data_alt |
              formataDataTempo
            }}</small>
          </div>
        </slot>
      </b-card>
    </b-modal>
    <b-modal :id="modal_search_cidade" size="xl" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
      <template v-slot:modal-header>
        <h5>Pesquisar Cidade</h5>
        <b-button style="border: 0" size="sm" variant="outline-light" @click="fecharModalSearchCidade()">
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCidade :functionCidade="changeSearchCidade"></HomeCidade>
      </b-container>
      <b-container class="col-sm-12 col-md-12 mt-3" style="text-align: center;" footer>
        <b-button @click="fecharModalSearchCidade()" type="button" id="" class="btn btn-dark btn-sm">Fechar
          Pesquisa Cidade</b-button>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import HomeCidade from "../cidade/HomeCidade.vue";
import { Notyf } from "notyf";
import axios from "axios";
import { ServiceCidade } from "../../services/serviceCidade";
import { ServiceFornecedor } from "../../services/serviceFornecedor";
import Rules from "../../rules/rules";
import { formataDataTempo } from '../../rules/filters';
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
};
export default {
  props: {
    formulario: { type: Object },
    funcOnReset: { type: Function },
    functionGetListFornecedor: { type: Function }
  },
  components: { HomeCidade },
  data() {
    return {
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_fornecedor: 'modal_form_fornecedor',
      modal_search_cidade: 'modal_search_cidade',
      selectedPeople: 'JURIDICA',
      options: [
        { text: 'Pessoa Juridica', value: 'JURIDICA' },
        { text: 'Pessoa Física', value: 'FISICA' },
      ],
      visibleDivTipoPessoa: true,
      texto: 'Razão Social:',
      placeholder: "Digite nome Razão Social",
      isValidadCnpj: true,
      isLoadingCidade: false,
    };
  },
  filters: {
    formataDataTempo
  },
  validations: {
    form: {
      razaoSocial: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      nomefantasia: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      apelido: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
      cnpj: {
        required: validators.required,
        txtMinLen: validators.minLength(18),
        txtCnpj: Rules.ValidarCnpj
      },
      cpf: {
        required: validators.required,
        txtMinLen: validators.minLength(14),
        txtMaxLen: validators.maxLength(14),
        txtCpf: Rules.ValidarCpf
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
        integer: validators.integer
      },
      bairro: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
        txtMaxLen: validators.maxLength(30),
      },
      id_cidade: {
        required: validators.required,
        integer: validators.integer
      },
      cidade: {
        required: validators.required,
      },
      id_condicaopg: {
        required: validators.required,
        integer: validators.integer
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
        email: validators.email
      },
      pagSite: {
        txtUrl: validators.url
      },
      contato: {
        txtMinLen: validators.minLength(3),
        txtMaxLen: validators.maxLength(50),
      }
    },
  },
  created() {
  },
  watch: {
    selectedPeople: function () {
      this.visibleDivTipoPessoa = this.selectedPeople === "JURIDICA" ? true : false;
      this.texto = this.selectedPeople === "JURIDICA" ? 'Razão Social:' : ' Nome Completo:';
      this.placeholder = this.selectedPeople === "JURIDICA" ? 'Digite nome Razão Social' : 'Digite Nome Completo';
      this.clearInput();
    }
  },
  methods: {
    FuncSelectedPeople() {
      if (this.form.titulo === "Alterar Fornecedor") {
        this.selectedPeople = this.form.tipo_pessoa;
      }
      if (this.form.titulo === "Excluir Fornecedor") {
        this.selectedPeople = this.form.tipo_pessoa;
      }
    },
    fGetListFornecedor() {
      this.functionGetListFornecedor();
    },
    clearInput() {
      if (this.form.titulo === "Cadastrar Fornecedor") {
        this.$v.$reset();
        this.form.cnpj = '';
        this.form.cpf = '';
        this.form.apelido = '';
        this.form.nomefantasia = '';
      }
    },
    validationMsg: validationMessage(formMessages),
    showSearchCidade() {
      // this.form.id_cidade = "";
      // this.form.cidade = "";
      this.$bvModal.show(this.modal_search_cidade);
    },
    fecharModalSearchCidade() {
      this.$bvModal.hide(this.modal_search_cidade);
    },
    changeSearchCidade(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_cidade = obj.row.id;
      this.form.cidade = obj.row.cidade;
      this.$bvModal.hide(this.modal_search_cidade);
    },
    closeFornecedor() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_fornecedor);
    },
    onReset() {
      this.$v.$reset();
      this.selectedPeople = 'JURIDICA';
      this.funcOnReset();
    },
    onSubmit() {
      const vm = this;
      this.$v.form.cnpj.$model = this.selectedPeople == "FISICA" ? '23.597.681/0001-12' : this.form.cnpj;
      this.$v.form.cpf.$model = this.selectedPeople == "JURIDICA" ? '048.376.259-83' : this.form.cpf;
      this.$v.form.apelido.$model = this.selectedPeople == "JURIDICA" ? 'Apelido' : this.form.apelido;
      this.$v.form.nomefantasia.$model = this.selectedPeople == "FISICA" ? 'nomeFantasia' : this.form.nomefantasia;
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        if (this.form.btn === 'Salvar') {
          this.form.tipo_pessoa = this.selectedPeople;
          ServiceFornecedor.storeFornecedor(this.form)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                if (response.data[0] === "success") {
                  notyf.success(response.data[1]);
                  vm.onReset();
                  vm.$bvModal.hide(vm.modal_form_fornecedor);
                  this.functionGetListFornecedor();
                }
                if (response.data[0] === "error") {
                  notyf.error(response.data[1].errorInfo[2]);
                }
              } else {
                console.log(response.response.data.errors)
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
          ServiceFornecedor.alterarFornecedor(this.form)
            .then(response => {
              if (response.status === 200) {
                console.log(response.data.success);
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_fornecedor);
                this.functionGetListFornecedor();
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
          ServiceFornecedor.excluirFornecedor(this.form.id)
            .then((obj) => {
              if (obj.status === 200) {
                notyf.success(obj.data.success);
                this.onReset();
                this.$bvModal.hide(this.modal_form_fornecedor);
                this.functionGetListFornecedor();
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
      axios.get('https://cep.awesomeapi.com.br/json/' + id).then(resp => {
        this.form.logradouro = resp.data.address;
        this.form.bairro = resp.data.district;
      }).catch(errors => {
        notyf.error(errors.response.data.message);
        this.form.logradouro = "";
        this.form.bairro = "";
        // this.form.numero = "";
        // this.form.complemento = "";
      });
    },
    cidadeDebounce(id) {
      this.isLoadingCidade = true;
      let vm = this;
      ServiceCidade.getById(id).then(response => {
        if (response.status === 200) {
          vm.form.cidade = response.data[0].cidade;
          this.isLoadingCidade = false;
        } else {
          vm.form.cidade = '';
          vm.form.id_cidade = '';
          this.isLoadingCidade = false;
          notyf.error('Cidade não encontrado');
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
  