<template>
    <div class="container" style="margin-bottom: -90px;">
        <b-overlay :show="isLoading" rounded="sm">
            <div class="card mb-5">
                <div class="card-header">Cadastrar Fornecedor</div>
                <div class="card-body">
                    <div class="">
                        <vue-good-table :columns="columns" :rows="fornecedores" @on-cell-click="selectCellFornecedor"
                            :search-options="{
                                enabled: true,
                                placeholder: 'Procure por um Fornecedor',
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
                                    <a @click="showModalAlterarFornecedor(props.row.id)" size="sm"
                                        class="btn btn-sm me-1 mb-1" data-backdrop="static" title="EDITAR"
                                        style="background-color: #f0f8ff">
                                        <i class="bx bx-edit-alt"></i>
                                    </a>
                                    <a @click="showModalExcluirFornecedor(props.row.id)" size="sm"
                                        class="btn btn-sm me-1 mb-1" data-backdrop="static" title="EXCLUIR"
                                        style="background-color: #f0f8ff">
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
                            <button class="btn btn-sm btn-dark" @click="ShowModalFormFonecedor()">
                                <i class="bx bx-plus-circle"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </b-overlay>
        <br /><br />
        <Modal :formulario="form_fornecedor" :functionGetListFornecedor="getListFornecedor" :funcOnReset="onReset"></Modal>
    </div>
</template>
<script>
import { ServiceFornecedor } from "../../services/serviceFornecedor";
import Modal from "./Modal.vue";
import { VueGoodTable } from "vue-good-table";
export default {
    components: { VueGoodTable, Modal },
    props: {
        functionFornecedor: {
            type: Function,
        },
    },
    data() {
        return {
            modal_form_fornecedor: "modal_form_fornecedor",
            isLoading: false,
            fornecedores: [],
            columns: [
                {
                    label: "ID",
                    field: "id",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Fornecedor",
                    field: "razaoSocial",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Nome Fantasia",
                    field: "nomefantasia",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Contato",
                    field: "contato",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Telefone",
                    field: "telefone",
                    thClass: "text-center",
                    tdClass: "text-center",
                },
                {
                    label: "Cidade",
                    field: "cidade.cidade",
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
            form_fornecedor: {
                id: 0,
                tipo_pessoa: "",
                razaoSocial: "",
                nomefantasia: "",
                apelido: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cep: "",
                id_cidade: "",
                cidade: "",
                whatsapp: "",
                telefone: "",
                email: "",
                pagSite: "",
                contato: "",
                cnpj: "",
                ie: "",
                cpf: "",
                rg: "",
                id_condicaopg: '487',
                condicaopg: '30/60/90',
                limiteCredito: "",
                obs: "",
                data_create: "",
                data_alt: "",
                titulo: "",
                btn: "",
                radio: false,
                disabled: false,
                maxCnpj: 18,
                maxCpf: 14,
                maxCep: 9,
                maxWhatsapp: 15,
                maxTelefone: 15,
                maxRg: 9,
            },
        };
    },
    created() {
        this.getListFornecedor();
    },
    methods: {
        getListFornecedor() {
            this.isLoading = true;
            ServiceFornecedor.getAll()
                .then((obj) => {
                    if (obj) {
                        this.fornecedores = obj;
                    }
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        selectCellFornecedor(params) {
            if (this.functionFornecedor) {
                this.functionFornecedor(params);
            }
        },
        showModalAlterarFornecedor(id) {
            this.onReset();
            var titulo = "Alterar Fornecedor";
            var btn = "Alterar";
            var disabled = false;
            this.form_fornecedor.radio = true;
            this.funcGetById(id, titulo, btn, disabled);
        },
        showModalExcluirFornecedor(id) {
            this.onReset();
            var titulo = "Excluir Fornecedor";
            var btn = "Excluir";
            var disabled = true;
            this.form_fornecedor.radio = true;
            this.funcGetById(id, titulo, btn, disabled);
        },
        ShowModalFormFonecedor() {
            this.onReset();
            this.form_fornecedor.radio = false;
            this.form_fornecedor.id_condicaopg = '487';
            this.form_fornecedor.condicaopg = '30/60/90';
            this.form_fornecedor.titulo = "Cadastrar Fornecedor";
            this.form_fornecedor.btn = "Salvar";
            this.$bvModal.show(this.modal_form_fornecedor);
        },
        onReset() {
            this.form_fornecedor.id = "";
            this.form_fornecedor.tipo_pessoa = "JURIDICA";
            this.form_fornecedor.razaoSocial = "";
            this.form_fornecedor.nomefantasia = "";
            this.form_fornecedor.apelido = "";
            this.form_fornecedor.logradouro = "";
            this.form_fornecedor.numero = "";
            this.form_fornecedor.complemento = "";
            this.form_fornecedor.bairro = "";
            this.form_fornecedor.cep = "";
            this.form_fornecedor.whatsapp = "";
            this.form_fornecedor.telefone = "";
            this.form_fornecedor.email = "";
            this.form_fornecedor.pagSite = "";
            this.form_fornecedor.contato = "";
            this.form_fornecedor.cnpj = "";
            this.form_fornecedor.ie = "";
            this.form_fornecedor.cpf = "";
            this.form_fornecedor.rg = "";
            this.form_fornecedor.obs = "";
            this.form_fornecedor.limiteCredito = "";
            this.form_fornecedor.id_cidade = "";
            this.form_fornecedor.cidade = "";
            this.form_fornecedor.id_condicaopg = "";
            this.form_fornecedor.condicaopg = "";
            this.form_fornecedor.data_create = "";
            this.form_fornecedor.data_alt = "";
            this.form_fornecedor.disabled = false;
        },
        funcGetById(id, titulo, btn, disabled) {
            this.isLoading = true;
            ServiceFornecedor.getById(id)
                .then(obj => {
                    this.form_fornecedor.id = obj.data[0].id;
                    this.form_fornecedor.tipo_pessoa = obj.data[0].tipo_pessoa;
                    this.form_fornecedor.razaoSocial = obj.data[0].razaoSocial;
                    this.form_fornecedor.nomefantasia = obj.data[0].nomefantasia;
                    this.form_fornecedor.apelido = obj.data[0].apelido;
                    this.form_fornecedor.cnpj = obj.data[0].cnpj;
                    this.form_fornecedor.cpf = obj.data[0].cpf;
                    this.form_fornecedor.ie = obj.data[0].ie;
                    this.form_fornecedor.rg = obj.data[0].rg;
                    this.form_fornecedor.cep = obj.data[0].cep;
                    this.form_fornecedor.logradouro = obj.data[0].logradouro;
                    this.form_fornecedor.numero = obj.data[0].numero;
                    this.form_fornecedor.complemento = obj.data[0].complemento;
                    this.form_fornecedor.bairro = obj.data[0].bairro;
                    this.form_fornecedor.id_cidade = obj.data[0].cidade.id;
                    this.form_fornecedor.cidade = obj.data[0].cidade.cidade;
                    this.form_fornecedor.whatsapp = obj.data[0].whatsapp;
                    this.form_fornecedor.telefone = obj.data[0].telefone;
                    this.form_fornecedor.email = obj.data[0].email;
                    this.form_fornecedor.pagSite = obj.data[0].pagSite;
                    this.form_fornecedor.contato = obj.data[0].contato;
                    this.form_fornecedor.limiteCredito = obj.data[0].limiteCredito;
                    this.form_fornecedor.id_condicaopg = '487';
                    this.form_fornecedor.condicaopg = '30/60/90';
                    this.form_fornecedor.obs = obj.data[0].obs;
                    this.form_fornecedor.data_create = obj.data[0].data_create;
                    this.form_fornecedor.data_alt = obj.data[0].data_alt;
                    this.form_fornecedor.titulo = titulo;
                    this.form_fornecedor.btn = btn;
                    this.form_fornecedor.disabled = disabled;
                    this.isLoading = false;
                    this.$bvModal.show(this.modal_form_fornecedor);
                    return
                }).catch(error => {
                    console.log(error)
                })
        }
    },
};
</script>
<style></style>
  