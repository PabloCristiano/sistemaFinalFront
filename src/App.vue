<template>
  <div id="app">
    <router-view />
    <footer id="footer">
      <p style="color: aliceblue; margin-right: 10px;">Sistema Web Barbearia, Desenvolvido por <a href="#"
          style="text-decoration: none; color: cornflowerblue;">Pablo Cristiano</a>.</p>
    </footer>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: "Poppins", sans-serif !important;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  /* Altura do corpo igual a 100% da tela */
}

.content {
  padding-bottom: 50px;
  /* Altura do footer */
}
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* Largura igual a 100% da tela */
  height: 50px;
  /* Altura do footer */
  background-color: rgb(33, 37, 41);
  color: #fff;
  text-align: center;
  padding-top: 15px;
  font-size: 10px;
}
</style>
