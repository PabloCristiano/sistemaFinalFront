<template>
  <div>
    <b-modal
      :id="modal_form_produto"
      size="lg"
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
          @click="closeProduto()"
        >
          X
        </b-button>
      </template>
      <b-card class="mt-0 mb-3" header="Formulário de cadastro Produto">
        <slot name="conteudo">
          <b-form>
            <div class="row col-12 mt-2">
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
                  >Produto:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="produto"
                  type="text"
                  placeholder="Nome do Produto"
                  v-model="form.produto"
                  :class="{ 'fail-error': $v.form.produto.$error }"
                  :title="form.produto"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.produto) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-6">
                <label
                  >Unidade:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-form-input
                  id="unidade"
                  type="text"
                  placeholder="Unidade"
                  v-model="form.unidade"
                  :class="{ 'fail-error': $v.form.unidade.$error }"
                  :title="form.unidade"
                  :disabled="form.disabled"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.unidade) }}
                </small>
              </div>
              <div class="col-md-6">
                <label
                  >Qtd Unidade:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-form-input
                  id="unidade"
                  type="number"
                  v-model="form.qtdEstoque"
                  placeholder="Qtd Unidade"
                  :disabled="true"
                >
                </b-form-input>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-3">
                <label>Código:</label>
                <b-form-input
                  id="id_categoria"
                  type="number"
                  v-model="form.id_categoria"
                  :class="{ 'fail-error': $v.form.id_categoria.$error }"
                  placeholder="Código"
                  :title="form.id_categoria"
                  :disabled="form.disabled"
                  v-debounce:1000ms="categoriaDebounce"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_categoria) }}
                </small>
              </div>
              <div class="col-md-9">
                <label
                  >Categoria:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-overlay :show="isLoadingCategoria" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="categoria"
                      type="text"
                      v-model="form.categoria"
                      :class="{ 'fail-error': $v.form.categoria.$error }"
                      placeholder="Categoria"
                      disabled
                      :title="form.categoria"
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        @click="showSearchCategoria()"
                        text="Button"
                        variant="dark"
                        :disabled="form.disabled"
                        title="Pesquisar Categoria"
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
                  <small style="font-size: 11px; color: red">
                    {{ validationMsg($v.form.categoria) }}
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-3">
                <label>Código:</label>
                <b-form-input
                  id="id_fornecedor"
                  type="number"
                  v-model="form.id_fornecedor"
                  :class="{ 'fail-error': $v.form.id_fornecedor.$error }"
                  placeholder="Código"
                  :title="form.id_fornecedor"
                  :disabled="form.disabled"
                  v-debounce:1000ms="fornecedorDebounce"
                >
                </b-form-input>
                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.id_fornecedor) }}
                </small>
              </div>
              <div class="col-md-9">
                <label
                  >Fornecedor:<b style="color: rgb(245, 153, 153)"> *</b></label
                >
                <b-overlay :show="isLoadingFornecedor" rounded="sm">
                  <b-input-group>
                    <b-form-input
                      id="fornecedor"
                      type="text"
                      v-model="form.fornecedor"
                      :class="{ 'fail-error': $v.form.fornecedor.$error }"
                      placeholder="Fornecedor"
                      disabled
                      :title="form.fornecedor"
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        @click="showSearchFornecedor()"
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
                  <small style="font-size: 11px; color: red">
                    {{ validationMsg($v.form.fornecedor) }}
                  </small>
                </b-overlay>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4">
                <label
                  >Custo Ult Compra:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-input-group prepend="R$">
                  <b-form-input
                    id="custoUltCompra"
                    type="number"
                    v-model="form.custoUltCompra"
                    placeholder="Custo Ultima Compra"
                    :title="form.custoUltCompra"
                    :disabled="true"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <label
                  >Preço Custo:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-input-group prepend="R$">
                  <b-form-input
                    id="precoCusto"
                    type="number"
                    v-model="form.precoCusto"
                    placeholder="Preço de Custo"
                    :title="form.precoCusto"
                    :disabled="true"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <label
                  >Preço Venda:<b style="color: rgb(245, 153, 153)">
                    *</b
                  ></label
                >
                <b-input-group prepend="R$">
                  <b-form-input
                    id="precoVenda"
                    type="number"
                    v-model="form.precoVenda"
                    placeholder="Preço de Venda"
                    :class="{ 'fail-error': $v.form.precoVenda.$error }"
                    :title="form.precoVenda"
                    :disabled="form.disabled"
                  >
                  </b-form-input>
                </b-input-group>

                <small style="font-size: 11px; color: red">
                  {{ validationMsg($v.form.precoVenda) }}
                </small>
              </div>
            </div>
            <div class="row col-12 mt-2">
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <label>Data Última Compra:</label>
                <b-input-group>
                  <b-form-input
                    id="dataUltCompra"
                    type="date"
                    v-model="form.dataUltCompra"
                    placeholder="Data última Compra"
                    :title="form.dataUltCompra"
                    :disabled="true"
                    prepend="<i class='bx bx-calendar'></i>"
                  >
                  </b-form-input>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <label>Data Última Venda:</label>
                <b-form-input
                  id="dataUltVenda"
                  type="date"
                  v-model="form.dataUltVenda"
                  placeholder="Data última Venda"
                  :title="form.dataUltVenda"
                  :disabled="true"
                >
                </b-form-input>
              </div>
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
              @click.prevent="closeProduto()"
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
    <b-modal
      :id="modal_search_categoria"
      size="xl"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      no-close-on-backdrop
      hide-footer
    >
      <template v-slot:modal-header>
        <h5>Pesquisar Categoria</h5>
        <b-button
          style="border: 0"
          size="sm"
          variant="outline-light"
          @click="fecharModalSearchCategoria()"
        >
          X
        </b-button>
      </template>
      <b-container fluid>
        <HomeCategoria
          :functionCategorias="changeSearchCategoria"
        ></HomeCategoria>
      </b-container>
      <b-container
        class="col-sm-12 col-md-12 mt-3"
        style="text-align: center"
        footer
      >
        <b-button
          @click="fecharModalSearchCategoria()"
          type="button"
          id=""
          class="btn btn-dark btn-sm"
          >Fechar Pesquisa Categoria</b-button
        >
      </b-container>
    </b-modal>
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
  </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import Rules from "../../rules/rules";
import { formataDataTempo } from "../../rules/filters";
import HomeCategoria from "../categorias/HomeCategorias.vue";
import HomeFornecedor from "../fornecedores/HomeFornecedor.vue";
import { ServiceProduto } from "../../services/serviceProduto";
import { ServiceFornecedor } from "../../services/serviceFornecedor";
import { ServiceCategorias } from "../../services/serviceCategorias";
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
const formMessages = {
  required: () => "Campo Obrigatório",
  txtMinLen: ({ $params }) =>
    `Campo minimo ${$params.txtMinLen.min} characters.`,
  txtMaxLen: ({ $params }) =>
    `Campo maximo ${$params.txtMaxLen.max} characters.`,
  integer: () => "Campo deve ser um Numero inteiro",
  txtNumeroPositivo: () => "Campo deve ser Positivo/Maior que zero.",
};
export default {
  props: {
    formulario: { type: Object },
    funcOnReset: { type: Function },
    functionGetListProduto: { type: Function },
  },
  components: { HomeCategoria, HomeFornecedor },
  data() {
    return {
      form: this.formulario,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      modal_form_produto: "modal_form_produto",
      modal_search_categoria: "modal_search_categoria",
      modal_search_fornecedor: "modal_search_fornecedor",
      isLoadingFornecedor: false,
      isLoadingCategoria: false,
    };
  },
  filters: {
    formataDataTempo,
  },
  validations() {
    return {
      form: {
        produto: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
          txtMaxLen: validators.maxLength(50),
        },
        unidade: {
          required: validators.required,
          txtMinLen: validators.minLength(3),
          txtMaxLen: validators.maxLength(20),
        },
        precoVenda: {
          required: validators.required,
          decimal: validators.decimal,
          txtNumeroPositivo: Rules.isPositiveNumber,
        },
        id_categoria: {
          required: validators.required,
          integer: validators.integer,
        },
        categoria: {
          required: validators.required,
        },
        id_fornecedor: {
          required: validators.required,
          integer: validators.integer,
        },
        fornecedor: {
          required: validators.required,
        },
      },
    };
  },
  methods: {
    fGetListProduto() {
      this.functionGetListProduto();
    },
    validationMsg: validationMessage(formMessages),
    closeProduto() {
      this.onReset();
      this.$bvModal.hide(this.modal_form_produto);
    },
    showSearchCategoria() {
      this.$bvModal.show(this.modal_search_categoria);
    },
    showSearchFornecedor() {
      this.$bvModal.show(this.modal_search_fornecedor);
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
          ServiceProduto.storeProduto(this.form)
            .then((response) => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_produto);
                this.fGetListProduto();
                if (response.data[0] === "error") {
                  notyf.error(response.data[1]);
                }
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
        if (this.form.btn === "Alterar") {
          ServiceProduto.alterarProduto(this.form)
            .then((response) => {
              if (response.status === 200) {
                notyf.success(response.data.success);
                vm.onReset();
                vm.$bvModal.hide(vm.modal_form_produto);
                this.fGetListProduto();
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
        if (this.form.btn === "Excluir") {
          ServiceProduto.excluirProduto(this.form.id)
            .then((obj) => {
              if (obj.status === 200) {
                notyf.success(obj.data.success);
                this.onReset();
                this.$bvModal.hide(this.modal_form_produto);
                this.fGetListProduto();
              } else {
                if (obj.response.data.error) {
                  notyf.error(obj.response.data.error[0]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    fecharModalSearchCategoria() {
      this.$bvModal.hide(this.modal_search_categoria);
    },
    fecharModalSearchFornecedor() {
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    changeSearchCategoria(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_categoria = obj.row.id;
      this.form.categoria = obj.row.categoria;
      this.$bvModal.hide(this.modal_search_categoria);
    },
    fecharModalSearchForncedor() {
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    changeSearchFornecedor(obj) {
      if (obj.column.field === "btn") {
        return;
      }
      this.form.id_fornecedor = obj.row.id;
      this.form.fornecedor = obj.row.razaoSocial;
      this.$bvModal.hide(this.modal_search_fornecedor);
    },
    fornecedorDebounce(id) {
      this.isLoadingFornecedor = true;
      let vm = this;
      ServiceFornecedor.getById(id).then((response) => {
        if (response.status === 200) {
          vm.form.fornecedor = response.data[0].razaoSocial;
          vm.form.id_fornecedor = response.data[0].id;
          this.isLoadingFornecedor = false;
        } else {
          vm.form.fornecedor = "";
          vm.form.id_fornecedor = "";
          this.isLoadingFornecedor = false;
          notyf.error("Fornecedor não encontrado.");
        }
      });
    },
    categoriaDebounce(id) {
      this.isLoadingCategoria = true;
      let vm = this;
      ServiceCategorias.getById(id).then((response) => {
        if (response.status === 200) {
          vm.form.categoria = response.data[0].categoria;
          vm.form.id_categoria = response.data[0].id;
          this.isLoadingCategoria = false;
        } else {
          vm.form.categoria = "";
          vm.form.id_categoria = "";
          this.isLoadingCategoria = false;
          notyf.error("Categoria não encontrada.");
        }
      });
    },
  },
};
</script>
<style>
.fail-error {
  border: 2px solid #e46060bb;
}
</style>
