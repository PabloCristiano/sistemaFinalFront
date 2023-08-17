<template>
  <div class="container" style="margin-bottom: -90px">
    <b-card class="mt-0 mb-5" :header-html="form.headerForm">
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
                    v-model="modelo"
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
                    v-model="serie"
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
                    v-model="numero"
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
                    v-model="id_fornecedor"
                    :title="id_fornecedor"
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
                        v-model="fornecedor"
                        :title="fornecedor"
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
                    v-model="data_emissao"
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
                    v-model="data_chegada"
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
                      v-model="id_produto"
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
                          v-model="produto"
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
                      v-model="unidade"
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
                      v-model="quantidade"
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
                        v-model="valor_unitario"
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
                        v-model="desconto"
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
                          v-for="(item, key) in produtos"
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
                              type="text"
                              class="form-control text-center"
                              :value="item.qtd_produto"
                              disabled
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
                              :value="item.desconto"
                              disabled
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
                            <div v-if="true">
                              <button
                                class="btn btn-sm me-1 mb-1 mt-1"
                                type="button"
                                title="EDITAR"
                                style="background-color: rgb(254 255 7 / 56%)"
                              >
                                <i class="bx bx-edit-alt"></i>
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
                            <div v-else>
                              <button
                                class="btn btn-sm me-1 mb-1 mt-1"
                                type="button"
                                title="SALVAR"
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
                          v-model="total_produtos"
                          :value="total_produtos"
                          disabled
                        ></b-form-input>
                      </b-input-group>
                    </div>
                  </div>
                </div>
                <template #footer>
                  <div class="row">
                    <div class="col-md-3">
                      <label
                        >Frete:</label
                      >
                      <b-form-input
                        id="frete"
                        v-model="frete"
                        type="number"
                        placeholder="0,00"
                      >
                      </b-form-input>
                      <small style="font-size: 11px; color: red"> </small>
                    </div>
                    <div class="col-md-3">
                      <label
                        >Seguro:</label
                      >
                      <b-form-input
                        id="seguro"
                        v-model="seguro"
                        type="number"
                        placeholder="0,00"
                      >
                      </b-form-input>
                      <small style="font-size: 11px; color: red"> </small>
                    </div>
                    <div class="col-md-3">
                      <label
                        >Outras Despesas:</label
                      >
                      <b-form-input
                        id="outras_despesas"
                        v-model="outras_despesas"
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
                          v-model="total_compra"
                          :value="total_compra"
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
                        id="id_fornecedor"
                        type="number"
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
                            disabled
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              text="Button"
                              variant="dark"
                              :disabled="form.disabled"
                              title="Pesquisar Condição de Pagamento"
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
                          v-for="(item, key) in condicaopagamento"
                          :key="key"
                        >
                          <td class="col-md-2 table_Td">
                            <input
                              id="codigo"
                              type="text"
                              class="form-control text-center"
                              value="10"
                              disabled
                            />
                          </td>
                          <td class="col-md-6 table_Td">
                            <input
                              id="produto"
                              type="text"
                              class="form-control text-start"
                              value="Podada Reviver"
                              disabled
                            />
                          </td>
                          <td class="col-md-2 table_Td">
                            <input
                              id="unidade"
                              type="text"
                              class="form-control text-center"
                              value="Uni"
                              disabled
                            />
                          </td>
                          <td class="col-md-2 table_Td">
                            <input
                              id="quantidade"
                              type="text"
                              class="form-control text-center"
                              value="15"
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
                    id="textarea"
                    placeholder="Enter something..."
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
    <br /><br />
  </div>
</template>
<script>
import HomeFornecedor from "../fornecedores/HomeFornecedor.vue";
import HomeProduto from "../produto/HomeProduto.vue";
import {
  currency,
  inverterDataPtBR,
  currency_percentual,
} from "../../rules/filters";
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
    formulario: { type: Object },
  },
  components: { HomeFornecedor, HomeProduto },
  data() {
    return {
      modal_search_fornecedor: "modal_search_fornecedor",
      modal_search_Produto: "modal_search_Produto",
      textCard_Produto:
        "<span class='Text-Card-0'><i class='bx bx-cart'></i> Produto</span>",
      textCard_CondicaoPagamento:
        "<span class='Text-Card-0'><i class='bx bx-wallet'></i> Condição de Pagamento</span>",
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      customDialogClass: "my-custom-modal-dialog",
      modal_form_compra: "modal_form_compra",
      modelo: "",
      serie: "",
      numero: "",
      id_fornecedor: "",
      fornecedor: "",
      data_emissao: "",
      data_chegada: "",
      id_produto: "",
      produto: "",
      unidade: "",
      quantidade: "",
      valor_unitario: "",
      desconto: "",
      disabled: false,
      produtos: [],
      condicaopagamento: [],
      maxDate: "", // Define a data máxima como a data atual
      minDate: "", // Define a data mínima como a data atual
      mostrarBlocoProduto: true, // quando for pra adicionar o produto ele vai aparcer quando for visualizar irar sumir
      total_compra: "",
      total_produto: "",
      total_produtos: "",
      frete: "",
      seguro: "",
      outras_despesas: "",
    };
  },
  beforeCreate() {},
  filters: {},
  created() {
    if (!this.form) {
      this.$router.push({ name: "compra" });
    } else {
      this.setCompra(this.form);
      this.frete = this.frete.toFixed(2);
      this.seguro = this.seguro.toFixed(2);
      this.outras_despesas = this.outras_despesas.toFixed(2);
    }
    // this.data_emissao = this.obterDataAtual();
    // this.data_chegada = this.obterDataAtual();
    // this.maxDate = this.obterDataAtual();
    // this.minDate = this.obterDataAtual();
  },
  computed: {
    todosParametrosPreenchidos() {
      return (
        this.modelo !== "" &&
        this.serie !== "" &&
        this.numero !== "" &&
        this.id_fornecedor !== "" &&
        this.fornecedor !== ""
      );
    },
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
    frete(newValue) {
      this.total_compra = this.calcTotalProduto(this.produtos);
      this.calcularTotalFrete(this.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.seguro !== null &&
          this.seguro !== undefined &&
          this.seguro !== ""
        ) {
          soma = soma + parseFloat(this.seguro);
        }
        if (
          this.outras_despesas !== null &&
          this.outras_despesas !== undefined &&
          this.outras_despesas !== ""
        ) {
          soma = soma + parseFloat(this.seguro);
        }
        soma1 = parseFloat(this.calcTotalProduto(this.produtos));
        format = soma1 + soma;
        this.total_compra = format.toFixed(2);
      }
    },
    seguro(newValue) {
      this.total_compra = this.calcTotalProduto(this.produtos);
      this.calcularTotalSeguro(this.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.frete !== null &&
          this.frete !== undefined &&
          this.frete !== ""
        ) {
          soma = soma + parseFloat(this.frete);
        }

        if (
          this.outras_despesas !== null &&
          this.outras_despesas !== undefined &&
          this.outras_despesas !== ""
        ) {
          soma = soma + parseFloat(this.outras_despesas);
        }

        soma1 = parseFloat(this.calcTotalProduto(this.produtos));
        format = soma1 + soma;
        this.total_compra = format.toFixed(2);
      }
    },
    outras_despesas(newValue) {
      this.total_compra = this.calcTotalProduto(this.produtos);
      this.calcularTotalOutrasDespesas(this.total_compra, newValue);
      if (!newValue) {
        let soma = 0;
        let soma1 = 0;
        let format = 0;
        if (
          this.frete !== null &&
          this.frete !== undefined &&
          this.frete !== ""
        ) {
          soma = soma + parseFloat(this.frete);
        }

        if (
          this.seguro !== null &&
          this.seguro !== undefined &&
          this.seguro !== ""
        ) {
          soma = soma + parseFloat(this.seguro);
        }

        soma1 = parseFloat(this.calcTotalProduto(this.produtos));
        format = soma1 + soma;
        this.total_compra = format.toFixed(2);
      }
    },
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
    },
    changeSearchFornecedor(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.id_fornecedor = obj.row.id;
      this.fornecedor = obj.row.razaoSocial;
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    showSearchFornecedor() {
      this.$bvModal.show(this.modal_search_fornecedor);
    },
    fecharModalSearchFornecedor() {
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    changeSearchProduto(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      const precoVenda = obj.row.precoVenda;
      this.id_produto = obj.row.id;
      this.produto = obj.row.produto;
      this.unidade = obj.row.unidade;
      this.valor_unitario = precoVenda.toFixed(2);
      this.$bvModal.hide(this.modal_search_Produto);
    },
    showSearchProduto() {
      this.$bvModal.show(this.modal_search_Produto);
    },
    fecharModalSearchProduto() {
      this.$bvModal.hide(this.modal_search_Produto);
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
      console.log(obj);
      let num = 0;
      if (obj) {
        (this.modelo = obj.modelo),
          (this.serie = obj.serie),
          (this.numero = obj.numero_nota),
          (this.id_fornecedor = obj.fornecedor.id),
          (this.fornecedor = obj.fornecedor.razaoSocial),
          (this.data_emissao = inverterDataPtBR(obj.data_emissao)),
          (this.data_chegada = obj.data_chegada),
          (this.produtos = obj.produtos),
          (this.total_produtos = this.calcTotalProduto(this.produtos));
        (num = this.somarArrayComForEach(this.produtos)),
          (this.total_compra = num.toFixed(2)),
          this.produtos.map(function (produtos) {
            produtos.valor_unitario = currency(produtos.valor_unitario);
            produtos.total_produto = currency(produtos.total_produto);
            produtos.desconto = currency_percentual(produtos.desconto);
            return produtos;
          }),
          (this.total_produto = obj.valor_produto),
          (this.frete = obj.frete),
          (this.seguro = obj.seguro),
          (this.outras_despesas = obj.outras_despesas),
          (this.mostrarBlocoProduto = false);
      }
    },
    somarArrayComForEach(array) {
      let soma = 0;
      array.forEach(function (valor) {
        soma += valor.total_produto;
      });
      return soma;
    },
    addProducts() {
      // console.log(
      //   this.id_produto,
      //   this.produto,
      //   this.quantidade,
      //   this.valor_unitario,
      //   this.desconto,
      //   this.unidade
      // );
      var id_produto = "";
      var produto = "";
      var unidade = "";
      var nDesconto = parseFloat(this.desconto);
      var quantidade = 0;
      var valor_unitario = 0;
      var Valor_total_produto = 0;
      var desconto = 0;
      var valorDesconto = 0;
      var subTotal = 0;

      id_produto = this.id_produto;
      produto = this.produto;
      unidade = this.unidade;
      quantidade = parseFloat(this.quantidade);
      valor_unitario = parseFloat(this.valor_unitario);
      Valor_total_produto = quantidade * valor_unitario;
      desconto = this.calcPorcentagem(parseFloat(this.desconto));
      valorDesconto = Valor_total_produto * desconto;
      subTotal = Valor_total_produto - valorDesconto;

      this.produtos.push({
        id_produto: id_produto,
        produto: { produto: produto },
        unidade: unidade,
        qtd_produto: quantidade,
        valor_unitario: valor_unitario,
        desconto: nDesconto,
        total_produto: subTotal,
      });
      this.total_produtos = this.calcTotalProduto(this.produtos);
      this.total_compra = this.total_produtos;
      this.clearInputsListProducts();
    },
    calcPorcentagem(porcentagem) {
      return porcentagem / 100;
    },
    clearInputsListProducts() {
      (this.id_produto = ""),
        (this.produto = ""),
        (this.quantidade = ""),
        (this.valor_unitario = ""),
        (this.desconto = ""),
        (this.unidade = "");
    },
    calcTotalProduto(obj) {
      let soma = 0;
      for (let i = 0; i < obj.length; i++) {
        soma += obj[i].total_produto;
      }
      return soma.toFixed(2);
    },
    calcularTotalFrete(valorCompra, frete) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(frete);

      if (
        this.seguro !== null &&
        this.seguro !== undefined &&
        this.seguro !== ""
      ) {
        soma = soma + parseFloat(this.seguro);
      }
      if (
        this.outras_despesas !== null &&
        this.outras_despesas !== undefined &&
        this.outras_despesas !== ""
      ) {
        soma = soma + parseFloat(this.seguro);
      }

      this.total_compra = soma.toFixed(2);
    },
    calcularTotalSeguro(valorCompra, seguro) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(seguro);

      if (
        this.frete !== null &&
        this.frete !== undefined &&
        this.frete !== ""
      ) {
        soma = soma + parseFloat(this.frete);
      }
      if (
        this.outras_despesas !== null &&
        this.outras_despesas !== undefined &&
        this.outras_despesas !== ""
      ) {
        soma = soma + parseFloat(this.seguro);
      }

      this.total_compra = soma.toFixed(2);
    },
    calcularTotalOutrasDespesas(valorCompra, outras_despesas) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(outras_despesas);

      if (
        this.frete !== null &&
        this.frete !== undefined &&
        this.frete !== ""
      ) {
        soma = soma + parseFloat(this.frete);
      }
      if (
        this.seguro !== null &&
        this.seguro !== undefined &&
        this.seguro !== ""
      ) {
        soma = soma + parseFloat(this.seguro);
      }
      this.total_compra = soma.toFixed(2);
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
</style>
