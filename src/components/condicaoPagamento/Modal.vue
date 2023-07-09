<template>
  <div>
    <b-modal
      :id="modal_form_condicaoPagamento"
      size="xl"
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
          @click="closeCondicaoPagamento()"
        >
          X
        </b-button>
      </template>
      <b-card
        class="mt-0 mb-3"
        header="Formulário de cadastro Forma de Pagamento"
      >
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
                  >Condição de Pagamento:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  id="servico"
                  type="text"
                  placeholder="Condição de Pagamento"
                  :class="{ 'fail-error': $v.form.condicaoPagamento.$error }"
                  v-model="form.condicaoPagamento"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: rgb(228 96 96)">
                  {{ validationMsg($v.form.condicaoPagamento) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label>Juros:</label>
                <b-input-group append="%">
                  <b-form-input
                    id="limiteCredito"
                    type="text"
                    v-model="form.limiteCredito"
                    placeholder="0,00"
                    :title="form.limiteCredito"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <label>Multa:</label>
                <b-input-group append="%">
                  <b-form-input
                    id="limiteCredito"
                    type="text"
                    v-model="form.limiteCredito"
                    placeholder="0,00"
                    :title="form.limiteCredito"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <label>Desconto:</label>
                <b-input-group append="%">
                  <b-form-input
                    id="limiteCredito"
                    type="text"
                    v-model="form.limiteCredito"
                    placeholder="0,00"
                    :title="form.limiteCredito"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
            </div>
            <div class="row col-12 mt-02" style="margin-top: 20px" v-if="true">
              <div class="container mt-02 table-responsive">
                <table class="table">
                  <thead class="fixed-header">
                    <tr
                      class="table text-center"
                      style="background: darkslategray; color: white"
                    >
                      <th scope="col" class="tableTr">Parcela</th>
                      <th scope="col" class="tableTr">Prazo (Dias)</th>
                      <th scope="col" class="tableTr">Porcentagem (%)</th>
                      <th scope="col" class="tableTr">Forma de Pagamento</th>
                      <th scope="col" class="tableTr">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="tableTr text-center"
                      v-for="(item, key) in parcelas"
                      :key="key"
                    >
                      <td class="col-md-1">
                        <input
                          type="text"
                          v-model="parcelas[key].numero"
                          class="form-control text-center"
                          disabled="true"
                        />
                      </td>
                      <td class="col-md-2">
                        <input
                          type="number"
                          v-model="parcelas[key].prazo"
                          class="form-control text-center"
                          :disabled="!parcelas[key].editing"
                        />
                      </td>
                      <td class="col-md-2">
                        <input
                          type="number"
                          v-model="parcelas[key].porcentagem"
                          class="form-control text-center"
                          :disabled="!parcelas[key].editing"
                        />
                      </td>
                      <td>
                        <b-input-group>
                          <b-form-input
                            class="text-center"
                            id="formapagemento"
                            type="text"
                            v-model="parcelas[key].forma_pg"
                            placeholder="Pesquise uma forma de Pagamento"
                            disabled
                          >
                          </b-form-input>
                          <b-input-group-append>
                            <b-button
                              @click="showSearchformaPagamento_parcela(key)"
                              text="Button"
                              variant="dark"
                              title="Pesquisar Forma de Pagamento"
                              :disabled="!item.editing"
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
                      </td>
                      <td>
                        <div v-if="!parcelas[key].editing">
                          <button
                            @click="toggleEditingParcela(key)"
                            class="btn btn-sm me-1 mb-1 mt-1"
                            type="button"
                            title="EDITAR"
                            style="background-color: rgb(254 255 7 / 56%)"
                          >
                            <i class="bx bx-edit-alt"></i>
                          </button>
                          <button
                            @click="deleteItemParcela(key)"
                            class="btn btn-sm me-1 mb-1 mt-1"
                            type="button"
                            title="EXCLUIR"
                            style="background-color: rgb(235 32 63 / 65%)"
                          >
                            <i class="bx bx-trash-alt"></i>
                          </button>
                        </div>
                        <div v-else>
                          <button
                            @click="saveChangesParcela(key)"
                            class="btn btn-sm me-1 mb-1 mt-1"
                            type="button"
                            title="Salvar"
                            style="background-color: #28a74563"
                          >
                            <i class="bx bx-check"></i>
                          </button>
                          <button
                            @click="deleteItemParcela(key)"
                            class="btn btn-sm me-1 mb-1 mt-1"
                            type="button"
                            title="EXCLUIR"
                            style="background-color: rgb(235 32 63 / 65%)"
                          >
                            <i class="bx bx-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row col-12" style="margin-top: 15px">
              <div class="col-md-12 text-center">
                <b-button
                  class="btn btn-sm"
                  type="button"
                  variant="dark"
                  :disabled="total_porcentagem >= 100 ? true : false"
                  @click.prevent="openModelParcela()"
                >
                  Adicionar Parcela
                </b-button>
              </div>
            </div>
            <div class="row col-12 mb-3 text-end">
              <small class="mt-2" style="font-size: 10px"
                ><b>Total Porcentagem: {{ total_porcentagem }}%</b></small
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
              @click.prevent="closeCondicaoPagamento()"
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
          <div>
            <small class="" style="font-size: 10px"
              >Campos com <b style="color: rgb(245, 153, 153)">*</b> são
              obrigatórios !</small
            >
          </div>
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
    <!-- Modal Parcela -->
    <b-modal
      :id="modal_form_parcela"
      size="lg"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
      :modal-class="myclass"
    >
      <template v-slot:modal-header>
        <h5>Cadastrar Parcela</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="closePacela()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Parcela">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label
                  >Nº Parcela:<b style="color: rgb(245, 153, 153)">*</b></label
                >
                <b-form-input
                  id="id"
                  type="text"
                  placeholder="numeroParcela"
                  v-model="parcela.numero"
                  disabled
                >
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label>Prazo:<b style="color: rgb(245, 153, 153)">*</b></label>
                <b-form-input
                  id="prazo"
                  type="number"
                  placeholder="Prazo"
                  :class="{ 'fail-error': $v.parcela.prazo.$error }"
                  v-model="parcela.prazo"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: rgb(228 96 96)">
                  {{ validationMsg($v.parcela.prazo) }}
                </small>
              </div>
              <div class="col-md-4">
                <label
                  >Porcentagem:<b style="color: rgb(245, 153, 153)">*</b></label
                >
                <b-form-input
                  id="porcentagem"
                  type="number"
                  placeholder="%"
                  :class="{ 'fail-error': $v.parcela.porcentagem.$error }"
                  v-model="parcela.porcentagem"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: rgb(228 96 96)">
                  {{ validationMsg($v.parcela.porcentagem) }}
                </small>
              </div>
            </div>
            <div class="row col-12">
              <div class="col-md-12 mt-2">
                <label
                  >Forma de Pagamento:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-input-group>
                  <b-form-input
                    id="input_formaPagamento"
                    type="text"
                    v-model="parcela.forma_pg"
                    :class="{ 'fail-error': $v.parcela.forma_pg.$error }"
                    placeholder="Pesquise uma forma de Pagamento"
                    disabled
                  >
                  </b-form-input>
                  <b-input-group-append>
                    <b-button
                      @click="showSearchformaPagamento()"
                      text="Button"
                      variant="dark"
                      :disabled="form.disabled"
                      title="Pesquisar Forma de Pagamento"
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
                <small style="font-size: 11px; color: rgb(228 96 96)">
                  {{ validationMsg($v.parcela.forma_pg) }}
                </small>
              </div>
            </div>
          </b-form>
        </slot>
        <slot name="botao mb-3">
          <div class="d-flex justify-content-end mt-3">
            <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="closePacela()"
            >
              Cancelar
            </b-button>
            <b-button
              class="btn btn-sm me-1"
              type="button"
              variant="dark"
              @click.prevent="onSubmitParcela()"
              >Adicionar <i class="bx bx-check"></i>
            </b-button>
          </div>
        </slot>
        <slot name="rodape"> </slot>
      </b-card>
    </b-modal>
    <!-- modal Forma de Pagamento -->
    <b-modal
      :id="modal_search_FormaPagamento"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Forma de Pagamento</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchFormaPagamento()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeFormaPagamento
          :functionFormaPagamento="changeSearchFormaPagamento"
        ></HomeFormaPagamento>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchFormaPagamento()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Forma de Pagamento</b-button
        >
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import Rules from "../../rules/rules";
// import { ServiceFormaPagamento } from "../../services/serviceFormaPagamento.js";
import HomeFormaPagamento from "../formaPagamento/HomeFormaPagamento.vue";
import { formataDataTempo } from "../../rules/filters";
import { Notyf } from "notyf";
const formMessages = {
  required: () => "Campo Obrigatório",
  txtMinLen: ({ $params }) =>
    `Campo minimo ${$params.txtMinLen.min} characters.`,
  txtMaxLen: ({ $params }) =>
    `Campo maximo ${$params.txtMaxLen.max} characters.`,
  integer: () => "Campo deve ser um Numero inteiro",
  txtNumeroPositivo: () => "Campo deve ser Positivo/Maior que zero.",
  maxValue: () => "Campo deve ser menor ou máx 100",
};
const notyf_Parcela = new Notyf({
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
  components: { HomeFormaPagamento },
  props: {
    formulario: { type: Object },
    funcOnReset: { type: Function },
    funcgetListCondicaoPagamento: { type: Function },
  },
  data() {
    return {
      modal_form_condicaoPagamento: "modal_form_condicaoPagamento",
      modal_form_parcela: "modal_form_parcela",
      modal_search_FormaPagamento: "modal_search_FormaPagamento",
      myclass: "myclass",
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      parcela: {
        numero: 1,
        prazo: 0,
        porcentagem: 0,
        idformapg: 0,
        forma_pg: "",
      },
      parcelas: [],
      numParcela: 1,
      key_parcela: "",
      total_porcentagem: 0,
      totalVerifica: 0,
      verificaSaveParcela: 0,
    };
  },
  filters: {
    formataDataTempo,
  },
  validations: {
    form: {
      condicaoPagamento: {
        required: validators.required,
        txtMinLen: validators.minLength(3),
      },
    },
    parcela: {
      prazo: {
        required: validators.required,
        integer: validators.integer,
        txtNumeroPositivo: Rules.isPositiveNumber,
      },
      porcentagem: {
        required: validators.required,
        decimal: validators.decimal,
        maxValue: validators.maxValue(100),
        txtNumeroPositivo: Rules.isPositiveNumber,
      },
      forma_pg: {
        required: validators.required,
      },
    },
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    function_getListFormaPagamento() {
      this.funcgetListCondicaoPagamento();
    },
    onReset() {
      this.$v.form.$reset();
      this.$v.parcela.$reset();
      this.funcOnReset();
    },
    closeCondicaoPagamento() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_condicaoPagamento);
    },
    onSubmit() {
      //const vm = this;
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        this.$v.$touch();
      } else {
        if (this.form.btn === "Salvar") {
          console.log(this.form);
          //   ServiceFormaPagamento.storeFormaPagamento(this.form)
          //     .then((response) => {
          //       if (response.status === 200) {
          //         notyf.success(response.data.success);
          //         vm.onReset();
          //         vm.$bvModal.hide(vm.modal_form_formaPagamento);
          //         this.function_getListFormaPagamento();
          //       } else {
          //         if (response.response.data.errors != null) {
          //           Object.keys(response.response.data.errors).forEach(function (
          //             key
          //           ) {
          //             notyf.error(response.response.data.errors[key][0]);
          //           });
          //         }
          //       }
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
        }
        if (this.form.btn === "Alterar") {
          console.log(this.form);
          //   ServiceFormaPagamento.alterarFormaPagamento(this.form)
          //     .then((response) => {
          //       if (response.status === 200) {
          //         notyf.success(response.data.success);
          //         vm.onReset();
          //         vm.$bvModal.hide(vm.modal_form_formaPagamento);
          //         this.function_getListFormaPagamento();
          //       } else {
          //         if (response.response.data.errors != null) {
          //           Object.keys(response.response.data.errors).forEach(function (
          //             key
          //           ) {
          //             notyf.error(response.response.data.errors[key][0]);
          //           });
          //         }
          //       }
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
        }
        if (this.form.btn === "Excluir") {
          //   ServiceFormaPagamento.excluirFormaPagamento(this.form.id)
          //     .then((obj) => {
          //       if (obj.status === 200) {
          //         notyf.success(obj.data.success);
          //         this.onReset();
          //         this.$bvModal.hide(this.modal_form_formaPagamento);
          //         this.function_getListFormaPagamento();
          //       } else {
          //         if (obj.response.data.erro.length > 0) {
          //           notyf.error(obj.response.data.erro[0]);
          //         }
          //       }
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
        }
      }
    },
    openModelParcela() {
      this.onResetFormaPagamento();
      this.parcela.numero = this.numParcela;
      this.$bvModal.show(this.modal_form_parcela);
    },
    closePacela() {
      this.$v.parcela.$reset();
      this.$bvModal.hide(this.modal_form_parcela);
    },
    onSubmitParcela() {
      if (this.$v.parcela.$invalid) {
        this.$v.parcela.$touch();
      } else {
        this.totalVerifica = 0;
        this.totalVerifica =
          this.total_porcentagem + parseFloat(this.parcela.porcentagem);
        if (this.totalVerifica <= 100) {
          this.total_porcentagem =
            this.total_porcentagem + parseFloat(this.parcela.porcentagem);
          var numeroParcela = this.numParcela;
          var prazoParcela = parseFloat(this.parcela.prazo);
          var porcentagemParcela = parseFloat(this.parcela.porcentagem);
          var formaPagamentoParcela = this.parcela.forma_pg;
          var idformaPagamentoParcela = this.parcela.idformapg;
          this.parcelas.push({
            numero: numeroParcela,
            prazo: prazoParcela,
            porcentagem: porcentagemParcela,
            idformapagamento: idformaPagamentoParcela,
            forma_pg: formaPagamentoParcela,
            editing: false,
          });
          this.numParcela++;
          console.log(this.parcelas);
          this.$bvModal.hide(this.modal_form_parcela);
        } else {
          var msg = 100 - this.total_porcentagem;
          notyf_Parcela.error(
            "Total de Parcelas não podem passar de 100% !  Disponivel: " +
              msg +
              "%"
          );
        }
      }
    },
    showSearchformaPagamento() {
      this.$bvModal.show(this.modal_search_FormaPagamento);
    },
    showSearchformaPagamento_parcela(key) {
      this.key_parcela = key;
      this.$bvModal.show(this.modal_search_FormaPagamento);
    },
    fecharModalSearchFormaPagamento() {
      this.$bvModal.hide(this.modal_search_FormaPagamento);
    },
    changeSearchFormaPagamento(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.parcela.idformapg = obj.row.id;
      this.parcela.forma_pg = obj.row.forma_pg;
      this.$bvModal.hide(this.modal_search_FormaPagamento);
      if (this.parcelas[this.key_parcela]) {
        console.log("parcela");
        this.parcelas[this.key_parcela].idformapagamento = obj.row.id;
        this.parcelas[this.key_parcela].forma_pg = obj.row.forma_pg;
        return;
      }
      return;
    },
    onResetFormaPagamento() {
      this.$v.parcela.$reset();
      this.parcela.prazo = "";
      this.parcela.porcentagem = "";
      this.parcela.forma_pg = "";
      return;
    },
    toggleEditingParcela(index) {
      console.log(index, "editar");
      this.parcelas[index].editing = !this.parcelas[index].editing;
      console.log(this.parcelas);
    },
    cancelEditingParcela(index) {
      this.parcelas[index].editing = false;
    },
    saveChangesParcela(index) {
      console.log(index, "salvar", this.parcelas);
      this.total_porcentagem = 0;
      this.verificaSaveParcela = parseFloat(this.parcelas[index].porcentagem);
      for (var i = 0; i < this.parcelas.length; i++) {
        this.total_porcentagem =
          this.total_porcentagem + parseFloat(this.parcelas[i].porcentagem);
      }

      if (this.total_porcentagem > 100) {
        notyf_Parcela.error("Total de Parcelas não podem passar de 100% !");
        this.parcelas[index].porcentagem = this.verificaSaveParcela;
        this.total_porcentagem = 0;
        for (var j = 0; j < this.parcelas.length; j++) {
          this.total_porcentagem =
            this.total_porcentagem + parseFloat(this.parcelas[j].porcentagem);
        }
        this.total_porcentagem =
          this.total_porcentagem - parseFloat(this.verificaSaveParcela);
        return;
      } else {
        this.total_porcentagem = 0;
        for (var h = 0; h < this.parcelas.length; h++) {
          this.total_porcentagem =
            this.total_porcentagem + parseFloat(this.parcelas[h].porcentagem);
        }
        this.parcelas[index].editing = false;
        return;
      }
    },
    deleteItemParcela(index) {
      this.parcelas.splice(index, 1);
      this.total_porcentagem = 0;
      this.numParcela = this.numParcela - 1;

      for (var i = 0; i < this.parcelas.length; i++) {
        this.parcelas[i].numero = i + 1;
        this.total_porcentagem =
          this.total_porcentagem + parseFloat(this.parcelas[i].porcentagem);
      }
      return;
    },
    addItem() {
      this.parcelas.push({
        id: this.nextId,
        nome: "",
        email: "",
        telefone: "",
        editing: true,
      });
      this.nextId++;
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb !important;
}
.tableTr {
  font-family: monospace;
  font-weight: 100;
}
.myclass > div {
  top: 150px !important;
  height: 500px !important;
  width: 500px !important;
}
/* .myclass > .modal-dialog > .modal-content {
  background-color: red !important;
} */
</style>
