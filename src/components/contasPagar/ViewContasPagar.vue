<template>
  <div class="col-12" style="margin-bottom: -90px">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <b-card
            class="mt-0 mb-5"
            header-html="Contas a Pagar"
            style="max-width: 100rem"
          >
            <slot name="conteudo">
              <b-form>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label for="modelo">Modelo:</label>
                    <b-form-input
                      id="compra_modelo"
                      type="text"
                      placeholder="Modelo"
                      v-model="form.compra_modelo"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-md-6">
                    <label for="numero_nota">Número da Nota:</label>
                    <b-form-input
                      id="compra_numero_nota"
                      type="text"
                      placeholder="Nº da Nota"
                      v-model="form.compra_numero_nota"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="serie">Série:</label>
                    <b-form-input
                      id="compra_serie"
                      type="text"
                      placeholder="Série"
                      v-model="form.compra_serie"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-6">
                    <label for="numero_parcela">Número da Parcela:</label>
                    <b-form-input
                      id="numero_parcela"
                      type="number"
                      placeholder="Nº Parcela"
                      v-model="form.numero_parcela"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12">
                    <label for="fornecedor">Fornecedor:</label>
                    <b-form-input
                      id="fornecedor"
                      type="text"
                      placeholder="Fornecedor"
                      v-model="form.fornecedor.razaoSocial"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12">
                    <label for="forma_pagamento">Forma de Pagamento:</label>
                    <b-form-input
                      id="formaPagamento"
                      type="text"
                      placeholder="Forma de Pagamento"
                      v-model="form.formaPagamento.forma_pg"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="data_emissao">Data de Emissão:</label>
                    <b-form-input
                      id="data_emissao"
                      type="date"
                      placeholder="Data de Emissão"
                      v-model="form.data_emissao"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-6">
                    <label for="data_vencimento">Data de Vencimento:</label>
                    <b-form-input
                      id="data_vencimento"
                      type="date"
                      placeholder="Data de Vencimento"
                      v-model="form.data_vencimento"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="valor_parcela">Valor da Parcela:</label>
                    <b-form-input
                      id="valor_parcela"
                      type="text"
                      placeholder="Valor da Parcela"
                      v-model="form.valor_parcela"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-6">
                    <label for="valor_pago">Valor Pago:</label>
                    <b-form-input
                      id="valor_pago"
                      type="text"
                      placeholder="Valor Pago"
                      v-model="form.valor_pago"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="juros">Juros:</label>
                    <b-form-input
                      id="juros"
                      type="text"
                      placeholder="Juros"
                      v-model="form.juros"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-6">
                    <label for="desconto">Desconto:</label>
                    <b-form-input
                      id="desconto"
                      type="text"
                      placeholder="Desconto"
                      v-model="form.desconto"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="status">Status:</label>
                    <b-form-input
                      id="status"
                      type="text"
                      placeholder="Status"
                      v-model="form.status"
                      disabled
                    ></b-form-input>
                  </div>
                  <div class="col-6">
                    <label for="data_pagamento">Data de Pagamento:</label>
                    <b-form-input
                      id="data_pagamento"
                      type="date"
                      v-model="form.data_pagamento"
                      disabled
                    ></b-form-input>
                  </div>
                </div>
              </b-form>
            </slot>
            <slot name="botao">
              <div class="d-flex justify-content-end mt-5">
                <b-button
                  class="btn btn-sm me-1"
                  type="button"
                  variant="dark"
                  @click="returnHome"
                >
                  Voltar
                </b-button>
                <div v-if="true">
                  <b-button
                    class="btn btn-sm me-1"
                    type="button"
                    variant="dark"
                    :disabled="isStatus"
                  >
                    Baixar<i class="bx bx-check"></i>
                  </b-button>
                </div>
              </div>
            </slot>
            <slot name="rodape">
              <div class="row">
                <div class="col-md-12 col-sm-12 text-center"></div>
              </div>
            </slot>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inverterDataPtBR } from "../../rules/filters";
export default {
  props: {
    obj: { type: Object },
  },
  data() {
    return {
      form: {
        compra_modelo: "",
        compra_numero_nota: "",
        compra_serie: "",
        numero_parcela: "",
        fornecedor: {},
        formaPagamento: {},
        valor_parcela: "",
        data_emissao: "",
        data_vencimento: "",
        data_pagamento: "",
        juros: "",
        desconto: "",
        valor_pago: "",
        status: "",
        data_create: "",
        data_alt: "",
      },
      isStatus: false,
    };
  },
  created() {
    if (Object.keys(this.obj).length > 0) {
      this.setObj(this.obj);
    }
  },
  methods: {
    returnHome() {
      this.$router.push({ name: "contasPagar" });
    },
    setObj(obj) {
      this.cleanform();
      this.form.compra_modelo = obj.compra_modelo;
      this.form.compra_numero_nota = obj.compra_numero_nota;
      this.form.compra_serie = obj.compra_serie;
      this.form.numero_parcela = obj.numero_parcela;
      this.form.fornecedor = obj.fornecedor;
      this.form.formaPagamento = obj.formaPagamento;
      this.form.valor_parcela = obj.valor_parcela;
      this.form.data_emissao = inverterDataPtBR(obj.data_emissao);
      this.form.data_vencimento = inverterDataPtBR(obj.data_vencimento);
      if (obj.data_pagamento != "") {
        this.form.data_pagamento = inverterDataPtBR(obj.data_pagamento);
      } else {
        this.form.data_pagamento = obj.data_pagamento;
      }
      this.form.juros = obj.juros;
      this.form.desconto = obj.desconto;
      this.form.valor_pago = obj.valor_pago;
      this.form.status = obj.status;
      this.form.data_create = obj.data_create;
      this.form.data_alt = obj.data_alt;
      this.isStatus = this.form.status === "PAGO" ? true : false;
    },
    cleanform() {
      this.form.compra_modelo = "";
      this.form.compra_numero_nota = "";
      this.form.compra_serie = "";
      this.form.numero_parcela = "";
      this.form.fornecedor = "";
      this.form.formaPagamento = "";
      this.form.valor_parcela = "";
      this.form.data_emissao = "";
      this.form.data_vencimento = "";
      this.form.data_pagamento = "";
      this.form.juros = "";
      this.form.desconto = "";
      this.form.valor_pago = "";
      this.form.status = "";
      this.form.data_create = "";
      this.form.data_alt = "";
      this.isStatus = false;
    },
  },
};
</script>
<style></style>
