<template>
  <div class="container" style="margin-bottom: -90px">
    <b-card class="mt-0 mb-5" :header-html="textCard_Compra">
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
                    v-model="form.modelo"
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
                    v-model="form.serie"
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
                    v-model="form.numero"
                  ></b-form-input>
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
                    v-model="form.id_fornecedor"
                    :title="form.id_fornecedor"
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
                        v-model="form.fornecedor"
                        :title="form.fornecedor"
                        disabled
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button
                          text="Button"
                          variant="dark"
                          :disabled="form.disabled"
                          @click="showSearchFornecedor()"
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
              <div class="row col-md-12 col-sm-12 justify-content-end">
                <div class="col-md-6 col-sm-6">
                  <label>Data Emissão:</label>
                  <b-form-input
                    id="data_emissão"
                    type="date"
                    v-model="form.data_emissao"
                    :max="maxDate"
                  ></b-form-input>
                  <small style="font-size: 11px; color: red"></small>
                  <!-- <small
                    v-if="max_isDateInvalid"
                    style="font-size: 11px; color: red"
                    >A data não pode ser maior que a data atual.</small
                  > -->
                </div>
                <div class="col-md-6 col-sm-6">
                  <label>Data Chegada:</label>
                  <b-form-input
                    id="data_chegada"
                    type="date"
                    v-model="form.data_chegada"
                    :min="minDate"
                  ></b-form-input>
                  <small style="font-size: 11px; color: red"></small>
                </div>
              </div>
            </div>
          </div>
          <!-- card Produto -->
          <!-- :class="{ card_produto_disabled: !todosParametrosPreenchidos }" -->
          <!-- class="mt-4" -->
          <transition name="slow-motion" appear>
            <div v-if="todosParametrosPreenchidos" class="slow-motion-div mt-4">
              <b-card :header-html="textCard_Produto" class="text-start">
                <div v-if="mostrarBlocoProduto" class="row mt-02">
                  <div class="col-md-2">
                    <label>Código:</label>
                    <b-form-input
                      id="id_produto"
                      v-model="form.id_produto"
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
                          v-model="form.produto"
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
                            @click="showSearchProduto()"
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
                      v-model="form.unidade"
                      type="text"
                      placeholder="Unidade"
                      disabled
                    >
                    </b-form-input>
                  </div>
                </div>
                <div v-if="mostrarBlocoProduto" class="row mt-2">
                  <div class="col-md-3">
                    <label
                      >Quantidade:<b style="color: rgb(245, 153, 153)"> *</b>
                    </label>
                    <b-form-input
                      id="quantidade"
                      v-model="form.quantidade"
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
                        v-model="form.valor_unitario"
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
                        v-model="form.desconto"
                        type="number"
                        placeholder="0,00"
                      ></b-form-input>
                    </b-input-group>
                  </div>
                  <div class="col-md-3" style="line-height: 85px">
                    <b-button
                      @click.prevent="addProducts()"
                      class="btn btn-sm"
                      type="button"
                      variant="dark"
                    >
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
                          <th scope="col" class="table_Tr">Cód</th>
                          <th scope="col" class="table_Tr">Produto</th>
                          <th scope="col" class="table_Tr">Unidade</th>
                          <th scope="col" class="table_Tr">Qtd</th>
                          <th scope="col" class="table_Tr">Valor Uni(R$)</th>
                          <th scope="col" class="table_Tr">Desc(%)</th>
                          <th scope="col" class="table_Tr">Sub Total(R$)</th>
                          <th scope="col" class="table_Tr">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="text-center"
                          :class="{ disabled: !form.produtos[key].desativar }"
                          v-for="(item, key) in form.produtos"
                          :key="key"
                        >
                          <td class="col-md-1 col-sm-1 table_Td" title="10">
                            <input
                              id="codigo"
                              type="text"
                              class="form-control text-center"
                              :value="item.id_produto"
                              disabled
                            />
                          </td>
                          <td class="col-md-4 col-sm-4 table_Td">
                            <input
                              id="produto"
                              type="text"
                              class="form-control text-start"
                              :value="item.produto.produto"
                              disabled
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="unidade"
                              type="text"
                              class="form-control text-center"
                              :value="item.unidade"
                              disabled
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="quantidade"
                              type="number"
                              class="form-control text-center"
                              v-model="item.qtd_produto"
                              :disabled="!item.editing"
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="valor_unitario"
                              type="text"
                              class="form-control text-center"
                              :value="item.valor_unitario"
                              disabled
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="desconto"
                              type="text"
                              class="form-control text-center"
                              v-model="item.desconto"
                              :disabled="!item.editing"
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="subTotal"
                              type="text"
                              :value="item.total_produto"
                              class="form-control text-center"
                              disabled
                            />
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <div v-if="!form.produtos[key].editing">
                              <button
                                class="btn btn-sm me-1 mb-1 mt-1"
                                type="button"
                                title="EDITAR"
                                @click.prevent="toggleEditingProdutos(key)"
                                style="background-color: rgb(254 255 7 / 56%)"
                              >
                                <i class="bx bx-edit-alt"></i>
                              </button>
                              <button
                                class="btn btn-sm me-1 mb-1 mt-1"
                                type="button"
                                title="EXCLUIR"
                                @click.prevent="deleteItemProduto(key)"
                                style="background-color: rgb(235 32 63 / 65%)"
                              >
                                <i class="bx bx-trash-alt"></i>
                              </button>
                            </div>
                            <div v-else>
                              <button
                                class="btn btn-sm me-1 mb-1 mt-1"
                                type="button"
                                title="SALVAR"
                                @click="saveChangesProdutos(key)"
                                style="background-color: #28a74563"
                              >
                                <i class="bx bx-check"></i>
                              </button>
                              <button
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
                <div class="row mt-2">
                  <div class="row">
                    <div class="col-md-9 text-end mr-0 centered-text">
                      <label for="input-default"
                        ><b>Total dos Produtos:</b></label
                      >
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
                          v-model="form.total_produtos"
                          :value="form.total_produtos"
                          disabled
                        ></b-form-input>
                      </b-input-group>
                    </div>
                  </div>
                </div>
                <template #footer>
                  <div class="row">
                    <div class="col-md-3">
                      <label>Frete:</label>
                      <b-form-input
                        id="frete"
                        v-model="form.frete"
                        type="number"
                        placeholder="0,00"
                      >
                      </b-form-input>
                      <small style="font-size: 11px; color: red"> </small>
                    </div>
                    <div class="col-md-3">
                      <label>Seguro:</label>
                      <b-form-input
                        id="seguro"
                        v-model="form.seguro"
                        type="number"
                        placeholder="0,00"
                      >
                      </b-form-input>
                      <small style="font-size: 11px; color: red"> </small>
                    </div>
                    <div class="col-md-3">
                      <label>Outras Despesas:</label>
                      <b-form-input
                        id="outras_despesas"
                        v-model="form.outras_despesas"
                        type="number"
                        placeholder="0,00"
                      >
                      </b-form-input>
                      <small style="font-size: 11px; color: red"> </small>
                    </div>
                    <div class="col-md-3">
                      <label for="input-default"><b>Total da Compra:</b></label>
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
                          v-model="form.total_compra"
                          :value="form.total_compra"
                          disabled
                        ></b-form-input>
                      </b-input-group>
                    </div>
                  </div>
                </template>
              </b-card>
            </div>
          </transition>
          <!-- card Condição Pagamento -->
          <transition name="slow-motion" appear>
            <div v-if="todosParametrosPreenchidos" class="slow-motion-div mt-4">
              <b-card
                :header-html="textCard_CondicaoPagamento"
                class="text-start"
              >
                <div class="col-md-6">
                  <div class="row col-md-12 col-sm-12">
                    <div class="col-md-3 col-sm-4">
                      <label>Código:</label>
                      <b-form-input
                        id="id_condicaopg"
                        type="number"
                        v-model="form.id_condicaopg"
                        placeholder="Código"
                      ></b-form-input>
                      <small style="font-size: 11px; color: red"></small>
                    </div>
                    <div class="col-md-9 col-sm-8">
                      <label
                        >Condição de Pagamento:<b
                          style="color: rgb(245, 153, 153)"
                        >
                          *</b
                        ></label
                      >
                      <b-overlay :show="false" rounded="sm">
                        <b-input-group>
                          <b-form-input
                            id="fornecedor"
                            type="text"
                            placeholder="Condição de Pagamento"
                            v-model="form.condicaopg"
                            disabled
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              text="Button"
                              variant="dark"
                              :disabled="form.disabled"
                              title="Pesquisar Condição de Pagamento"
                              @click.prevent="showSearchCondicaoPagamento()"
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
                <!-- Tabela Condição Pagamento -->
                <div class="row mt-02" style="margin-top: 20px">
                  <div class="container mt-02 table-responsive">
                    <table class="table">
                      <thead class="fixed-header">
                        <tr
                          class="table text-center"
                          style="background: #212529; color: white"
                        >
                          <th scope="col" class="table_Tr">Parcela</th>
                          <th scope="col" class="table_Tr">
                            Forma de Pagamento
                          </th>
                          <th scope="col" class="table_Tr">Vencimento</th>
                          <th scope="col" class="table_Tr">
                            Valor Parcela(R$)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="text-center"
                          v-for="(item, key) in form.condicaopagamento"
                          :key="key"
                        >
                          <td class="col-md-2 table_Td">
                            <input
                              id="parcela"
                              type="text"
                              class="form-control text-center"
                              :value="item.parcela"
                              disabled
                            />
                          </td>
                          <td class="col-md-4 table_Td">
                            <input
                              id="formaPagamento"
                              type="text"
                              class="form-control text-center"
                              :value="item.formaPagamento"
                              disabled
                            />
                          </td>
                          <td class="col-md-3 table_Td">
                            <input
                              id="vencimento"
                              type="text"
                              class="form-control text-center"
                              :value="item.Vencimento"
                              disabled
                            />
                          </td>
                          <td class="col-md-3 table_Td">
                            <input
                              id="valor_parcela"
                              type="text"
                              class="form-control text-center"
                              :value="item.valorParcela"
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <label for="">Observações:</label>
                  <b-form-textarea
                    id="observacao"
                    v-model="form.observacao"
                    placeholder="Observações"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>
              </b-card>
            </div>
          </transition>
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
            Salvar<i class="bx bx-check"></i>
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
    <!-- Modal HomeFornecedor -->
    <b-modal
      :id="modal_search_fornecedor"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Fornecedor</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchFornecedor()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeFornecedor
          :functionFornecedor="changeSearchFornecedor"
        ></HomeFornecedor>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchFornecedor()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Fornecedor</b-button
        >
      </b-container>
    </b-modal>
    <!-- Modal HomeProduto -->
    <b-modal
      :id="modal_search_Produto"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Fornecedor</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchProduto()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeProduto :functionProduto="changeSearchProduto"></HomeProduto>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchProduto()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Produto</b-button
        >
      </b-container>
    </b-modal>
    <!-- Modal HomeCondicão Pagamento -->
    <b-modal
      :id="modal_search_condicaoPagamento"
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
          @click="fecharModalSearchCondicaoPagamento()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCondicaoPagamento
          :functionCondicao="changeSearchCondicaoPagamento"
        ></HomeCondicaoPagamento>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchCondicaoPagamento()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Condicão de Pagamento</b-button
        >
      </b-container>
    </b-modal>
    <br /><br />
  </div>
</template>
<script>
import HomeFornecedor from "../fornecedores/HomeFornecedor.vue";
import HomeProduto from "../produto/HomeProduto.vue";
import HomeCondicaoPagamento from "../condicaoPagamento/HomeCondicaoPagamento.vue";
import {
  currency,
  inverterDataPtBR,
  currencyFormat,
  currency_percentual,
  formatarDataParaPtBR,
  extrairNumero
} from "../../rules/filters";
import { Decimal } from "decimal.js";
// import { decimal } from "vuelidate/lib/validators";
// import { Notyf } from "notyf";
// const notyf = new Notyf({
//   position: {
//     x: "center",
//     y: "top",
//   },
//   types: [
//     {
//       type: "warning",
//       background: "orange",
//       icon: {
//         className: "material-icons",
//         tagName: "i",
//         text: "warning",
//       },
//     },
//     {
//       type: "error",
//       background: "indianred",
//       duration: 5000,
//       dismissible: true,
//     },
//   ],
// });
export default {
  props: {
    formulario: { type: Object }
  },
  components: { HomeFornecedor, HomeProduto, HomeCondicaoPagamento },
  data() {
    return {
      modal_search_fornecedor: "modal_search_fornecedor",
      modal_search_Produto: "modal_search_Produto",
      modal_search_condicaoPagamento: "modal_search_condicaoPagamento",
      textCard_Produto:
        "<span class='Text-Card-0'><i class='bx bx-cart'></i> Produto</span>",
      textCard_CondicaoPagamento:
        "<span class='Text-Card-0'><i class='bx bx-wallet'></i> Condição de Pagamento</span>",
      textCard_Compra:
        "<span class='Text-Card-0'><i class='bx bx-spreadsheet'></i> Pedido de Compra</span>",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      customDialogClass: "my-custom-modal-dialog",
      modal_form_compra: "modal_form_compra",
      form: {
        modelo: "",
        serie: "",
        numero: "",
        id_fornecedor: "",
        fornecedor: "",
        id_condicaopg: "",
        condicaopg: "",
        data_emissao: "",
        data_chegada: "",
        id_produto: "",
        produto: "",
        unidade: "",
        quantidade: "",
        valor_unitario: "",
        desconto: "",
        total_compra: "",
        total_produto: "",
        total_produtos: "",
        frete: "",
        seguro: "",
        outras_despesas: "",
        observacao: "",
        produtos: [],
        condicaopagamento: []
      },
      maxDate: "", // Define a data máxima como a data atual
      minDate: "", // Define a data mínima como a data atual
      mostrarBlocoProduto: true, // quando for pra adicionar o produto ele vai aparcer quando for visualizar irar sumir
      disabled: false,
      obj_condicao: {},
      buttonLock: false
    };
  },
  beforeCreate() {},
  filters: {},
  created() {
    this.form.data_emissao = this.obterDataAtual();
    this.form.data_chegada = this.obterDataAtual();
    if (!this.formulario) {
      this.$router.push({ name: "compra" });
    } else {
      this.setCompra(this.formulario);
      this.form.frete = this.form.frete.toFixed(2);
      this.form.seguro = this.form.seguro.toFixed(2);
      this.form.outras_despesas = this.form.outras_despesas.toFixed(2);
    }
  },
  computed: {
    todosParametrosPreenchidos() {
      return (
        this.form.modelo !== "" &&
        this.form.serie !== "" &&
        this.form.numero !== "" &&
        this.form.id_fornecedor !== "" &&
        this.form.fornecedor !== ""
      );
    }
    // max_isDateInvalid() {
    //   const data_emissao = new Date(this.data_emissao);
    //   const maxDate = new Date();
    //   maxDate.setHours(0, 0, 0, 0); // Zera o horário da data atual para comparar apenas as datas
    //   return data_emissao > maxDate;
    // },
    // min_isDateInvalid() {
    //   const selectedDate = new Date(this.data_chegada);
    //   const currentDate = new Date();
    //   currentDate.setHours(0, 0, 0, 0); // Zera o horário da data atual para comparar apenas as datas
    //   return selectedDate < currentDate;
    // },
  },
  watch: {
    "form.frete"(newValue) {
      this.form.total_compra = this.calcTotalProduto(this.form.produtos);
      this.calcularTotalFrete(this.form.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.form.seguro !== null &&
          this.form.seguro !== undefined &&
          this.form.seguro !== ""
        ) {
          soma = soma + parseFloat(this.form.seguro);
        }

        if (
          this.form.outras_despesas !== null &&
          this.form.outras_despesas !== undefined &&
          this.form.outras_despesas !== ""
        ) {
          soma = soma + parseFloat(this.form.outras_despesas);
        }
        soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
        format = soma1 + soma;
        this.form.total_compra = format.toFixed(2);
      }
      if (this.form.condicaopagamento.length > 0) {
        var num = 0;
        num = parseFloat(this.form.total_compra);
        num = currency(num);
        this.setCondicaoPagamento(this.obj_condicao, num);
      }
    },
    "form.seguro"(newValue) {
      this.form.total_compra = this.calcTotalProduto(this.form.produtos);
      this.calcularTotalSeguro(this.form.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.form.frete !== null &&
          this.form.frete !== undefined &&
          this.form.frete !== ""
        ) {
          soma = soma + parseFloat(this.form.frete);
        }

        if (
          this.form.outras_despesas !== null &&
          this.form.outras_despesas !== undefined &&
          this.form.outras_despesas !== ""
        ) {
          soma = soma + parseFloat(this.form.outras_despesas);
        }

        soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
        format = soma1 + soma;
        this.form.total_compra = format.toFixed(2);
      }
      if (this.form.condicaopagamento.length > 0) {
        var num = 0;
        num = parseFloat(this.form.total_compra);
        num = currency(num);
        this.setCondicaoPagamento(this.obj_condicao, num);
      }
    },
    "form.outras_despesas"(newValue) {
      this.form.total_compra = this.calcTotalProduto(this.form.produtos);
      this.calcularTotalOutrasDespesas(this.form.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.form.frete !== null &&
          this.form.frete !== undefined &&
          this.form.frete !== ""
        ) {
          soma = soma + parseFloat(this.form.frete);
        }

        if (
          this.form.seguro !== null &&
          this.form.seguro !== undefined &&
          this.form.seguro !== ""
        ) {
          soma = soma + parseFloat(this.form.seguro);
        }

        soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
        format = soma1 + soma;
        this.form.total_compra = format.toFixed(2);
      }
      if (this.form.condicaopagamento.length > 0) {
        var num = 0;
        num = parseFloat(this.form.total_compra);
        num = currency(num);
        this.setCondicaoPagamento(this.obj_condicao, num);
      }
    }
    // max_isDateInvalid(result) {
    //   if (result) {
    //     this.data_emissao = this.obterDataAtual();
    //     notyf.error("A Data Emissão não pode ser maior que a data atual");
    //   }
    // },
    // min_isDateInvalid(result) {
    //   if (result) {
    //     this.data_chegada = this.obterDataAtual();
    //     notyf.error("A Data Chegada não pode ser menor que a data atual");
    //   }
    // },
  },
  methods: {
    closeCompra() {
      //   this.onReset();
      this.$bvModal.hide(this.modal_form_compra);
      this.$router.push({ name: "compra" });
    },
    onSubmit() {
      alert("enviar");
      console.log(this.form);
    },
    changeSearchFornecedor(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_fornecedor = obj.row.id;
      this.form.fornecedor = obj.row.razaoSocial;
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    showSearchFornecedor() {
      this.$bvModal.show(this.modal_search_fornecedor);
    },
    showSearchCondicaoPagamento() {
      this.$bvModal.show(this.modal_search_condicaoPagamento);
    },
    fecharModalSearchFornecedor() {
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    changeSearchProduto(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      const precoVenda = obj.row.precoVenda;
      this.form.id_produto = obj.row.id;
      this.form.produto = obj.row.produto;
      this.form.unidade = obj.row.unidade;
      this.form.valor_unitario = precoVenda.toFixed(2);
      this.$bvModal.hide(this.modal_search_Produto);
    },
    changeSearchCondicaoPagamento(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      var valor_compra = currency(parseFloat(this.form.total_compra));
      this.setCondicaoPagamento(obj.row, valor_compra);
      this.$bvModal.hide(this.modal_search_condicaoPagamento);
    },
    showSearchProduto() {
      this.$bvModal.show(this.modal_search_Produto);
    },
    fecharModalSearchProduto() {
      this.$bvModal.hide(this.modal_search_Produto);
    },
    fecharModalSearchCondicaoPagamento() {
      this.$bvModal.hide(this.modal_search_condicaoPagamento);
    },
    obterDataAtual() {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda se necessário
      const dia = String(dataAtual.getDate()).padStart(2, "0"); // Adiciona zero à esquerda se necessário
      const dataFormatada = `${ano}-${mes}-${dia}`;
      return dataFormatada;
    },
    setCompra(obj) {
      if (obj) {
        (this.form.modelo = obj.modelo),
          (this.form.serie = obj.serie),
          (this.form.numero = obj.numero_nota),
          (this.form.id_fornecedor = obj.fornecedor.id),
          (this.form.fornecedor = obj.fornecedor.razaoSocial),
          (this.form.data_emissao = inverterDataPtBR(obj.data_emissao)),
          (this.form.data_chegada = obj.data_chegada),
          (this.form.produtos = obj.produtos),
          this.form.produtos.map(function (produtos) {
            produtos.valor_unitario = currencyFormat(produtos.valor_unitario);
            produtos.total_produto = currencyFormat(produtos.total_produto);
            produtos.desconto = currency_percentual(produtos.desconto);
            produtos.desativar = true;
            produtos.editing = false;
            return produtos;
          }),
          (this.form.total_produtos = this.calcTotalProduto(
            this.form.produtos
          ));
        (this.form.total_produto = obj.valor_produto),
          (this.form.frete = obj.frete),
          (this.form.seguro = obj.seguro),
          (this.form.outras_despesas = obj.outras_despesas),
          (this.mostrarBlocoProduto = false);
        this.form.observacao = obj.observacao;
        this.form.total_compra = obj.valor_compra;
        this.setCondicaoPagamento(
          obj.condicao_pagamento,
          this.form.total_compra
        );
        this.form.total_compra = extrairNumero(obj.valor_compra);
      }
    },
    calcSomaTotalCompra(array) {
      let soma = 0;
      let format;
      array.forEach(function (valor) {
        soma += valor.total_produto;
      });
      format = currencyFormat(soma);
      return format;
    },
    addProducts() {
      var id_produto = "";
      var produto = "";
      var unidade = "";
      var nDesconto = parseFloat(this.form.desconto);
      var quantidade = 0;
      var valor_unitario = 0;
      var Valor_total_produto = 0;
      var desconto = 0;
      var valorDesconto = 0;
      var subTotal = 0;
      var decimal = new Decimal(this.form.valor_unitario);
      var f_valor_unitario = 0;
      id_produto = this.form.id_produto;
      produto = this.form.produto;
      unidade = this.form.unidade;
      quantidade = this.form.quantidade;
      valor_unitario = parseFloat(this.form.valor_unitario).toFixed(2);
      f_valor_unitario = parseFloat(decimal);
      Valor_total_produto = quantidade * valor_unitario;
      desconto = this.calcPorcentagem(
        parseFloat(this.form.desconto).toFixed(2)
      );
      valorDesconto = Valor_total_produto * desconto;
      subTotal = Valor_total_produto - valorDesconto;
      this.form.produtos.push({
        id_produto: id_produto,
        produto: { produto: produto },
        unidade: unidade,
        qtd_produto: quantidade,
        valor_unitario: currencyFormat(f_valor_unitario),
        desconto: currency_percentual(nDesconto),
        total_produto: currencyFormat(subTotal),
        desativar: true,
        editing: false
      });
      this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
      this.form.total_compra = this.form.total_produtos;
      this.clearInputsListProducts();
    },
    calcPorcentagem(porcentagem) {
      return porcentagem / 100;
    },
    clearInputsListProducts() {
      (this.form.id_produto = ""),
        (this.form.produto = ""),
        (this.form.quantidade = ""),
        (this.form.valor_unitario = ""),
        (this.form.desconto = ""),
        (this.form.unidade = "");
    },
    calcTotalProduto(obj) {
      let soma = 0;
      let soma2 = 0;
      let format = 0;
      for (let i = 0; i < obj.length; i++) {
        let decimal = new Decimal(obj[i].total_produto.replace(",", "."));
        format = decimal;
        soma2 = parseFloat(format);
        soma += soma2;
      }
      return soma.toFixed(2);
    },
    calcularTotalFrete(valorCompra, frete) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(frete);

      if (
        this.form.seguro !== null &&
        this.form.seguro !== undefined &&
        this.form.seguro !== ""
      ) {
        soma = soma + parseFloat(this.form.seguro);
      }
      if (
        this.form.outras_despesas !== null &&
        this.form.outras_despesas !== undefined &&
        this.form.outras_despesas !== ""
      ) {
        soma = soma + parseFloat(this.form.outras_despesas);
      }

      this.form.total_compra = soma.toFixed(2);
    },
    calcularTotalSeguro(valorCompra, seguro) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(seguro);

      if (
        this.form.frete !== null &&
        this.form.frete !== undefined &&
        this.form.frete !== ""
      ) {
        soma = soma + parseFloat(this.form.frete);
      }
      if (
        this.form.outras_despesas !== null &&
        this.form.outras_despesas !== undefined &&
        this.form.outras_despesas !== ""
      ) {
        soma = soma + parseFloat(this.form.outras_despesas);
      }

      this.form.total_compra = soma.toFixed(2);
    },
    calcularTotalOutrasDespesas(valorCompra, outras_despesas) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(outras_despesas);

      if (
        this.form.frete !== null &&
        this.form.frete !== undefined &&
        this.form.frete !== ""
      ) {
        soma = soma + parseFloat(this.form.frete);
      }
      if (
        this.form.seguro !== null &&
        this.form.seguro !== undefined &&
        this.form.seguro !== ""
      ) {
        soma = soma + parseFloat(this.form.seguro);
      }
      this.form.total_compra = soma.toFixed(2);
    },
    setCondicaoPagamento(obj, valor_compra) {
      this.obj_condicao = obj;
      this.form.id_condicaopg = obj.id;
      this.form.condicaopg = obj.condicao_pagamento;
      var valorCompra = extrairNumero(valor_compra);
      this.form.condicaopagamento = [];
      for (var i = 0; i < obj.qtd_parcela; i++) {
        var Vencimento = "";
        var valor_parcela = 0;
        var datavencimento = "";
        Vencimento = new Date(this.form.data_emissao);
        Vencimento.setDate(Vencimento.getDate() + obj.parcelas[i].prazo);
        datavencimento = Vencimento.toISOString().substr(0, 10);
        valor_parcela = valorCompra;
        this.form.condicaopagamento.push({
          parcela: obj.parcelas[i].parcela,
          formaPagamento: obj.parcelas[i].formaPagamento[0].forma_pg,
          Vencimento: formatarDataParaPtBR(datavencimento),
          valorParcela: (valor_parcela * obj.parcelas[i].porcentagem) / 100
        });
      }
      this.form.condicaopagamento.map(function (c) {
        c.valorParcela = currency(c.valorParcela);
      });
    },
    deleteItemProduto(index) {
      this.form.produtos.splice(index, 1);
      this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
      this.form.total_compra = this.form.total_produtos;

      if (this.form.condicaopagamento.length > 0) {
        var num = 0;
        num = parseFloat(this.form.total_compra);
        if (num > 0) {
          num = currency(num);
          this.setCondicaoPagamento(this.obj_condicao, num);
        } else {
          this.form.condicaopagamento = [];
          this.form.id_condicaopg = "";
          this.form.condicaopg = "";
        }
      }
    },
    toggleEditingProdutos(index) {
      this.form.produtos[index].editing = !this.form.produtos[index].editing;
      this.buttonLock = true;
      //desativar linhas na tabela
      this.form.produtos.forEach((row, rowIndex) => {
        row.desativar = rowIndex === index; // Ativa ou desativa a linha clicada
      });
    },
    saveChangesProdutos(index) {
      console.log(this.form.produtos[index]);
      var quantidade = 0;
      var valor_unitario = 0;
      var Valor_total_produto = 0;
      var desconto = 0;
      var valorDesconto = 0;
      var subTotal = 0;
      // this.form.produtos[index].qtd_produto = parseFloat(this.form.produtos[index].qtd_produto);
      quantidade = parseFloat(this.form.produtos[index].qtd_produto);
      valor_unitario = extrairNumero(this.form.produtos[index].valor_unitario);
      desconto = this.calcPorcentagem(
        extrairNumero(this.form.produtos[index].desconto)
      );
      Valor_total_produto = quantidade * valor_unitario;
      valorDesconto = desconto * Valor_total_produto;
      subTotal = Valor_total_produto - valorDesconto;
      this.form.produtos[index].total_produto = currencyFormat(subTotal);
      this.form.produtos[index].desconto = currency_percentual(desconto * 100);
      console.log(
        quantidade,
        desconto,
        valorDesconto,
        valor_unitario,
        Valor_total_produto,
        subTotal,
        this.form.produtos[index].desconto
      );

      //this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
      //this.form.total_compra = this.form.total_produtos;

      //desativar linhas Tabela
      this.form.produtos.forEach((row) => {
        row.desativar = true;
      });
      this.form.produtos[index].editing = false;
      this.buttonLock = false;
    }
  }
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
  max-width: 1700px; /* Defina o tamanho máximo horizontal desejado */
  margin: 30px auto; /* Para centralizar verticalmente o modal na tela */
}
.table_Tr {
  font-family: monospace;
  font-weight: 100;
  font-size: 13px;
}
.table_Td {
  font-family: inherit;
  font-weight: 100;
}

.slow-motion-enter-active,
.slow-motion-leave-active {
  transition: all 0.3s; /* Ajuste o valor da transição para controlar a velocidade */
}
.slow-motion-enter,
.slow-motion-leave-to {
  opacity: 0;
  transform: scale(0.3); /* Ajuste conforme necessário */
}
.disabled {
  pointer-events: none; /* Impede interações com elementos filhos */
  opacity: 0.5; /* Opacidade reduzida para indicar desabilitação */
}
</style>
