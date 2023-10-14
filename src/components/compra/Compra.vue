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
                    :class="{
                      'fail-error': $v.form.modelo.$error,
                    }"
                    ref="modelo"
                    @keydown.enter.prevent="moveFocus(1)"
                    @blur="ValidaModelo"
                    :disabled="form.desabilita_step1"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.modelo) }}
                  </small>
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
                    :class="{
                      'fail-error': $v.form.serie.$error,
                    }"
                    ref="serie"
                    @keydown.enter.prevent="moveFocus(2)"
                    :disabled="form.desabilita_step1"
                    @blur="ValidaSerie"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.serie) }}
                  </small>
                </div>
                <div class="col-md-4 col-sm-4">
                  <label
                    >Número:<b style="color: rgb(245, 153, 153)"> *</b></label
                  >
                  <b-form-input
                    id="numero_nota"
                    type="number"
                    placeholder="Número"
                    v-model="form.numero_nota"
                    :class="{
                      'fail-error': $v.form.numero_nota.$error,
                    }"
                    ref="numero_nota"
                    @blur="ValidaNumeroNota"
                    @keydown.enter.prevent="moveFocus(3)"
                    :disabled="form.desabilita_step1"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.numero_nota) }}
                  </small>
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
                    :class="{
                      'fail-error': $v.form.id_fornecedor.$error,
                    }"
                    :disabled="form.desabilita_step1"
                    ref="id_fornecedor"
                    @keydown.enter.prevent="
                      fornecedorDebounce(form.id_fornecedor)
                    "
                    @keydown.backspace="handleBackspace_fornecedor"
                    @blur="ValidaFornecedor"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.id_fornecedor) }}
                  </small>
                </div>
                <div class="col-md-9 col-sm-8">
                  <label
                    >Fornecedor:<b style="color: rgb(245, 153, 153)">
                      *</b
                    ></label
                  >
                  <b-overlay :show="isLoadingFornecedor" rounded="sm">
                    <b-input-group>
                      <b-form-input
                        id="fornecedor"
                        type="text"
                        placeholder="Fornecedor"
                        v-model="form.fornecedor"
                        :title="form.fornecedor"
                        :class="{
                          'fail-error': $v.form.fornecedor.$error,
                        }"
                        disabled
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button
                          text="Button"
                          variant="dark"
                          :disabled="form.desabilita_step1"
                          @click="showSearchFornecedor()"
                          title="Pesquisar Fornecedor"
                        >
                          <i class="bx bx-search"></i>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <small class="small-msg">
                      {{ validationMsg($v.form.fornecedor) }}
                    </small>
                  </b-overlay>
                </div>
              </div>
              <div class="row col-md-12 col-sm-12 justify-content-end">
                <div class="col-md-6 col-sm-6 mt-2">
                  <label>Data Emissão:</label>
                  <b-form-input
                    id="data_emissão"
                    type="date"
                    v-model="form.data_emissao"
                    :max="maxDate"
                    :class="{
                      'fail-error': $v.form.data_emissao.$error,
                    }"
                    :disabled="form.desabilita_step1"
                    @blur="ValidaDataEmissao"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.data_emissao) }}
                  </small>
                </div>
                <div class="col-md-6 col-sm-6 mt-2">
                  <label>Data Chegada:</label>
                  <b-form-input
                    id="data_chegada"
                    type="date"
                    v-model="form.data_chegada"
                    :class="{
                      'fail-error': $v.form.data_chegada.$error,
                    }"
                    :min="minDate"
                    :disabled="form.desabilita_step1"
                    @blur="ValidaDataChegada"
                  ></b-form-input>
                  <small class="small-msg">
                    {{ validationMsg($v.form.data_chegada) }}
                  </small>
                </div>
              </div>
            </div>
            <transition v-if="msg_1" name="slow-motion" appear>
              <div
                v-if="msg_1"
                class="mt-3 col-8 offset-2 mt-1 alert alert-success text-center"
                role="alert"
              >
                Pedido de Compra já cadastrado !
              </div>
            </transition>
          </div>
          <!-- card Produto -->
          <!-- :class="{ card_produto_disabled: !todosParametrosPreenchidos }" -->
          <!-- class="mt-4" -->
          <transition name="slow-motion" appear>
            <div
              v-if="true"
              class="slow-motion-div mt-4"
              :class="{ card_produto_disabled: false }"
            >
              <b-card :header-html="textCard_Produto" class="text-start">
                <div v-if="mostrarBlocoProduto" class="row mt-02">
                  <div class="col-md-2">
                    <label>Código:</label>
                    <b-form-input
                      id="id_produto"
                      v-model="validaProdutos.id_produto"
                      :class="{
                        'fail-error': $v.validaProdutos.id_produto.$error,
                      }"
                      type="number"
                      placeholder="Código"
                      ref="id_produto"
                      :disabled="form.desabilita_step2"
                      @keydown.enter.prevent="
                        produtoDebounce(validaProdutos.id_produto)
                      "
                      @keydown.backspace="handleBackspace_produto"
                    >
                    </b-form-input>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.id_produto) }}
                    </small>
                  </div>
                  <div class="col-md-8">
                    <label
                      >Produto:<b style="color: rgb(245, 153, 153)">
                        *</b
                      ></label
                    >
                    <b-overlay :show="isLoadingProduto" rounded="sm">
                      <b-input-group>
                        <b-form-input
                          id="produto"
                          v-model="validaProdutos.produto"
                          type="text"
                          placeholder="Produto"
                          :class="{
                            'fail-error': $v.validaProdutos.produto.$error,
                          }"
                          disabled
                        >
                        </b-form-input>
                        <b-input-group-append>
                          <b-button
                            text="Button"
                            variant="dark"
                            :disabled="form.desabilita_step2"
                            title="Pesquisar Produto"
                            @click="showSearchProduto()"
                          >
                            <i class="bx bx-search"></i>
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <small class="small-msg"> </small>
                    </b-overlay>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.produto) }}
                    </small>
                  </div>
                  <div class="col-md-2">
                    <label>Unidade:</label>
                    <b-form-input
                      id="Unidade"
                      v-model="validaProdutos.unidade"
                      type="text"
                      placeholder="Unidade"
                      :class="{
                        'fail-error': $v.validaProdutos.unidade.$error,
                      }"
                      disabled
                    >
                    </b-form-input>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.unidade) }}
                    </small>
                  </div>
                </div>
                <div v-if="mostrarBlocoProduto" class="row mt-2">
                  <div class="col-md-3">
                    <label
                      >Quantidade:<b style="color: rgb(245, 153, 153)"> *</b>
                    </label>
                    <b-form-input
                      id="quantidade"
                      v-model="validaProdutos.quantidade"
                      type="number"
                      placeholder="Quantidade"
                      :class="{
                        'fail-error': $v.validaProdutos.quantidade.$error,
                      }"
                      ref="quantidade"
                      @keydown.enter.prevent="moveFocus(6)"
                      :disabled="form.desabilita_step2"
                      @blur="ValidaQuantidade"
                    >
                    </b-form-input>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.quantidade) }}
                    </small>
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
                        v-model="validaProdutos.valor_unitario"
                        placeholder="0,00"
                        :class="{
                          'fail-error': $v.validaProdutos.valor_unitario.$error,
                        }"
                        ref="valor_unitario"
                        @keydown.enter.prevent="moveFocus(7)"
                        :disabled="form.desabilita_step2"
                        @blur="ValidaValorUnitario"
                      ></b-form-input>
                    </b-input-group>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.valor_unitario) }}
                    </small>
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
                        :class="{
                          'fail-error': $v.validaProdutos.desconto.$error,
                        }"
                        v-model="validaProdutos.desconto"
                        type="number"
                        placeholder="0,00"
                        ref="desconto"
                        @keydown.enter.prevent="moveFocus(8)"
                        :disabled="form.desabilita_step2"
                        @blur="ValidaDesconto"
                      ></b-form-input>
                    </b-input-group>
                    <small class="small-msg">
                      {{ validationMsg($v.validaProdutos.desconto) }}
                    </small>
                  </div>
                  <div class="col-md-2" style="line-height: 85px">
                    <b-button
                      @click.prevent="addProducts()"
                      id="btnAddProdutos"
                      class="btn btn-sm"
                      type="button"
                      variant="dark"
                      :class="{ disabled: buttonLock }"
                      ref="btnAddProdutos"
                      @keydown.enter.prevent="moveFocus(9)"
                      :disabled="form.desabilita_step2"
                    >
                      Adicionar Produto
                    </b-button>
                  </div>
                  <div class="col-md-1" style="line-height: 85px">
                    <b-button
                      class="btn btn-sm"
                      type="button"
                      variant="dark"
                      title="Limpar campos produtos"
                      @click="clearInputsListProducts()"
                      :disabled="form.desabilita_step2"
                    >
                      <i class="bx bx-trash"></i>
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
                              :class="{
                                'fail-error': form.produtos[key].msgErrorQtd,
                              }"
                              v-model="item.qtd_produto"
                              :disabled="!item.editing"
                            />
                            <small
                              class="small-msg"
                              v-if="form.produtos[key].msgErrorQtd"
                            >
                              Quantidade maior que zero/positivo!
                            </small>
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="valor_unitario"
                              type="text"
                              class="form-control text-center"
                              :class="{
                                'fail-error': form.produtos[key].msgErrorvl,
                              }"
                              v-model="item.valor_unitario"
                              :disabled="!item.editing"
                            />
                            <small
                              class="small-msg"
                              v-if="form.produtos[key].msgErrorvl"
                              >Valores negativos/zero não serão aceitos!</small
                            >
                          </td>
                          <td class="col-md-1 col-sm-1 table_Td">
                            <input
                              id="desconto"
                              type="text"
                              class="form-control text-center"
                              :class="{
                                'fail-error': form.produtos[key].msgErrorPer,
                              }"
                              v-model="item.desconto"
                              :disabled="!item.editing"
                            />
                            <small
                              class="small-msg"
                              v-if="form.produtos[key].msgErrorPer"
                              >Porcentagem deve estar entre 0 e 100!</small
                            >
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
                          <td
                            class="col-md-1 col-sm-1 table_Td"
                            :class="{ disabled: form.desabilita_step2 }"
                          >
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
                        :class="{
                          'fail-error': $v.form.frete.$error,
                        }"
                        placeholder="0,00"
                        ref="frete"
                        @keydown.enter.prevent="moveFocus(10)"
                        :disabled="form.desabilita_step2"
                      >
                      </b-form-input>
                      <small class="small-msg">
                        {{ validationMsg($v.form.frete) }}</small
                      >
                    </div>
                    <div class="col-md-3">
                      <label>Seguro:</label>
                      <b-form-input
                        id="seguro"
                        v-model="form.seguro"
                        type="number"
                        placeholder="0,00"
                        :class="{
                          'fail-error': $v.form.seguro.$error,
                        }"
                        ref="seguro"
                        @keydown.enter.prevent="moveFocus(11)"
                        :disabled="form.desabilita_step2"
                      >
                      </b-form-input>
                      <small class="small-msg">{{
                        validationMsg($v.form.seguro)
                      }}</small>
                    </div>
                    <div class="col-md-3">
                      <label>Outras Despesas:</label>
                      <b-form-input
                        id="outras_despesas"
                        v-model="form.outras_despesas"
                        :class="{
                          'fail-error': $v.form.outras_despesas.$error,
                        }"
                        type="number"
                        placeholder="0,00"
                        ref="outras_despesas"
                        @keydown.enter.prevent="moveFocus(12)"
                        :disabled="form.desabilita_step2"
                      >
                      </b-form-input>
                      <small class="small-msg">{{
                        validationMsg($v.form.outras_despesas)
                      }}</small>
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
              <div v-if="$v.form.produtos.$error" class="col text-center">
                <transition
                  v-if="$v.form.produtos.$error"
                  name="slow-motion"
                  appear
                >
                  <div
                    class="d-flex justify-content-center align-items-center col-8 offset-2 mt-2"
                  >
                    <div class="col-12 alert alert-danger" role="alert">
                      {{ validationMsg($v.form.produtos) }}
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </transition>
          <!-- card Condição Pagamento -->
          <!-- <div
              v-if="true"
              class="slow-motion-div mt-4"
              :class="{ card_produto_disabled: !produtosPreenchidos }"
            > -->
          <transition name="slow-motion" appear>
            <div
              v-if="true"
              class="slow-motion-div mt-4"
              :class="{ card_produto_disabled: false }"
            >
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
                        :class="{
                          'fail-error': $v.form.id_condicaopg.$error,
                        }"
                        v-model="form.id_condicaopg"
                        placeholder="Código"
                        ref="id_condicaopg"
                        :disabled="form.desabilita_step3"
                        @keydown.enter.prevent="
                          condicaoPagamentoDebounce(form.id_condicaopg)
                        "
                        @keydown.backspace="
                          handleBackspace_condicaoPagamentoDebounce
                        "
                      ></b-form-input>
                      <small class="small-msg">
                        {{ validationMsg($v.form.id_condicaopg) }}
                      </small>
                    </div>
                    <div class="col-md-8 col-sm-8">
                      <label
                        >Condição de Pagamento:<b
                          style="color: rgb(245, 153, 153)"
                        >
                          *</b
                        ></label
                      >
                      <b-overlay :show="isLoadingCondicao" rounded="sm">
                        <b-input-group>
                          <b-form-input
                            id="fornecedor"
                            type="text"
                            :class="{
                              'fail-error': $v.form.id_condicaopg.$error,
                            }"
                            placeholder="Condição de Pagamento"
                            v-model="form.condicaopg"
                            disabled
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              text="Button"
                              variant="dark"
                              :disabled="form.desabilita_step3"
                              title="Pesquisar Condição de Pagamento"
                              @click.prevent="showSearchCondicaoPagamento()"
                            >
                              <i class="bx bx-search"></i>
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                        <small class="small-msg">
                          {{ validationMsg($v.form.condicaopg) }}
                        </small>
                      </b-overlay>
                    </div>
                    <div class="col-md-1" style="line-height: 85px">
                      <b-button
                        class="btn btn-sm"
                        type="button"
                        variant="dark"
                        title="Limpar Condição de Pagamento"
                        @click="clearListCondicao()"
                        :disabled="form.desabilita_step3"
                      >
                        <i class="bx bx-trash"></i>
                      </b-button>
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
                              :value="item.numero_parcela"
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
                              id="data_vecimento"
                              type="text"
                              class="form-control text-center"
                              :value="item.data_vecimento"
                              disabled
                            />
                          </td>
                          <td class="col-md-3 table_Td">
                            <input
                              id="valor_parcela"
                              type="text"
                              class="form-control text-center"
                              :value="item.valor_parcela"
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
                    :disabled="form.desabilita_step3"
                  ></b-form-textarea>
                </div>
              </b-card>
              <div
                v-if="$v.form.condicaopagamento.$error"
                class="col text-center"
              >
                <transition
                  v-if="$v.form.condicaopagamento.$error"
                  name="slow-motion"
                  appear
                >
                  <div
                    class="d-flex justify-content-center align-items-center col-12 mt-2"
                  >
                    <div class="col-8 alert alert-danger" role="alert">
                      {{ validationMsg($v.form.condicaopagamento) }}
                    </div>
                  </div>
                </transition>
              </div>
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
          <div v-if="true">
            <b-button
              class="btn btn-sm me-1"
              :class="{ disabled: buttonLock }"
              type="button"
              variant="dark"
              @click.prevent="onSubmit()"
              :disabled="form.desabilita_step3"
            >
              Salvar<i class="bx bx-check"></i>
            </b-button>
          </div>
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
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import HomeFornecedor from "../fornecedores/HomeFornecedor.vue";
import HomeProduto from "../produto/HomeProduto.vue";
import HomeCondicaoPagamento from "../condicaoPagamento/HomeCondicaoPagamento.vue";
import {
  currency,
  inverterDataPtBR,
  currencyFormat,
  formatarDataParaPtBR,
  extrairNumero,
} from "../../rules/filters";
import Rules from "../../rules/rules";
import { Decimal } from "decimal.js";
import { ServiceFornecedor } from "../../services/serviceFornecedor";
import { ServiceProduto } from "../../services/serviceProduto";
import { ServiceCondicaoPagamento } from "../../services/serviceCondicaoPagamento";
import { ServiceCompra } from "../../services/serviceCompra";
const formMessages = {
  required: () => "Campo Obrigatório",
  required_Produto: () => "Deve conter pelo menos um Produto adicionado !",
  required_Condicao: () => "Deve conter uma Condição de Pagamento !",
  txtMinLen: ({ $params }) =>
    `Campo minimo ${$params.txtMinLen.min} characters.`,
  txtMaxLen: ({ $params }) =>
    `Campo maximo ${$params.txtMaxLen.max} characters.`,
  integer: () => "Campo deve ser um Numero inteiro",
  txtNumeroPositivo: () => "Campo deve ser Positivo/Maior que zero.",
  txtNumeroisPositivo: () => "Valores negativos não serão aceitos",
  maxValue: () => "Porcentagem deve estar entre 0 e 100",
  maxValuePorcentagem: () => "Porcentagem máx 100%",
  minValuePorcentagem: () => "Porcentagem deve estar entre 0 e 100",
  maxValuePercent: () => "Excedeu 100% da(s) parcelas",
  textDataEmissao: () => "Data Posterior a Data Atual",
  textDataChegada: () => "Data anterior a Data de Emissão",
  inputZero: () => "Campo não pode ser ZERO '0' ",
};
import { Notyf } from "notyf";
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
        numero_nota: "",
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
        condicaopagamento: [],
        desabilita_step1: false,
        desabilita_step2: false,
        desabilita_step3: false,
      },
      maxDate: "", // Define a data máxima como a data atual
      minDate: "", // Define a data mínima como a data atual
      mostrarBlocoProduto: true, // quando for pra adicionar o produto ele vai aparcer quando for visualizar irar sumir
      disabled: false,
      obj_condicao: {},
      buttonLock: false,
      buttonLockProducts: false,
      step1: false,
      step2: false,
      isLoadingFornecedor: false,
      isLoadingProduto: false,
      isLoadingCondicao: false,
      validaProdutos: {
        id_produto: "",
        produto: "",
        unidade: "",
        quantidade: "",
        valor_unitario: "",
        desconto: "",
      },
      msg_1: false,
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
      this.form.frete = this.form.frete.toFixed(5);
      this.form.seguro = this.form.seguro.toFixed(5);
      this.form.outras_despesas = this.form.outras_despesas.toFixed(5);
    }
  },
  computed: {
    todosParametrosPreenchidos() {
      return (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      );
    },
    produtosPreenchidos() {
      return !this.$v.form.produtos.$invalid;
    },
  },
  watch: {
    "form.frete"(newValue) {
      if (this.$v.form.frete.$invalid) {
        this.$v.form.frete.$touch();
      } else {
        this.form.total_compra = this.calcTotalProduto(this.form.produtos);
        this.calcularTotalFrete(this.form.total_compra, newValue);
        if (!newValue) {
          let soma = 0;
          let soma1 = 0;
          let format = 0;
          if (
            this.form.seguro !== null &&
            this.form.seguro !== undefined &&
            this.form.seguro !== "" &&
            !this.$v.form.seguro.$invalid
          ) {
            soma = soma + parseFloat(this.form.seguro);
          }

          if (
            this.form.outras_despesas !== null &&
            this.form.outras_despesas !== undefined &&
            this.form.outras_despesas !== "" &&
            !this.$v.form.outras_despesas.$invalid
          ) {
            soma = soma + parseFloat(this.form.outras_despesas);
          }
          soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
          format = soma1 + soma;
          this.form.total_compra = format.toFixed(5);
        }
        if (this.form.condicaopagamento.length > 0) {
          var num = 0;
          num = parseFloat(this.form.total_compra);
          num = currency(num);
          this.setCondicaoPagamento(this.obj_condicao, num);
        }
      }
    },
    "form.seguro"(newValue) {
      if (this.$v.form.seguro.$invalid) {
        this.$v.form.seguro.$touch();
      } else {
        this.form.total_compra = this.calcTotalProduto(this.form.produtos);
        this.calcularTotalSeguro(this.form.total_compra, newValue);
        if (!newValue) {
          let soma = 0;
          let soma1 = 0;
          let format = 0;
          if (
            this.form.frete !== null &&
            this.form.frete !== undefined &&
            this.form.frete !== "" &&
            !this.$v.form.frete.$invalid
          ) {
            soma = soma + parseFloat(this.form.frete);
          }

          if (
            this.form.outras_despesas !== null &&
            this.form.outras_despesas !== undefined &&
            this.form.outras_despesas !== "" &&
            !this.$v.form.outras_despesas.$invalid
          ) {
            soma = soma + parseFloat(this.form.outras_despesas);
          }

          soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
          format = soma1 + soma;
          this.form.total_compra = format.toFixed(5);
        }
        if (this.form.condicaopagamento.length > 0) {
          var num = 0;
          num = parseFloat(this.form.total_compra);
          num = currency(num);
          this.setCondicaoPagamento(this.obj_condicao, num);
        }
      }
    },
    "form.outras_despesas"(newValue) {
      if (this.$v.form.outras_despesas.$invalid) {
        this.$v.form.outras_despesas.$touch();
      } else {
        this.form.total_compra = this.calcTotalProduto(this.form.produtos);
        this.calcularTotalOutrasDespesas(this.form.total_compra, newValue);
        if (!newValue) {
          let soma = 0;
          let soma1 = 0;
          let format = 0;
          if (
            this.form.frete !== null &&
            this.form.frete !== undefined &&
            this.form.frete !== "" &&
            !this.$v.form.frete.$invalid
          ) {
            soma = soma + parseFloat(this.form.frete);
          }

          if (
            this.form.seguro !== null &&
            this.form.seguro !== undefined &&
            this.form.seguro !== "" &&
            !this.$v.form.seguro.$invalid
          ) {
            soma = soma + parseFloat(this.form.seguro);
          }

          soma1 = parseFloat(this.calcTotalProduto(this.form.produtos));
          format = soma1 + soma;
          this.form.total_compra = format.toFixed(5);
        }
        if (this.form.condicaopagamento.length > 0) {
          var num = 0;
          num = parseFloat(this.form.total_compra);
          num = currency(num);
          this.setCondicaoPagamento(this.obj_condicao, num);
        }
      }
    },
    "form.modelo"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
    "form.serie"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
    "form.numero_nota"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
    "form.id_fornecedor"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
    "form.data_emissao"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
    "form.data_chegada"() {
      this.msg_1 = false;
      this.form.desabilita_step2 = true;
      if (
        !this.$v.form.modelo.$invalid &&
        !this.$v.form.serie.$invalid &&
        !this.$v.form.numero_nota.$invalid &&
        !this.$v.form.id_fornecedor.$invalid &&
        !this.$v.form.fornecedor.$invalid &&
        !this.$v.form.data_emissao.$invalid &&
        !this.$v.form.data_chegada.$invalid
      ) {
        this.verificaNumCompra(
          this.form.modelo,
          this.form.serie,
          this.form.numero_nota,
          this.form.id_fornecedor
        );
      }
    },
  },
  validations: {
    validaProdutos: {
      id_produto: {
        required: validators.required,
        integer: validators.integer,
      },
      produto: {
        required: validators.required,
      },
      unidade: {
        required: validators.required,
      },
      quantidade: {
        required: validators.required,
        integer: validators.integer,
        inputZero: Rules.isPositiveNumber,
      },
      valor_unitario: {
        required: validators.required,
        inputZero: Rules.isPositiveNumber,
        txtNumeroisPositivo: Rules.isNumber,
        decimal: validators.decimal,
      },
      desconto: {
        required: validators.required,
        decimal: validators.decimal,
        maxValue: validators.maxValue(100),
        minValuePorcentagem: validators.minValue(0),
        txtNumeroisPositivo: Rules.isNumber,
      },
    },
    form: {
      modelo: {
        required: validators.required,
        integer: validators.integer,
        txtNumeroisPositivo: Rules.isNumber,
        inputZero: Rules.isPositiveNumber,
      },
      serie: {
        required: validators.required,
        integer: validators.integer,
        txtNumeroisPositivo: Rules.isNumber,
        inputZero: Rules.isPositiveNumber,
      },
      numero_nota: {
        required: validators.required,
        integer: validators.integer,
        txtNumeroisPositivo: Rules.isNumber,
        inputZero: Rules.isPositiveNumber,
      },
      id_fornecedor: {
        required: validators.required,
        integer: validators.integer,
        txtNumeroisPositivo: Rules.isNumber,
      },
      fornecedor: {
        required: validators.required,
      },
      data_emissao: {
        required: validators.required,
        textDataEmissao: Rules.validardataEmissao,
      },
      data_chegada: {
        required: validators.required,
        textDataChegada: function ValidaData(value) {
          return Rules.validarDataEmissao(value, this.form.data_emissao);
        },
      },
      id_condicaopg: {
        required: validators.required,
      },
      condicaopg: {
        required: validators.required,
      },
      produtos: {
        required_Produto: validators.required,
      },
      condicaopagamento: {
        required_Condicao: validators.required,
      },
      frete: {
        txtNumeroisPositivo: Rules.isNumber,
      },
      seguro: {
        txtNumeroisPositivo: Rules.isNumber,
      },
      outras_despesas: {
        txtNumeroisPositivo: Rules.isNumber,
      },
    },
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    closeCompra() {
      //   this.onReset();
      this.$router.push({ name: "compra" });
    },
    onSubmit() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        notyf.error("Compra está enfrentando uma irregularidade.!");
      } else {
        //clone
        let payLoad = this.convertPayLoad(this.form);
        ServiceCompra.storeCompra(payLoad)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: "compra" });
              notyf.success(response.data.original.message);
              this.function_getListCondicaoPagamento();
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
      this.validaProdutos.id_produto = obj.row.id;
      this.validaProdutos.produto = obj.row.produto;
      this.validaProdutos.unidade = obj.row.unidade;
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
        (this.form.desabilita_step1 = obj.desabilita_step1),
          (this.form.desabilita_step2 = obj.desabilita_step2),
          (this.form.desabilita_step3 = obj.desabilita_step3),
          (this.form.modelo = obj.modelo),
          (this.form.serie = obj.serie),
          (this.form.numero_nota = obj.numero_nota),
          (this.form.id_fornecedor = obj.fornecedor.id),
          (this.form.fornecedor = obj.fornecedor.razaoSocial),
          (this.form.data_emissao = inverterDataPtBR(obj.data_emissao)),
          (this.form.data_chegada = obj.data_chegada);
        this.form.produtos = obj.produtos;
        this.form.produtos.map(function (produtos) {
          produtos.valor_unitario = currencyFormat(produtos.valor_unitario);
          produtos.total_produto = currencyFormat(produtos.total_produto);
          produtos.desconto = currencyFormat(produtos.desconto);
          produtos.desativar = true;
          produtos.editing = false;
          produtos.msgErrorQtd = false;
          produtos.msgErrorPer = false;
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
      if (
        this.$v.form.modelo.$invalid &&
        this.$v.form.serie.$invalid &&
        this.$v.form.numero_nota.$invalid &&
        this.$v.form.id_fornecedor.$invalid &&
        this.$v.form.fornecedor.$invalid
      ) {
        this.$v.form.modelo.$touch();
        this.$v.form.serie.$touch();
        this.$v.form.numero_nota.$touch();
        this.$v.form.id_fornecedor.$touch();
        this.$v.form.fornecedor.$touch();
      } else {
        if (this.$v.validaProdutos.$invalid) {
          this.$v.validaProdutos.$touch();
          notyf.error("Produto está enfrentando uma irregularidade.!");
        } else {
          var id_produto = "";
          var produto = "";
          var unidade = "";
          var nDesconto = parseFloat(this.validaProdutos.desconto);
          var quantidade = 0;
          var valor_unitario = 0;
          var Valor_total_produto = 0;
          var desconto = 0;
          var valorDesconto = 0;
          var subTotal = 0;
          var decimal = new Decimal(this.validaProdutos.valor_unitario);
          var f_valor_unitario = 0;
          id_produto = this.validaProdutos.id_produto;
          produto = this.validaProdutos.produto;
          unidade = this.validaProdutos.unidade;
          quantidade = this.validaProdutos.quantidade;
          valor_unitario = parseFloat(
            this.validaProdutos.valor_unitario
          ).toFixed(5);
          f_valor_unitario = parseFloat(decimal);
          Valor_total_produto = quantidade * valor_unitario;
          desconto = this.calcPorcentagem(
            parseFloat(this.validaProdutos.desconto).toFixed(5)
          );
          valorDesconto = Valor_total_produto * desconto;
          subTotal = Valor_total_produto - valorDesconto;
          this.form.produtos.push({
            id_produto: id_produto,
            produto: { produto: produto },
            unidade: unidade,
            qtd_produto: quantidade,
            valor_unitario: currencyFormat(f_valor_unitario),
            desconto: currencyFormat(nDesconto),
            total_produto: currencyFormat(subTotal),
            desativar: true,
            editing: false,
            msgErrorQtd: false,
            msgErrorPer: false,
            msgErrorvl: false,
          });

          this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
          this.form.total_compra = this.form.total_produtos;

          if (parseFloat(this.form.frete) >= 0) {
            this.calcularTotalFrete(this.form.total_compra, this.form.frete);
          }
          if (parseFloat(this.form.seguro) >= 0) {
            this.calcularTotalSeguro(this.form.total_compra, this.form.seguro);
          }
          if (parseFloat(this.form.outras_despesas) >= 0) {
            this.calcularTotalOutrasDespesas(
              this.form.total_compra,
              this.form.outras_despesas
            );
          }
          this.$nextTick(() => {
            this.$refs.id_produto.focus();
          });
          this.clearInputsListProducts();
          this.form.produtos.length > 0
            ? (this.form.desabilita_step1 = true)
            : (this.form.desabilita_step1 = false);
          this.form.produtos.length > 0
            ? (this.form.desabilita_step3 = false)
            : (this.form.desabilita_step3 = true);
        }
      }
    },
    calcPorcentagem(porcentagem) {
      return porcentagem / 100;
    },
    clearInputsListProducts() {
      (this.validaProdutos.id_produto = ""),
        (this.validaProdutos.produto = ""),
        (this.validaProdutos.quantidade = ""),
        (this.validaProdutos.valor_unitario = ""),
        (this.validaProdutos.desconto = ""),
        (this.validaProdutos.unidade = "");
      this.$v.validaProdutos.$reset();
    },
    clearListCondicao() {
      this.form.id_condicaopg = "";
      this.form.condicaopg = "";
      this.$v.form.id_condicaopg.$reset();
      this.$v.form.condicaopg.$reset();
      this.$v.form.condicaopagamento.$reset();
      this.form.condicaopagamento = [];
      this.form.condicaopagamento.length > 0
        ? (this.form.desabilita_step2 = true)
        : (this.form.desabilita_step2 = false);
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
      return soma.toFixed(5);
    },
    calcularTotalFrete(valorCompra, frete) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(frete);

      if (
        this.form.seguro !== null &&
        this.form.seguro !== undefined &&
        this.form.seguro !== "" &&
        !this.$v.form.seguro.$invalid
      ) {
        soma = soma + parseFloat(this.form.seguro);
      }
      if (
        this.form.outras_despesas !== null &&
        this.form.outras_despesas !== undefined &&
        this.form.outras_despesas !== "" &&
        !this.$v.form.outras_despesas.$invalid
      ) {
        soma = soma + parseFloat(this.form.outras_despesas);
      }

      this.form.total_compra = soma.toFixed(5);
    },
    calcularTotalSeguro(valorCompra, seguro) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(seguro);

      if (
        this.form.frete !== null &&
        this.form.frete !== undefined &&
        this.form.frete !== "" &&
        !this.$v.form.frete.$invalid
      ) {
        soma = soma + parseFloat(this.form.frete);
      }
      if (
        this.form.outras_despesas !== null &&
        this.form.outras_despesas !== undefined &&
        this.form.outras_despesas !== "" &&
        !this.$v.form.outras_despesas.$invalid
      ) {
        soma = soma + parseFloat(this.form.outras_despesas);
      }

      this.form.total_compra = soma.toFixed(5);
    },
    calcularTotalOutrasDespesas(valorCompra, outras_despesas) {
      let soma;
      soma = parseFloat(valorCompra) + parseFloat(outras_despesas);

      if (
        this.form.frete !== null &&
        this.form.frete !== undefined &&
        this.form.frete !== "" &&
        !this.$v.form.frete.$invalid
      ) {
        soma = soma + parseFloat(this.form.frete);
      }
      if (
        this.form.seguro !== null &&
        this.form.seguro !== undefined &&
        this.form.seguro !== "" &&
        !this.$v.form.seguro.$invalid
      ) {
        soma = soma + parseFloat(this.form.seguro);
      }
      this.form.total_compra = soma.toFixed(5);
    },
    setCondicaoPagamento(obj, valor_compra) {
      this.$v.validaProdutos.$reset();
      if (
        this.$v.form.produtos.$invalid ||
        this.$v.form.frete.$invalid ||
        this.$v.form.seguro.$invalid ||
        this.$v.form.outras_despesas.$invalid
      ) {
        this.$v.form.frete.$touch();
        this.$v.form.seguro.$touch();
        this.$v.form.outras_despesas.$touch();
        this.$v.form.produtos.$touch();
        notyf.error("Produto está enfrentando uma irregularidade.!");
      } else {
        this.form.id_condicaopg = obj.id;
        this.form.condicaopg = obj.condicao_pagamento;
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
            numero_parcela: obj.parcelas[i].parcela,
            id_formapagamento: obj.parcelas[i].formaPagamento[0].id,
            formaPagamento: obj.parcelas[i].formaPagamento[0].forma_pg,
            data_vecimento: formatarDataParaPtBR(datavencimento),
            valor_parcela: (valor_parcela * obj.parcelas[i].porcentagem) / 100,
          });
        }
        this.form.condicaopagamento.map(function (c) {
          c.valor_parcela = currency(c.valor_parcela);
        });
        this.form.condicaopagamento.length > 0
          ? (this.form.desabilita_step2 = true)
          : (this.form.desabilita_step2 = false);
        this.form.condicaopagamento.length > 0
          ? (this.form.desabilita_step2 = true)
          : (this.form.desabilita_step2 = false);
      }
    },
    deleteItemProduto(index) {
      this.form.produtos.splice(index, 1);
      this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
      this.form.total_compra = this.form.total_produtos;

      if (parseFloat(this.form.frete) >= 0) {
        this.calcularTotalFrete(this.form.total_compra, this.form.frete);
      }
      if (parseFloat(this.form.seguro) >= 0) {
        this.calcularTotalSeguro(this.form.total_compra, this.form.seguro);
      }
      if (parseFloat(this.form.outras_despesas) >= 0) {
        this.calcularTotalOutrasDespesas(
          this.form.total_compra,
          this.form.outras_despesas
        );
      }

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
      this.form.produtos.length > 0
        ? (this.form.desabilita_step1 = true)
        : (this.form.desabilita_step1 = false);
      this.form.produtos.length > 0
        ? (this.form.desabilita_step3 = false)
        : (this.form.desabilita_step3 = true);
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
      var valor_unitario = 0;
      var Valor_total_produto = 0;
      var valorDesconto = 0;
      var subTotal = 0;
      var quantidade = parseFloat(this.form.produtos[index].qtd_produto);
      var desconto = extrairNumero(this.form.produtos[index].desconto);
      valor_unitario = extrairNumero(this.form.produtos[index].valor_unitario);
      if (valor_unitario === null) {
        valor_unitario = parseFloat(this.form.produtos[index].valor_unitario);
      }
      if (desconto === null) {
        desconto = parseFloat(this.form.produtos[index].desconto);
      }
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        this.form.produtos[index].msgErrorQtd = true;
        this.buttonLock = true;
        return false;
      } else {
        this.form.produtos[index].msgErrorQtd = false;
      }
      if (valor_unitario <= 0 || isNaN(valor_unitario)) {
        this.form.produtos[index].msgErrorvl = true;
        this.buttonLock = true;
        return false;
      } else {
        this.form.produtos[index].msgErrorvl = false;
      }
      if (desconto < 0 || desconto > 100 || isNaN(desconto)) {
        this.form.produtos[index].msgErrorPer = true;
        this.buttonLock = true;
        return false;
      } else {
        this.form.produtos[index].msgErrorPer = false;
      }

      this.buttonLock = false;

      if (
        Number.isInteger(quantidade) &&
        quantidade > 0 &&
        desconto >= 0 &&
        desconto <= 100 &&
        valor_unitario > 0
      ) {
        this.form.produtos[index].msgErrorQtd = false;
        this.form.produtos[index].msgErrorPer = false;
        valor_unitario = extrairNumero(
          this.form.produtos[index].valor_unitario
        );
        if (valor_unitario === null) {
          valor_unitario = parseFloat(this.form.produtos[index].valor_unitario);
        }
        desconto = extrairNumero(this.form.produtos[index].desconto);
        if (desconto === null) {
          desconto = parseFloat(this.form.produtos[index].desconto);
        }
        desconto = this.calcPorcentagem(desconto);
        Valor_total_produto = quantidade * valor_unitario;
        valorDesconto = desconto * Valor_total_produto;
        subTotal = Valor_total_produto - valorDesconto;
        this.form.produtos[index].total_produto = currencyFormat(subTotal);
        this.form.produtos[index].desconto = currencyFormat(desconto * 100);
        this.form.produtos[index].valor_unitario =
          currencyFormat(valor_unitario);
        this.form.total_produtos = this.calcTotalProduto(this.form.produtos);
        this.form.total_compra = this.form.total_produtos;
        var frete = 0;
        var seguro = 0;
        var outras_despesas = 0;

        if (
          this.form.frete !== null &&
          this.form.frete !== undefined &&
          this.form.frete !== "" &&
          !this.$v.form.frete.$invalid
        ) {
          frete = parseFloat(this.form.frete);
          this.form.total_compra =
            frete + parseFloat(this.calcTotalProduto(this.form.produtos));
          let format = this.form.total_compra;
          this.form.total_compra = format.toFixed(5);
        }

        if (
          this.form.seguro !== null &&
          this.form.seguro !== undefined &&
          this.form.seguro !== "" &&
          !this.$v.form.seguro.$invalid
        ) {
          seguro = parseFloat(this.form.seguro);
          this.form.total_compra =
            frete +
            seguro +
            parseFloat(this.calcTotalProduto(this.form.produtos));
          let format = this.form.total_compra;
          this.form.total_compra = format.toFixed(5);
        }
        if (
          this.form.outras_despesas !== null &&
          this.form.outras_despesas !== undefined &&
          this.form.outras_despesas !== "" &&
          !this.$v.form.outras_despesas.$invalid
        ) {
          outras_despesas = parseFloat(this.form.outras_despesas);
          this.form.total_compra =
            frete +
            seguro +
            outras_despesas +
            parseFloat(this.calcTotalProduto(this.form.produtos));
          let format = this.form.total_compra;
          this.form.total_compra = format.toFixed(5);
        }

        this.form.produtos[index].editing = false;
        this.buttonLock = false;
        //desativar linhas Tabela
        this.form.produtos.forEach((row) => {
          row.desativar = true;
        });
      }
    },
    fornecedorDebounce(id) {
      this.isLoadingFornecedor = true;
      this.form.id_fornecedor = "";
      this.form.fornecedor = "";
      ServiceFornecedor.getById(id).then((response) => {
        if (response.status === 200) {
          this.form.id_fornecedor = "";
          this.form.fornecedor = "";
          this.form.id_fornecedor = response.data[0].id;
          this.form.fornecedor = response.data[0].razaoSocial;
          this.isLoadingFornecedor = false;
          if (this.todosParametrosPreenchidos) {
            this.$nextTick(() => {
              this.$refs.id_produto.focus();
            });
          }
        } else {
          this.form.fornecedor = "";
          this.form.id_fornecedor = "";
          this.isLoadingFornecedor = false;
          this.$nextTick(() => {
            this.$refs.id_fornecedor.focus();
          });
          if (
            this.$v.form.id_fornecedor.$invalid &&
            this.$v.form.fornecedor.$invalid
          ) {
            this.$v.form.id_fornecedor.$touch();
            this.$v.form.fornecedor.$touch();
          }
        }
      });
    },
    produtoDebounce(id) {
      this.isLoadingProduto = true;
      this.validaProdutos.id_produto = "";
      this.validaProdutos.produto = "";
      this.validaProdutos.unidade = "";
      ServiceProduto.getById(id).then((response) => {
        if (response.status === 200) {
          this.validaProdutos.id_produto = response.data[0].id;
          this.validaProdutos.produto = response.data[0].produto;
          this.validaProdutos.unidade = response.data[0].unidade;
          this.isLoadingProduto = false;
          this.$nextTick(() => {
            this.$refs.quantidade.focus();
          });
        } else {
          this.validaProdutos.id_produto = "";
          this.validaProdutos.produto = "";
          this.validaProdutos.unidade = "";
          this.isLoadingProduto = false;
          this.$nextTick(() => {
            this.$refs.id_produto.focus();
          });
          if (
            this.$v.validaProdutos.id_produto.$invalid &&
            this.$v.validaProdutos.produto.$invalid &&
            this.$v.validaProdutos.unidade.$invalid
          ) {
            this.$v.validaProdutos.id_produto.$touch();
            this.$v.validaProdutos.produto.$touch();
            this.$v.validaProdutos.unidade.$touch();
          }
        }
      });
    },
    condicaoPagamentoDebounce(id) {
      this.isLoadingCondicao = true;
      ServiceCondicaoPagamento.getById(id).then((response) => {
        if (response.status === 200) {
          this.form.id_condicaopg = "";
          this.form.condicaopg = "";
          var valor_compra = currency(parseFloat(this.form.total_compra));
          this.setCondicaoPagamento(response.data[0], valor_compra);
          this.isLoadingCondicao = false;
          this.$nextTick(() => {
            this.$refs.id_condicaopg.focus();
          });
          return;
        } else {
          this.isLoadingCondicao = false;
          this.clearListCondicao();
          this.$v.form.id_condicaopg.$touch();
          this.$v.form.condicaopg.$touch();
          this.$nextTick(() => {
            this.$refs.id_condicaopg.focus();
          });
          return;
        }
      });
      this.clearListCondicao();
    },
    moveFocus(nextIndex) {
      const inputs = [
        this.$refs.modelo,
        this.$refs.serie,
        this.$refs.numero_nota,
        this.$refs.id_fornecedor,
        this.$refs.id_produto,
        this.$refs.quantidade,
        this.$refs.valor_unitario,
        this.$refs.desconto,
        this.$refs.btnAddProdutos,
        this.$refs.frete,
        this.$refs.seguro,
        this.$refs.outras_despesas,
        this.$refs.id_condicaopg,
        // ... mais referências de b-form-input ...
      ];

      if (nextIndex >= 0 && nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    },
    convertPayLoad(obj) {
      const clonedObj = JSON.parse(JSON.stringify(obj));
      let produtos = clonedObj.produtos;
      produtos.map((produto) => {
        produto.produto = produto.produto.produto;
        produto.desconto = extrairNumero(produto.desconto);
        produto.qtd_produto = parseInt(produto.qtd_produto);
        produto.total_produto = extrairNumero(produto.total_produto);
        produto.valor_unitario = extrairNumero(produto.valor_unitario);
        return produto;
      });
      let qtd_produto = 0;
      qtd_produto = produtos.length;
      clonedObj.qtd_produto = qtd_produto;
      let condicaopagamento = clonedObj.condicaopagamento;
      condicaopagamento.map((condicaopagamento) => {
        condicaopagamento.valor_parcela = extrairNumero(
          condicaopagamento.valor_parcela,
          (condicaopagamento.data_vecimento = inverterDataPtBR(
            condicaopagamento.data_vecimento
          ))
        );
        return condicaopagamento;
      });
      clonedObj.id_fornecedor = parseInt(clonedObj.id_fornecedor);

      clonedObj.total_produtos = parseFloat(clonedObj.total_produtos);
      clonedObj.total_compra = parseFloat(clonedObj.total_compra);

      if (
        clonedObj.frete === "" ||
        clonedObj.frete === isNaN(clonedObj.frete)
      ) {
        clonedObj.frete = "";
      } else {
        clonedObj.frete = parseFloat(clonedObj.frete);
      }

      if (
        clonedObj.seguro === "" ||
        clonedObj.seguro === isNaN(clonedObj.seguro)
      ) {
        clonedObj.seguro = "";
      } else {
        clonedObj.seguro = parseFloat(clonedObj.seguro);
      }

      if (
        clonedObj.outras_despesas === "" ||
        clonedObj.outras_despesas === isNaN(clonedObj.outras_despesas)
      ) {
        clonedObj.outras_despesas = "";
      } else {
        clonedObj.outras_despesas = parseFloat(clonedObj.outras_despesas);
      }
      const id_profissional = localStorage.getItem("User_id");
      clonedObj.id_profissional = parseInt(id_profissional);
      return clonedObj;
    },
    handleBackspace_fornecedor(event) {
      if (event.keyCode === 8) {
        //this.fornecedorDebounce(0);
        this.form.id_fornecedor = "";
        this.form.fornecedor = "";
      }
    },
    handleBackspace_produto(event) {
      if (event.keyCode === 8) {
        this.produtoDebounce(0);
      }
    },
    handleBackspace_condicaoPagamentoDebounce(event) {
      if (event.keyCode === 8) {
        this.condicaoPagamentoDebounce(0);
      }
    },
    ValidaNumeroNota() {
      this.$v.form.numero_nota.$touch();
    },
    ValidaSerie() {
      this.$v.form.serie.$touch();
    },
    ValidaModelo() {
      this.$v.form.modelo.$touch();
    },
    ValidaQuantidade() {
      this.$v.validaProdutos.quantidade.$touch();
    },
    ValidaValorUnitario() {
      this.$v.validaProdutos.valor_unitario.$touch();
    },
    ValidaDesconto() {
      this.$v.validaProdutos.desconto.$touch();
    },
    ValidaDataEmissao() {
      this.$v.form.data_emissao.$touch();
    },
    ValidaDataChegada() {
      this.$v.form.data_chegada.$touch();
    },
    ValidaFornecedor() {
      this.$v.form.id_fornecedor.$touch();
      this.$v.form.fornecedor.$touch();
    },
    verificaNumCompra(modelo_, serie_, numero_nota_, id_fornecedor_) {
      var modelo = modelo_;
      var serie = serie_;
      var numero_nota = numero_nota_;
      var id_fornecedor = id_fornecedor_;
      var data = {
        modelo: modelo,
        serie: serie,
        numero_nota: numero_nota,
        id_fornecedor: id_fornecedor,
      };
      ServiceCompra.verificaNumCompra(data).then((response) => {
        this.msg_1 = !response.data;
        this.form.desabilita_step2 = this.msg_1;
        if (this.form.condicaopagamento.length > 0) {
          this.msg_1 = response.data;
        }
        return response.data;
      });
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
.disabled {
  pointer-events: none; /* Impede interações com elementos filhos */
  opacity: 0.6; /* Opacidade reduzida para indicar desabilitação */
}
.fail-error {
  border: 2px solid #e46060bb !important;
}
.fail-warning {
  border: 7px solid #fff3cd !important;
}
.small-msg {
  font-size: 11px;
  color: rgba(228, 96, 96, 0.733);
  font-family: sans-serif;
  font-weight: 700;
}
</style>
