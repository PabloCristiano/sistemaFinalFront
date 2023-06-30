<template>
    <div class="container" style="margin-bottom: -90px;">
        <b-overlay :show="isLoading" rounded="sm">
            <div class="card mb-5">
                <div class="card-header">Cadastrar Categorias</div>
                <div class="card-body">
                    <div>
                        <vue-good-table :columns="columns" :rows="categorias" @on-cell-click="selectCellCategorias"
                            :search-options="{
                                enabled: true,
                                placeholder: 'Procure por uma Categoria',
                                skipDiacritics: true,
                            }" :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 5,
    position: 'end',
    perPageDropdown: [5, 10],
    prevLabel: 'Anterior',
    nextLabel: 'Proximo',
    rowsPerPageLabel: 'Qtd por página',
    ofLabel: 'de',
    pageLabel: 'Pagina', // for 'pages' mode
}">
                            <template slot="table-row" slot-scope="props">
                                <span v-if="props.column.field === 'btn'">
                                    <a @click="showModalAlterarCategoria(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                                        data-backdrop="static" title="EDITAR" style="background-color: #f0f8ff">
                                        <i class="bx bx-edit-alt"></i>
                                    </a>
                                    <a @click="showModalExcluirCategoria(props.row.id)" size="sm" class="btn btn-sm me-1 mb-1"
                                        data-backdrop="static" title="EXCLUIR" style="background-color: #f0f8ff">
                                        <i class="bx bx-trash-alt"></i>
                                    </a>
                                </span>
                            </template>
                        </vue-good-table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="col-md-12 text-end">
                        <div class="col-md-2 offset-md-10">
                            <button class="btn btn-sm btn-dark" @click="ShowModalFormCategoria()">
                                <i class="bx bx-plus-circle"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </b-overlay>
        <br /><br />
        <Modal :formulario="form_categorias" :functionGetListCategorias="getListCategorias" :funcOnReset="onReset"></Modal>
    </div>
</template>
<script>
import Modal from "./Modal.vue";
import { ServiceCategorias } from "../../services/serviceCategorias";
import { VueGoodTable } from "vue-good-table";
export default {
    components: { VueGoodTable, Modal },
    props: {
        functionCategorias: {
            type: Function,
        },
    },
    data() {
        return {
            modal_form_categoria: "modal_form_categoria",
            isLoading: false,
            categorias: [],
            columns: [
                {
                    label: "ID",
                    field: "id",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Categorias",
                    field: "categoria",
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
            form_categorias: {
                id: "",
                categoria: "",
                data_create: "",
                data_alt: "",
                titulo: "",
                btn: "",
                disabled: false
            },
        };
    },
    created() {
        this.getListCategorias();
    },
    methods: {
        selectCellCategorias(params) {
            if (this.functionCategorias) {
                this.functionCategorias(params);
            }
        },
        getListCategorias() {
            this.isLoading = true;
            ServiceCategorias.getAll()
                .then((obj) => {
                    if (obj) {
                        this.categorias = obj;
                    }
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        showModalAlterarCategoria(id) {
            this.onReset();
            this.form_categorias.titulo = "Alterar Categoria";
            this.form_categorias.btn = "Alterar";
            this.funcGetById(id);
        },
        showModalExcluirCategoria(id) {
            this.form_categorias.titulo = "Excluir Categoria";
            this.form_categorias.btn = "Excluir";
            this.form_categorias.disabled = true;
            this.funcGetById(id);
        },
        ShowModalFormCategoria() {
            this.onReset();
            this.form_categorias.titulo = 'Cadastrar Categoria';
            this.form_categorias.btn = 'Salvar';
            this.$bvModal.show(this.modal_form_categoria);
        },
        onReset() {
            this.form_categorias.id = "";
            this.form_categorias.categoria = "";
            this.form_categorias.data_create = "";
            this.form_categorias.data_alt = "";
            this.form_categorias.disabled = false;
        },
        funcGetById(id) {
            this.isLoading = true;
            ServiceCategorias.getById(id)
                .then(obj => {
                    this.form_categorias.id = obj.data[0].id;
                    this.form_categorias.categoria = obj.data[0].categoria;
                    this.form_categorias.data_create = obj.data[0].data_create;
                    this.form_categorias.data_alt = obj.data[0].data_alt;
                    this.isLoading = false;
                    this.$bvModal.show(this.modal_form_categoria);
                    return
                }).catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>
<style>

</style>