<template>
  <div>
    <b-modal
      :id="modal_form_compra"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
      :dialog-class="customDialogClass"
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
              <div class="col-md-6">
                <div class="row col-md-12 col-sm-12">
                  <div class="col-md-4 col-sm-4">
                    <label
                      >Modelo:<b style="color: rgb(245, 153, 153)"> *</b></label
                    >
                    <b-form-input
                      id="modelo"
                      type="number"
                      placeholder="Modelo"
                    ></b-form-input>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <label
                      >Série:<b style="color: rgb(245, 153, 153)"> *</b></label
                    >
                    <b-form-input
                      id="serie"
                      type="number"
                      placeholder="Série"
                    ></b-form-input>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <label
                      >Numero:<b style="color: rgb(245, 153, 153)"> *</b></label
                    >
                    <b-form-input
                      id="numero"
                      type="number"
                      placeholder="Número"
                    ></b-form-input>
                    <small style="font-size: 11px; color: red"></small>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <label>Data Emissão:</label>
                    <b-form-input id="data_emissão" type="date"></b-form-input>
                    <small style="font-size: 11px; color: red"></small>
                  </div>
                  <div class="col-md-4">
                    <label>Data Chegada:</label>
                    <b-form-input id="data_chegada" type="date"></b-form-input>
                    <small style="font-size: 11px; color: red"></small>
                  </div>
                </div>
              </div>
              <!-- d-flex align-items-center -->
              <div class="col-md-6">
                <div class="row col-md-12 col-sm-12">
                  <div class="col-md-3 col-sm-4">
                    <label>Código:</label>
                    <b-form-input
                      id="id_fornecedor"
                      type="number"
                      placeholder="Código"
                    ></b-form-input>
                    <small style="font-size: 11px; color: red"></small>
                  </div>
                  <div class="col-md-9 col-sm-8">
                    <label
                      >Fornecedor:<b style="color: rgb(245, 153, 153)">
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
                        ></b-form-input>
                        <b-input-group-append>
                          <b-button
                            text="Button"
                            variant="dark"
                            :disabled="form.disabled"
                            title="Pesquisar Fornecedor"
                          >
                            <i class="bx bx-search"></i>
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <small style="font-size: 11px; color: red"></small>
                    </b-overlay>
                  </div>
                </div>
              </div>
            </div>
            <!-- card Produto -->
            <div class="mt-4" :class="{ card_produto_disabled: false }">
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
                          id="produto"
                          type="text"
                          placeholder="Produto"
                          disabled
                        >
                        </b-form-input>
                        <b-input-group-append>
                          <b-button
                            text="Button"
                            variant="dark"
                            :disabled="form.disabled"
                            title="Pesquisar Produto"
                          >
                            <i class="bx bx-search"></i>
                          </b-button>
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
                <div class="row mt-2">
                  <div class="col-md-3">
                    <label
                      >Quantidade:<b style="color: rgb(245, 153, 153)"> *</b>
                    </label>
                    <b-form-input
                      id="quantidade"
                      type="number"
                      placeholder="Quantidade"
                    >
                    </b-form-input>
                  </div>
                  <div class="col-md-3">
                    <label
                      >Valor Unitário:<b style="color: rgb(245, 153, 153)">
                        *</b
                      >
                    </label>
                    <b-input-group>
                      <template #prepend>
                        <b-input-group-text
                          style="background-color: #212529; color: white"
                          >R$</b-input-group-text
                        >
                      </template>
                      <b-form-input
                        id="valor_unitario"
                        type="number"
                        placeholder="0,00"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </div>
                  <div class="col-md-3">
                    <label
                      >Desconto:<b style="color: rgb(245, 153, 153)">
                        *</b
                      ></label
                    >
                    <b-input-group>
                      <template #prepend>
                        <b-input-group-text
                          style="background-color: #212529; color: white"
                          >%</b-input-group-text
                        >
                      </template>
                      <b-form-input
                        id="desconto"
                        type="number"
                        placeholder="0,00"
                      ></b-form-input>
                    </b-input-group>
                  </div>
                  <div class="col-md-3" style="line-height: 85px">
                    <b-button class="btn btn-sm" type="button" variant="dark">
                      Adicionar Produto
                    </b-button>
                  </div>
                </div>
                <!-- Tabela Produtos -->
                <div class="row mt-02" style="margin-top: 20px">
                  <div class="container mt-02 table-responsive">
                    <table class="table">
                      <thead class="fixed-header">
                        <tr
                          class="table text-center"
                          style="background: #212529; color: white"
                        >
                          <th scope="col" class="tableTr">Cód</th>
                          <th scope="col" class="tableTr">Produto</th>
                          <th scope="col" class="tableTr">Unidade</th>
                          <th scope="col" class="tableTr">Qtd</th>
                          <th scope="col" class="tableTr">R$ Uni</th>
                          <th scope="col" class="tableTr">Sub Total</th>
                          <th scope="col" class="tableTr">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="tableTr text-center"
                          :class="{ disabled: !form.parcelas[key].desativar }"
                          v-for="(item, key) in form.parcelas"
                          :key="key"
                        >
                          <td class="col-md-1">
                            <input
                              type="text"
                              v-model="form.parcelas[key].parcela"
                              class="form-control text-center"
                              disabled="true"
                            />
                          </td>
                          <td class="col-md-2">
                            <input
                              type="number"
                              v-model="form.parcelas[key].prazo"
                              class="form-control text-center"
                              :class="{
                                'fail-error': form.parcelas[key].mgsPrazo,
                              }"
                              :disabled="!form.parcelas[key].editing"
                            />
                            <small
                              style="font-size: 11px; color: rgb(228 96 96)"
                              v-if="form.parcelas[key].mgsPrazo"
                            >
                              {{ validationMsg($v.validationParcela.prazo) }}
                            </small>
                          </td>
                          <td class="col-md-2">
                            <input
                              type="number"
                              v-model="form.parcelas[key].porcentagem"
                              class="form-control text-center"
                              :class="{
                                'fail-error': form.parcelas[key].mgsPorcentagem,
                              }"
                              :disabled="!form.parcelas[key].editing"
                            />
                            <small
                              style="font-size: 11px; color: rgb(228 96 96)"
                              v-if="form.parcelas[key].mgsPorcentagem"
                            >
                              {{
                                validationMsg($v.validationParcela.porcentagem)
                              }}
                              {{
                                validationMsg(
                                  $v.validationParcela.TotalValorPecent
                                )
                              }}
                            </small>
                          </td>
                          <td>
                            <b-input-group>
                              <b-form-input
                                class="text-center"
                                id="formapagemento"
                                type="text"
                                v-model="
                                  form.parcelas[key].formaPagamento[0].forma_pg
                                "
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
                                  :disabled="!form.parcelas[key].editing"
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
                            <div v-if="!form.parcelas[key].editing">
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
                                title="SALVAR"
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
                <template #footer>
                  <div class="row">
                    <div class="col-md-9 text-end mr-0 centered-text">
                      <label for="input-default"><b>Total da Compra:</b></label>
                    </div>
                    <div class="col-md-3">
                      <b-input-group>
                        <template #prepend>
                          <b-input-group-text
                            style="background-color: #212529; color: white"
                            >R$</b-input-group-text
                          >
                        </template>
                        <b-form-input
                          id="total_compra"
                          type="number"
                          placeholder="0,00"
                          disabled
                        ></b-form-input>
                      </b-input-group>
                    </div>
                  </div>
                </template>
              </b-card>
            </div>
            <!-- card Condição Pagamento -->
            <div class="mt-4" :class="{ card_condicao_disabled: false }">
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
      customDialogClass: "my-custom-modal-dialog",
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
.centered-text {
  line-height: 38px; /* A mesma altura definida na div para centralizar verticalmente */
}
.prepend-00 {
  background-color: black;
  font-size: 24px;
  color: white;
}
.card_produto_disabled {
  pointer-events: none; /* Impede interações com elementos filhos */
  opacity: 0.5; /* Opacidade reduzida para indicar desabilitação */
}
.card_condicao_disabled {
  pointer-events: none; /* Impede interações com elementos filhos */
  opacity: 0.5; /* Opacidade reduzida para indicar desabilitação */
}
.my-custom-modal-dialog.modal-dialog {
  max-width: 1400px; /* Defina o tamanho máximo horizontal desejado */
  margin: 30px auto; /* Para centralizar verticalmente o modal na tela */
}
</style>
