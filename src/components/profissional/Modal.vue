<template>
  <div>
    <b-modal :id="modal_form_profisional" size="xl" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
      <template v-slot:modal-header>
        <h5>{{ form.titulo }}</h5>
        <b-button style="border: 0" size="sm" variant="outline-light" @click="closeProfissional()">
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Profissional">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12">
              <div class="col-sm-4 col-md-4">
                <b-form-group label="Tipo Profissional:" :disabled="form.disabled">
                  <b-form-radio-group v-model="form.tipoProf" :options="options_tipo" name="plain-inline"
                    plain></b-form-radio-group>
                </b-form-group>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.tipoProf) }}
                </small>
              </div>
              <div class="col-sm-4 col-md-8"></div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-2">
                <label>Código:</label>
                <b-form-input id="id" type="text" placeholder="Código" v-model="form.id" disabled>
                </b-form-input>
              </div>
              <div class="col-md-5">
                <label>Profissional:<b style="color: rgb(245, 153, 153)">
                    *</b></label>
                <b-form-input id="profissional" type="text" placeholder="Nome completo" v-model="form.profissional"
                  :class="{ 'fail-error': $v.form.profissional.$error }" :title="form.profissional"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.profissional) }}
                </small>
              </div>
              <div class="col-md-5">
                <label>Apelido:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="apelido" type="text" v-model="form.apelido"
                  :class="{ 'fail-error': $v.form.apelido.$error }" placeholder="Digite Nome Fantasia"
                  :title="form.apelido" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.apelido) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>CPF:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="form.cpf" type="text" v-model="form.cpf" :class="{ 'fail-error': $v.form.cpf.$error }"
                  placeholder="Número CPF" v-mask="'###.###.###-##'" :maxlength="form.maxCpf" :title="form.cpf"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cpf) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>RG:</label>
                <b-form-input id="rg" type="text" v-model="form.rg" placeholder="Número do RG" v-mask="'#######-#'"
                  :maxlength="form.maxRg" :title="form.rg" :disabled="form.disabled">
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label>Data Nascimento:<b style="color: rgb(245, 153, 153)">
                    *</b></label>
                <b-form-input id="dataNasc" type="date" v-model="form.dataNasc"
                  :class="{ 'fail-error': $v.form.dataNasc.$error }" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.dataNasc) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-2">
                <label>CEP:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="cep" type="text" v-model="form.cep" placeholder="_____-___"
                  v-debounce:1000ms="cepDebounce" v-mask="'#####-###'" :class="{ 'fail-error': $v.form.cep.$error }"
                  :maxlength="form.maxCep" :minlength="form.maxCep" :title="form.cep" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.cep) }}
                </small>
              </div>
              <div class="col-md-3">
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
              <div class="col-md-2">
                <label>Complemento:</label>
                <b-form-input id="complemento" type="text" v-model="form.complemento" placeholder="Complemento"
                  :title="form.complemento" :disabled="form.disabled">
                </b-form-input>
              </div>
              <div class="col-md-3">
                <label>Bairro:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="bairro" type="text" v-model="form.bairro"
                  :class="{ 'fail-error': $v.form.bairro.$error }" placeholder="Bairro" :title="form.bairro"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.bairro) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
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
              <div class="col-md-4">
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
              <div class="col-md-3">
                <label>WhatsApp:</label>
                <b-form-input id="whatsapp" type="text" v-model="form.whatsapp" placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'" :maxlength="form.maxWhatsapp" :title="form.whatsapp"
                  :disabled="form.disabled">
                </b-form-input>
              </div>
              <div class="col-md-3">
                <label>Telefone:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="telefone" type="text" v-model="form.telefone" placeholder="(99) 99999-9999"
                  v-mask="'(##) #####-####'" :class="{ 'fail-error': $v.form.telefone.$error }"
                  :maxlength="form.maxTelefone" :title="form.telefone" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.telefone) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>E-mail:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="email" type="text" v-model="form.email" placeholder="Contato@contato.com"
                  :class="{ 'fail-error': $v.form.email.$error }" :title="form.email" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.email) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Senha:<b style="color: rgb(245, 153, 153)"> *</b></label>
                <b-form-input id="senha" type="password" v-model="form.senha" placeholder="Digite a senha"
                  :class="{ 'fail-error': $v.form.senha.$error }" :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.senha) }}
                </small>
              </div>
              <div class="col-md-4">
                <label>Confirme a Senha:<b style="color: rgb(245, 153, 153)">
                    *</b></label>
                <b-form-input id="confSenha" type="password" v-model="form.confSenha"
                  :class="{ 'fail-error': $v.form.confSenha.$error }" placeholder="Confirme a Senha"
                  :disabled="form.disabled">
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.confSenha) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-6" style="margin-bottom: -36px;">
                <div class="card mb-5">
                  <div class="card-header">
                    Serviço Profissional
                    <b style="color: rgb(245, 153, 153)">*</b>
                  </div>
                  <div class="card-body">
                    <div class="col-md-12" :class="{ 'fail-error': $v.form.servico.$error }">
                      <vue-good-table vgtDisabled:true :columns="columns" :rows="form.servico"
                        styleClass="vgt-table striped" :search-options="{
                          enabled: true,
                          placeholder: 'Procure por um Serviço',
                          skipDiacritics: true,
                        }" :pagination-options="{
  enabled: true,
  mode: 'records',
  perPage: 5,
  position: 'end',
  perPageDropdown: [5, 10],
  prevLabel: '',
  nextLabel: '',
  rowsPerPageLabel: 'Qtd pág',
  ofLabel: 'de',
  pageLabel: 'Pág', // for 'pages' mode
}">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field === 'btn'">
                            <a @click="excluirServico(props.row)" size="sm" class="btn btn-sm me-1 mb-1"
                              data-backdrop="static" title="EXCLUIR" style="
                                background-color: rgb(16 15 15 / 74%);
                                color: white;
                                border-radius: 4px;
                              ">
                              <i class="bx bx-trash-alt"></i>
                            </a>
                          </span>
                        </template>
                      </vue-good-table>
                    </div>
                    <small style="font-size: 11px; color: red">
                      {{ validationMsg($v.form.servico) }}
                    </small>
                  </div>
                  <div class="card-footer">
                    <div class="col-md-12 d-flex justify-content-center">
                      <div class="col-md-2">
                        <button type="button" class="btn btn-sm btn-dark" @click="addServico()">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <small class="mt-2" style="font-size: 12px">Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small>
          </b-form>
        </slot>
        <slot name="botao">
          <div class="d-flex justify-content-end">
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="closeProfissional()">
              Cancelar
            </b-button>
            <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="onSubmit()">
              {{ form.btn }}<i class="bx bx-check"></i>
            </b-button>
          </div>
        </slot>
        <slot name="rodape">
          <div class="col-12">
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Criação:</b>
              {{ form.data_create | formataDataTempo }}</small>
            <small class="col-6 me-1" style="font-size: 11px"><b>Data Ult-Alteração:</b>
              {{ form.data_alt | formataDataTempo }}</small>
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
      <b-container class="col-sm-12 col-md-12 mt-3" style="text-align: center" footer>
        <b-button @click="fecharModalSearchCidade()" type="button" id="" class="btn btn-dark btn-sm">Fechar Pesquisa
          Cidade</b-button>
      </b-container>
    </b-modal>
    <b-modal :id="modal_search_servico" size="xl" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
      <template v-slot:modal-header>
        <h5>Pesquisar Serviço</h5>
        <b-button style="border: 0" size="sm" variant="outline-light" @click="fecharModalSearchServico()">
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeServico :functionServico="changeSearchServico"></HomeServico>
      </b-container>
      <b-container class="col-sm-12 col-md-12 mt-3" style="text-align: center" footer>
        <b-button @click="fecharModalSearchServico()" type="button" id="" class="btn btn-dark btn-sm">Fechar Pesquisa
          Serviço</b-button>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import { Notyf } from "notyf";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import { formataDataTempo } from "../../rules/filters";
import Rules from "../../rules/rules";
import { VueGoodTable } from "vue-good-table";
import { ServiceCidade } from "../../services/serviceCidade";
import { ServiceProfissional } from "../../services/serviceProfissional";
import HomeCidade from "../cidade/HomeCidade.vue";
import HomeServico from "../servico/HomeServico.vue";
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
  txtMaior: () => "Profissional deve ser Maior de Idade",
};
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
export default {
  props: {
    formulario: { type: Object },
    funcOnReset: { type: Function },
    functionGetListProfissional: { type: Function },
  },
  components: { VueGoodTable, HomeCidade, HomeServico },
  data() {
    return {
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_profisional: "modal_form_profisional",
      modal_search_cidade: "modal_search_cidade",
      modal_search_servico: "modal_search_servico",
      isLoadingCidade: false,
      options_tipo: [
        { text: "Usuário", value: "USUÁRIO" },
        { text: "Administrador", value: "ADMINISTRADOR" },
      ],
      servico: this.formulario.servico,
      columns: [
        {
          label: "Serviço",
          field: "servico",
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
      a: [],
    };
  },
  filters: {
    formataDataTempo,
  },
  validations() {
    return {
      form: {
        profissional: {
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
        servico: {
          required: validators.required,
        },
        tipoProf: {
          required: validators.required,
        }
      },
    };
  },
  methods: {
    validarSenhasIguais() {
      var isvalid = this.form.senha === this.form.confSenha ? true : false;
      return isvalid;
    },
    validationMsg: validationMessage(formMessages),
    closeProfissional() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_profisional);
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
          ServiceProfissional.storeProfissional(this.form)
            .then(response => {
              if (response.status === 200) {
                if (response.data[0] === "success") {
                  notyf.success(response.data[1]);
                  vm.onReset();
                  vm.$bvModal.hide(vm.modal_form_profisional);
                  this.functionGetListProfissional();
                }
                if (response.data[0] === "error") {
                  notyf.error(response.data[1]);
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
        if (this.form.btn === "Alterar") {
          ServiceProfissional.alterarProfissional(this.form)
            .then(response => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_profisional);
                this.functionGetListProfissional();
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
        if (this.form.btn === "Excluir") {
          ServiceProfissional.excluirProfissional(this.form.id)
              .then((obj) => {
                  if (obj.status === 200) {
                      notyf.success(obj.data.success);
                      this.onReset();
                      this.$bvModal.hide(this.modal_form_profisional);
                      this.functionGetListProfissional();
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
          // this.form.numero = "";
          // this.form.complemento = "";
        });
    },
    verificaServico(servico, array) {
      // return array.includes(servico);
      for (let i = 0; i < array.length; i++) {
        if (array[i].servico === servico) {
          notyf.error("Profissional já tem esse serviço Adicionado!");
          return true;
        }
      }
      return false;
    },
    addServico() {
      this.showSearchServico();
    },
    showSearchCidade() {
      // this.form.id_cidade = "";
      // this.form.cidade = "";
      this.$bvModal.show(this.modal_search_cidade);
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
    changeSearchCidade(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_cidade = obj.row.id;
      this.form.cidade = obj.row.cidade;
      this.$bvModal.hide(this.modal_search_cidade);
    },
    fecharModalSearchCidade() {
      this.$bvModal.hide(this.modal_search_cidade);
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
      this.a = this.form.servico;
      let servico = this.verificaServico(obj.row.servico, this.a);
      if (!servico) {
        this.a.push(obj.row);
        this.form.servico = this.a;
        this.form.qtd_servico = this.form.servico.length;
        notyf.success("Serviço Adicionado com Sucesso!");
      }
      this.$bvModal.hide(this.modal_search_servico);
    },
    excluirServico(obj) {
      // encontra o índice do objeto com id
      const index = this.form.servico.findIndex(
        (servico) => servico.id === obj.id
      );
      // verifica se o objeto foi encontrado
      if (index !== -1) {
        // remove o objeto do array
        this.form.servico.splice(index, 1);
        this.form.qtd_servico = this.form.servico.length;
        notyf.success("Serviço Excluído com Sucesso!");
      }
    },
    getSelectedValue() {
      const selectedOption = this.options.find(option => option.value === this.selectedPeople);
      console.log('oi')
      if (selectedOption) {

        console.log('Label:', selectedOption.value);
      }
    }
  },
};
</script>
<style>
.fail-error {
  border: 1px solid red;
}
</style>
