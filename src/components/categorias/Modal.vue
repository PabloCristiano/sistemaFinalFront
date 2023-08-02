<template>
    <div>
        <b-modal :id="modal_form_categoria" size="lg" :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant" no-close-on-backdrop hide-footer>
            <template v-slot:modal-header>
                <h5>{{ form.titulo }}</h5>
                <b-button style="border: 0" size="sm" variant="outline-light" @click="closeCategoria()">
                    X
                </b-button>
            </template>
            <b-card class="mt-0 mb-3" header="Formulário de cadastro Categoria">
                <slot name="conteudo">
                    <b-form>
                        <div class="row col-12">
                            <div class="col-md-2">
                                <label>Código:</label>
                                <b-form-input id="id" type="text" placeholder="Id" v-model="form.id" disabled>
                                </b-form-input>
                            </div>
                            <div class="col-md-10">
                                <label>Categoria:<b style="color: rgb(245, 153, 153)"> *</b></label>
                                <b-form-input id="categoria" type="text" placeholder="Digite nome de uma categoria"
                                    :class="{ 'fail-error': $v.form.categoria.$error }" v-model="form.categoria"
                                    :disabled="form.disabled">
                                </b-form-input>
                                <small style="font-size: 11px; color: rgb(228 96 96)">
                                    {{ validationMsg($v.form.categoria) }}
                                </small>
                            </div>
                            <small class="mt-2" style="font-size: 12px">Campos com <b
                                    style="color: rgb(245, 153, 153)">*</b> são
                                obrigatórios !</small>
                        </div>
                    </b-form>
                </slot>
                <slot name="botao">
                    <div class="d-flex justify-content-end">
                        <b-button class="btn btn-sm me-1" type="button" variant="dark" @click.prevent="closeCategoria()">
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
    </div>
</template>
<script>
import * as validators from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import { ServiceCategorias } from "../../services/serviceCategorias";
import { formataDataTempo } from '../../rules/filters';
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
    props: { formulario: { type: Object }, 
             functionGetListCategorias: { type: Function }, 
             funcOnReset: { type: Function } 
            },
    data() {
        return {
            form: this.formulario,
            headerBgVariant: "dark",
            headerTextVariant: "light",
            modal_form_categoria: 'modal_form_categoria',
        };
    },
    filters:{
        formataDataTempo
    },
    validations: {
        form: {
            categoria: {
                required: validators.required,
                txtMinLen: validators.minLength(3),
            },
        },
    },
    methods: {
        fGetListCategoria() {
            this.functionGetListCategorias();
        },
        validationMsg: validationMessage(formMessages),
        onReset() {
            this.$v.$reset();
            this.funcOnReset();
        },
        closeCategoria() {
            this.onReset();
            this.$bvModal.hide(this.modal_form_categoria);
        },
        onSubmit() {
            const vm = this;
            if (this.$v.$invalid) {
                this.$v.$touch();
            } else {
                if (this.form.btn === 'Salvar') {
                    ServiceCategorias.storeCategoria(this.form)
                        .then(response => {
                            if (response.status === 200) {
                                notyf.success(response.data.success);
                                vm.onReset();
                                vm.$bvModal.hide(vm.modal_form_categoria);
                                this.fGetListCategoria();
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
                    ServiceCategorias.alterarCategoria(this.form)
                        .then(response => {
                            if (response.status === 200) {
                                notyf.success(response.data.success);
                                vm.onReset();
                                vm.$bvModal.hide(vm.modal_form_categoria);
                                this.fGetListCategoria();
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
                    ServiceCategorias.excluirCategoria(this.form.id)
                        .then((obj) => {
                            if (obj.status === 200) {
                                notyf.success(obj.data.success);
                                this.onReset();
                                this.$bvModal.hide(this.modal_form_categoria);
                                this.fGetListCategoria();
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
        }
    }
};
</script>
<style>
.fail-error {
    border: 2px solid #e46060bb;
}
</style>