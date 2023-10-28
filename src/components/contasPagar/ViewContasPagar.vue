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
                    <input
                      type="number"
                      class="form-control"
                      id="modelo"
                      name="modelo"
                      value="55"
                      disabled
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="numero_nota">Número da Nota:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="numero_nota"
                      name="numero_nota"
                      value="1"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="serie">Série:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="serie"
                      name="serie"
                      value="1"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="numero_parcela">Número da Parcela:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="numero_parcela"
                      name="numero_parcela"
                      value="5"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12">
                    <label for="fornecedor">Fornecedor:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="fornecedor"
                      name="fornecedor"
                      value="Fornecedor XYZ"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12">
                    <label for="forma_pagamento">Forma de Pagamento:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="forma_pagamento"
                      name="forma_pagamento"
                      value="Boleto Bancário"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="data_emissao">Data de Emissão:</label>
                    <input
                      type="date"
                      class="form-control"
                      id="data_emissao"
                      name="data_emissao"
                      value="2023-10-28"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="data_vencimento">Data de Vencimento:</label>
                    <input
                      type="date"
                      class="form-control"
                      id="data_vencimento"
                      name="data_vencimento"
                      value="2024-03-26"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="valor_parcela">Valor da Parcela:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="valor_parcela"
                      name="valor_parcela"
                      value="R$ 399,52"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="valor_pago">Valor Pago:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="valor_pago"
                      name="valor_pago"
                      value="0"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="juros">Juros:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="juros"
                      name="juros"
                      value="0"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="desconto">Desconto:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="desconto"
                      name="desconto"
                      value="0"
                      disabled
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <label for="status">Status:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="status"
                      name="status"
                      value="PENDENTE"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="data_pagamento">Data de Pagamento:</label>
                    <input
                      type="date"
                      class="form-control"
                      id="data_pagamento"
                      name="data_pagamento"
                      disabled
                    />
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
export default {
  props: {
    obj: { type: Object },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.obj);
  },
  methods: {
    returnHome() {
      this.$router.push({ name: "contasPagar" });
    },
  },
};
</script>
<style></style>
