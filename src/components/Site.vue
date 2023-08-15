<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="Site" class="content text-center">
        <div class="cover-container d-flex  p-3 mx-auto flex-column bg-dark">
            <header class="masthead mb-auto">
                <div class="inner">
                    <h3 class="masthead-brand" style="color: aliceblue;">SISTEMA WEB BARBEARIA</h3>
                    <nav class="nav nav-masthead justify-content-center" style="color: aliceblue;">
                        <a class="nav-link active" href="" style="color: aliceblue;">INÍCIO</a>
                        <!-- <a class="nav-link active"><router-link :to="{ path: '/home' }"
                                style="color: aliceblue; text-decoration: none;">HOME</router-link></a> -->
                        <a class="nav-link active"><router-link :to="{ path: '/login' }"
                                style="color: aliceblue;text-decoration: none;">LOGIN</router-link></a>
                    </nav>
                </div>
            </header>

            <main style="color: aliceblue;">
                <h1 class="">Agora você agenda direto aqui no Site !</h1>
                <div class="row col-12">
                    <div class="col-md-6 offset-md-3">
                        <p id="p1">Agora você também pode realizar seu agendamento diretamente em nosso site. Basta criar uma
                        conta ou, se você já é cliente, basta utilizar seu login e senha já cadastrados.
                    </p>
                    </div>
                </div>
                <p>
                    <a href="" class="btn btn-lg btn-secondary">Agendar</a><br>
                </p>
            </main>

           
        </div>
    </div>
</template>
<script>
export default {
    name:'App',
    data() {
        return {};
    },
};
</script>
<style>
#Site {
    background-color: rgb(33, 37, 41) !important;
    height: 100vh;
    width: 100vw;
    background-color: currentColor;
}
#footer{
    margin-top: 37vh;
    margin-top: 37vh;
}
#p1{
 font-family: monospace;
 
}
</style>