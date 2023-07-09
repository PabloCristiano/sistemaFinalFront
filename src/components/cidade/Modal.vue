<template>
    <div>
        <b-modal :id="modal_form_cidade" size="lg" :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
            <template v-slot:modal-header>
                <h5>{{ form.titulo }}</h5>
                <b-button style="border: 0" size="sm" variant="outline-light" @click="closeCidade()">
                    X
                </b-button>
            </template>
            <b-card class="mt-0 mb-3" header="Formulário de cadastro Cidade">
                <slot name="conteudo">
                    <b-form>
                        <div class="row col-12">
                            <div class="col-md-2">
                                <label>Código:</label>
                                <b-form-input id="id" type="text" placeholder="Id" v-model="form.id" disabled>
                                </b-form-input>
                            </div>
                            <div class="col-md-8">
                                <label>Cidade:<b style="color: rgb(245, 153, 153)"> *</b></label>
                                <b-form-input id="cidade" type="text" placeholder="Digite nome da Cidade"
                                    :class="{ 'fail-error': $v.form.cidade.$error }" v-model="form.cidade"
                                    :disabled="form.disabled">
                                </b-form-input>
                                <small style="font-size: 11px; color: red">
                                    {{ validationMsg($v.form.cidade) }}
                                </small>
                            </div>
                            <div class="col-md-2">
                                <label>DDD:<b style="color: rgb(245, 153, 153)"> *</b></label>
                                <b-form-input id="ddd" type="number" placeholder="DDD"
                                    :class="{ 'fail-error': $v.form.ddd.$error }" v-model="form.ddd"
                                    :disabled="form.disabled">
                                </b-form-input>
                                <small style="font-size: 11px; color: red">
                                    {{ validationMsg($v.form.ddd) }}
                                </small>
                            </div>
                        </div>
                        <div class="row col-12 mt-2">
                            <div class="col-md-2">
                                <label>Código:</label>
                                <b-form-input id="id_estado" type="number" placeholder="Id"
                                    :class="{ 'fail-error': $v.form.id_estado.$error }" v-model="form.id_estado"
                                    :disabled="form.disabled" v-debounce:1000ms="estadoDebounce">
                                </b-form-input>
                                <small style="font-size: 11px; color: red">
                                    {{ validationMsg($v.form.id_estado) }}
                                </small>
                            </div>
                            <div class="col-md-10">
                                <label>Estado:<b style="color: rgb(245, 153, 153)"> *</b></label>
                                <b-overlay :show="isLoadingEstado" rounded="sm">
                                    <b-input-group class="mb-3">
                                        <b-form-input id="estado" type="text" placeholder="Estado" v-model="form.estado"
                                            :class="{ 'fail-error': $v.form.estado.$error }" disabled>
                                        </b-form-input>
                                        <b-input-group-append>
                                            <b-button @click="showSearchEstado()" text="Button" variant="dark"
                                                :disabled="form.disabled"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" fill="currentColor" class="bi bi-search"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <small style="font-size: 11px; color: red">
                                        {{ validationMsg($v.form.estado) }}
                                    </small>
                                </b-overlay>
                            </div>
                            <small class="mt-2" style="font-size: 12px">Campos com <b
                                    style="color: rgb(245, 153, 153)">*</b> são
                                obrigatórios !</small>
                        </div>
                    </b-form>
                </slot>
                <slot name="botao">
                    <div class="d-flex justify-content-end">
                        <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="closeCidade()">
                            Cancelar
                        </b-button>
                        <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="onSubmit()">
                            {{ form.btn }}<i class="bx bx-check"></i>
                        </b-button>
                    </div>
                </slot>
                <slot name="rodape">
                    <div class="col-12">
                        <small class="col-6 me-1" style="font-size: 11px"><b>Data Criação:</b> {{ form.data_create |
                            formataDataTempo
                        }}</small>
                        <small class="col-6 me-1" style="font-size: 11px"><b>Data Ult-Alteração:</b> {{ form.data_alt |
                            formataDataTempo
                        }}</small>
                    </div>
                </slot>
            </b-card>
        </b-modal>
        <div>
            <b-modal :id="modal_search_estado" size="xl" :header-bg-variant="headerBgVariant"
                :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
                <template v-slot:modal-header>
                    <h5>Pesquisar Estado</h5>
                    <b-button style="border: 0" size="sm" variant="outline-light" @click="fecharModalSearchEstado()">
                        X
                    </b-button>
                </template>
                <b-container fluid>
                    <HomeEstado :functionEstado="changeSearchEstado"></HomeEstado>
                </b-container>
                <b-container class="col-sm-12 col-md-12 mt-3" footer style="text-align: center;">
                    <b-button @click="fecharModalSearchEstado()" type="button" id="" class="btn btn-dark btn-sm">Fechar
                        Pesquisa Estado</b-button>
                </b-container>
            </b-modal>
        </div>
    </div>
</template>
<script>
import HomeEstado from "../estado/HomeEstado.vue";
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import { ServiceCidade } from "../../services/serviceCidade";
import { ServiceEstado } from "../../services/serviceEstado";
import { formataDataTempo} from '../../rules/filters';
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
};
export default {
    props: { formulario: { type: Object }, functionGetListCidade: { type: Function } },
    components: { HomeEstado },
    data() {
        return {
            form: this.formulario,
            headerBgVariant: "dark",
            headerTextVariant: "light",
            modal_form_cidade: 'modal_form_cidade',
            modal_search_estado: 'modal_search_estado',
            isLoadingEstado: false,
        };
    },
    filters: {
        formataDataTempo
    },
    validations: {
        form: {
            cidade: {
                required: validators.required,
                txtMinLen: validators.minLength(3),
            },
            ddd: {
                required: validators.required,
                txtMinLen: validators.minLength(2),
                txtMaxLen: validators.maxLength(5),
                integer: validators.integer
            },
            id_estado: {
                required: validators.required,
                integer: validators.integer
            },
            estado: {
                required: validators.required
            }

        },
    },
    methods: {
        fGetListCidade() {
            this.functionGetListCidade();
        },
        changeSearchEstado(obj) {
            if (obj.column.field === "btn") {
                return;
            }
            this.form.id_estado = obj.row.id;
            this.form.estado = obj.row.estado;
            this.$bvModal.hide(this.modal_search_estado);
        },
        fecharModalSearchEstado() {
            this.$bvModal.hide(this.modal_search_estado);
        },
        closeCidade() {
            this.onReset();
            this.$bvModal.hide(this.modal_form_cidade);
        },
        showSearchEstado() {
            // this.form.id_estado = '';
            // this.form.estado = '';
            this.$bvModal.show(this.modal_search_estado);
        },
        validationMsg: validationMessage(formMessages),
        onReset() {
            this.$v.$reset();
            this.form.id = "";
            this.form.cidade = "";
            this.form.ddd = "";
            this.form.id_estado = "";
            this.form.estado = "";
            this.form.data_create = "";
            this.form.data_alt = "";
        },
        onSubmit() {
            const vm = this;
            if (this.$v.$invalid) {
                this.$v.$touch();
            } else {
                if (this.form.btn === 'Salvar') {
                    ServiceCidade.storeCidade(this.form)
                        .then(response => {
                            if (response.status === 200) {
                                notyf.success(response.data.success);
                                vm.onReset();
                                vm.$bvModal.hide(vm.modal_form_cidade);
                                this.fGetListCidade();
                            } else {
                                if (response.response.data.errors != null) {
                                    Object.keys(response.response.data.errors).forEach(function (key) {
                                        notyf.error(response.response.data.errors[key][0]);
                                    });
                                }
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                }
                if (this.form.btn === 'Alterar') {
                    ServiceCidade.alterarCidade(this.form)
                        .then(response => {
                            if (response.status === 200) {
                                notyf.success(response.data.success);
                                vm.onReset();
                                vm.$bvModal.hide(vm.modal_form_cidade);
                                this.fGetListCidade();
                            } else {
                                if (response.response.data.errors != null) {
                                    Object.keys(response.response.data.errors).forEach(function (key) {
                                        notyf.error(response.response.data.errors[key][0]);
                                    });
                                }
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                }
                if (this.form.btn === 'Excluir') {
                    ServiceCidade.excluirCidade(this.form.id)
                        .then((obj) => {
                            if (obj.status === 200) {
                                notyf.success(obj.data.success);
                                this.onReset();
                                this.$bvModal.hide(this.modal_form_cidade);
                                this.fGetListCidade();
                            } else {
                                if (obj.response.data.erro.length > 0) {
                                    notyf.error(obj.response.data.erro[0]);
                                }
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        },
        estadoDebounce(id) {
            this.isLoadingEstado = true;
            let vm = this;
            ServiceEstado.getById(id).then(response => {
                if (response.status === 200) {
                    vm.form.estado = response.data[0].estado;
                    this.isLoadingEstado = false;
                } else {
                    vm.form.estado = '';
                    this.isLoadingEstado = false;
                    notyf.error('Estado não encontrado');
                }
            })
        },
    }
};
</script>
<style>
.fail-error {
    border: 2px solid #e46060bb;
}
</style>
  