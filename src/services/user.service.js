import ApiService from './api.service'
import {
  TokenService
} from './storage.service'
import NProgress from 'nprogress'
import routes from '../router/index.js'
import axios from "axios";
import {
  Notyf
} from 'notyf';
const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [{
      type: 'success',
      background: 'Purple',
      duration: 5000,
      dismissible: true

    },
    {
      type: 'error',
      background: 'indianred',
      duration: 5000,
      dismissible: true
    }
  ]
});
class UserService {

  async login(username, password) {
    try {
      let data = {
        email: username,
        password: password,
      }
      const response = await axios.post(ApiService.url + 'login', data)
      if (response) {
        TokenService.saveToken(response.data.accessToken);
        TokenService.saveRefreshToken(response.data.refresh_token);
        ApiService.setHeader();
      }
      const user =  await axios.post(ApiService.url + 'v1/me');
      if (user) {
        TokenService.setUser(user);
      }
      NProgress.done();
      // routes.push('/home');
      routes.push({
        name: "Home",
        params: { user: user },
      });
      // notyf.success('Seja Bem Vindo(a) ! ' + user.data.profissional);
      return 
    } catch (err) {
      return err.response.data.error;
    }
  }



  // async login(username, password) {
  //   let data = {
  //     email: username,
  //     password: password,
  //   }
  //   await axios.post(ApiService.url + 'login', data)
  //     .then((response) => {
  //       NProgress.start();
  //       if (response) {
  //         TokenService.saveToken(response.data.accessToken);
  //         TokenService.saveRefreshToken(response.data.refresh_token);
  //         ApiService.setHeader();
  //         axios.post(ApiService.url + 'v1/me').then((response) => {
  //           if (response) {
  //             TokenService.setUser(response);
  //           }
  //         }).catch((e) => {
  //           console.log(e);
  //         })
  //         // ApiService.mount401Interceptor();
  //         // window.localStorage.setItem('notification-open', 1);
  //         setTimeout(function () {
  //           NProgress.done();
  //           routes.push('/home');
  //         }, 1000);
  //       }
  //       return response;
  //     }).catch((e) => {
  //       return notyf.error(e.response.data.error);
  //     })

  // }

  logout() {
    TokenService.removeToken();
    notyf.success('Logout efetuado com sucesso !. Obrigado por utilizar nosso sistema!');
    routes.push('/');
    //window.location.reload();
    return
  }


  // /**
  // * Refresh the access token.
  // **/
  // refreshToken: async function () {
  // // console.log('refresh');
  // const refreshToken = TokenService.getRefreshToken();
  // // console.log( TokenService.parseToken())
  // var userName = TokenService.parseToken().username;

  // const requestData = {
  // method: 'post',
  // url: "token",
  // data: {
  // refresh_token: refreshToken,
  // username: userName
  // }
  // };

  // try {
  // const response = await ApiService.customRequest(requestData);
  // TokenService.saveToken(response.data.access_token);
  // TokenService.saveRefreshToken(response.data.refresh_token);
  // // Update the header in ApiService
  // ApiService.setHeader();

  // ApiService.mount401Interceptor();
  // return response.data.access_token
  // } catch (error) {
  // // console.log(error.response.data);
  // if (error.response.data.error_code != undefined) {
  // //erro do refresh token invlalido
  // if (error.response.data.error_code == 'RFT-01') {
  // this.logout();
  // window.location.replace('/');
  // return;
  // }
  // }

  // throw new AuthenticationError(error.response.status, error.response.data.detail)
  // }

  // },

  // /**
  // * Logout the current user by removing the token from storage.
  // *
  // * Will also remove `Authorization Bearer <token>` header from future requests.
  // **/
  // logout() {
  // // Remove the token and remove Authorization header from Api Service as well
  // TokenService.removeToken();
  // TokenService.removeRefreshToken();
  // ApiService.removeHeader();

  // ApiService.unmount401Interceptor()
  // },

  // ghostLogin(email) {
  // return ApiService.post("usuario/loginadm", {
  // email
  // });
  // },

  // ghostLogout() {
  // return ApiService.post("usuario/logoutadm");
  // },

  // getAll() {
  // return ApiService.get("api/usuario");
  // },

  // forceRefresh() {
  // return ApiService.post(`usuario/refresh/${TokenService.getToken()}`)
  // },

  // getById(id) {
  // return ApiService.get("api/usuario/" + id);
  // },

  // save(User) {
  // if (User.Id) {
  // // console.log("Update");
  // return ApiService.put('api/usuario/', User);
  // } else return ApiService.post('api/usuario/', User)
  // },

  // delete(id) {
  // return ApiService.delete('api/usuario/' + id)
  // },

  // getNotifications(id) {
  // return ApiService.get("api/lembrete/usuarioid?id=" + id)
  // }



}
// export {
// UserService,
// // AuthenticationError
//
const instance = new UserService();
export {
  instance as UserService
}