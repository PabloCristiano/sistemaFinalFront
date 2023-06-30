<template>
    <div>
        <b-modal :id="id" size="lg" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant"
            no-close-on-backdrop hide-footer>
            <template v-slot:modal-header="{ close }">
                <h5>{{ titulo }}</h5>
                <b-button style="border:0;" size="sm" variant="outline-light" @click="close()">
                    X
                </b-button>
            </template>
            <b-card class="mt-0 mb-3" header="Formulário de cadastro Pais">
                <slot name="conteudo">
                </slot>
                <slot name="botao">

                </slot>
                <slot name="rodape"></slot>
            </b-card>
        </b-modal>
    </div>
</template>
<script>
export default {
    props: ["id", "titulo", "close"],
    data() {
        return {
            headerBgVariant: "dark",
            headerTextVariant: "light",
        }
    },
    methods: {
        fechar() {
            this.$bvModal.hide(this.id);
        }
    }
};
</script>