<template>
  <div>
    <b-modal
      :id="modal_form_compra"
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
          @click="closeCompra()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" :header-html="form.headerForm">
        <slot name="conteudo">
          <b-form>
            <div class="row mt-2">
              <div class="col-md-4">
                <label
                  >Modelo:<b style="color: rgb(245, 153, 153)"> *</b>
                </label>
                <b-form-input id="modelo" type="number" placeholder="Modelo">
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label
                  >Série:<b style="color: rgb(245, 153, 153)"> *</b>
                </label>
                <b-form-input id="serie" type="number" placeholder="Série">
                </b-form-input>
              </div>
              <div class="col-md-4">
                <label
                  >Numero:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input id="numero" type="number" placeholder="Número">
                </b-form-input>
                <small style="font-size: 11px; color: red"> </small>
              </div>
            </div>
            <div class="row mt-02">
              <div class="col-md-2 mt-2">
                <label>Código:</label>
                <b-form-input
                  id="id_fornecedor"
                  type="number"
                  placeholder="Código"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red"> </small>
              </div>
              <div class="col-md-6 mt-2">
                <label
                  >Fornecedor:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-overlay :show="false" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="fornecedor"
                      type="text"
                      placeholder="Fornecedor"
                      disabled
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        text="Button"
                        variant="dark"
                        :disabled="form.disabled"
                        title="Pesquisar Fornecedor"
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
                  <small style="font-size: 11px; color: red"> </small>
                </b-overlay>
              </div>
              <div class="col-md-2 mt-2">
                <label>Data Emissão:</label>
                <b-form-input id="dataNasc" type="date"> </b-form-input>
                <small style="font-size: 11px; color: red"> </small>
              </div>
              <div class="col-md-2 mt-2">
                <label>Data Chegada:</label>
                <b-form-input id="dataNasc" type="date"> </b-form-input>
                <small style="font-size: 11px; color: red"> </small>
              </div>
            </div>

            <!-- card Produto -->
            <div class="mt-4">
              <b-card :header-html="textCard_Produto" class="text-start">
                <div class="row mt-02">
                  <div class="col-md-2">
                    <label>Código:</label>
                    <b-form-input
                      id="id_fornecedor"
                      type="number"
                      placeholder="Código"
                    >
                    </b-form-input>
                    <small style="font-size: 11px; color: red"> </small>
                  </div>
                  <div class="col-md-8">
                    <label
                      >Produto:<b style="color: rgb(245, 153, 153)">
                        *</b
                      ></label
                    >
                    <b-overlay :show="false" rounded="sm">
                      <b-input-group>
                        <b-form-input
                          id="fornecedor"
                          type="text"
                          placeholder="Fornecedor"
                          disabled
                        >
                        </b-form-input>
                        <b-input-group-append>
                          <b-button
                            text="Button"
                            variant="dark"
                            :disabled="form.disabled"
                            title="Pesquisar Fornecedor"
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
                      <small style="font-size: 11px; color: red"> </small>
                    </b-overlay>
                  </div>
                  <div class="col-md-2">
                    <label>Unidade:</label>
                    <b-form-input
                      id="Unidade"
                      type="number"
                      placeholder="Unidade"
                      disabled
                    >
                    </b-form-input>
                  </div>
                </div>
                <template #footer>
                  <div class="row">
                    <div class="col-md-9 text-end mr-0">
                      <label for="input-default"><b>Total da Compra:</b></label>
                    </div>
                    <div class="col-md-3">
                      <b-input-group prepend="R$">
                        <b-form-input
                          size="sm"
                          id="Unidade"
                          type="number"
                          placeholder="0,00"
                          disabled
                        >
                        </b-form-input>
                      </b-input-group>
                    </div>
                  </div>
                </template>
              </b-card>
            </div>
            <!-- card Condição Pagamento -->
            <div class="mt-4">
              <b-card
                :header-html="textCard_CondicaoPagamento"
                class="text-start"
              >
                <span>estrutura Condicao Pagamento</span>
              </b-card>
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
              @click.prevent="closeCompra()"
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
            </small>
            <small class="col-6 me-1" style="font-size: 11px"
              ><b>Data Ult-Alteração:</b>
            </small>
          </div>
        </slot>
      </b-card>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    formulario: { type: Object },
  },
  data() {
    return {
      textCard_Produto:
        "<span class='Text-Card-0'><i class='bx bx-cart'></i> Produto</span>",
      textCard_CondicaoPagamento:
        "<span class='Text-Card-0'><i class='bx bx-wallet'></i> Condição de Pagamento</span>",
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_compra: "modal_form_compra",
    };
  },
  filters: {},
  methods: {
    closeCompra() {
      //   this.onReset();
      this.$bvModal.hide(this.modal_form_compra);
    },
    onSubmit() {
      alert("enviar");
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb;
}
.Text-Card-0 {
  font-size: 18px;
  font-weight: 500;
}
</style>
