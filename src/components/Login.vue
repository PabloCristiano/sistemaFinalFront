<template>
  <div id="login">
    <nav class="navbar navbar-light bg-dark">
      <router-link
        :to="{ path: '/' }"
        style="
          text-decoration: none;
          color: white;
          margin-left: 10px;
          font-size: 20px;
        "
        >HOME</router-link
      >
    </nav>
    <b-overlay :show="isLoading" rounded="sm">
      <div class="container mt-2" style="overflow: hidden">
        <div id="divLogin" class="row mt-5">
          <div
            class="col-md-4 offset-md-4 mt-3 mb-3"
            style="background-color: rgb(33, 37, 41); color: white"
          >
            <div class="text-center">
              <h2>BARBER SHOP</h2>
            </div>
            <form class="form" action="" method="post">
              <div class="form-group">
                <label for="username">E-mail:</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="form.email"
                />
              </div>
              <div class="form-group mb-3">
                <label for="password">Senha:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                />
              </div>
              <div v-if="msg" class="alert alert-danger text-center" role="alert"><span>{{ msg }}</span></div>
              <div class="text-center">
                <input
                  type="button"
                  name="submit"
                  value="Entrar"
                  class="btn btn-primary mt-2 mb-2"
                  style="
                    background-color: white;
                    color: black;
                    border-color: white;
                  "
                  @click="login()"
                />
              </div>
              <div class="text-center">
                <a href="#" class="btn btn-link" style="color: white"
                  >Cadastre-se</a
                >
              </div>
              <div class="text-center">
                <a href="#" class="btn btn-link" style="color: white"
                  >Esqueceu a Senha</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import { UserService } from "../services/user.service.js";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        email: "",
        password: ""
      },
      msg:'',
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.msg = '';
      try {
        const response = await UserService.login(
          this.form.email,
          this.form.password
        );
        if (response) {
          this.msg = "Usuário ou Senha, estão incorretos.";
          this.isLoading = false;
        }
      } catch (e) {
        console.log(e);
        this.isLoading = false;
      }
    }
  }
};
</script>
<style :scoped>
#divLogin {
  margin-bottom: 101px;
}
</style>
