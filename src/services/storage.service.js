const TOKEN_KEY = 'access_token';
const USER_NAME = 'User_name';
const USER_EMAIL = 'User_email';
const TYPE_USER = 'Type_user';
const REFRESH_TOKEN_KEY = 'refresh_token';


const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

   setUser (data){
     localStorage.setItem(USER_NAME, data.data.profissional);
     localStorage.setItem(USER_EMAIL, data.data.email);
     localStorage.setItem(TYPE_USER, data.data.usuario === 1 ? true : false);
  },

  getUser(){
     var data  =  {
       Nome : localStorage.getItem(USER_NAME),
       Email : localStorage.getItem(USER_EMAIL),
       isUser : localStorage.getItem(TYPE_USER)
     }
    return data
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_NAME)
    localStorage.removeItem(USER_EMAIL)
    localStorage.removeItem(TYPE_USER)
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  parseToken(str = null) {
    var token = str ? str : this.getToken();

    if (token && token != '') {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      let response = JSON.parse(jsonPayload);
      if (typeof response.actort == 'string') {
        response.actort = JSON.parse(response.actort);
      }
      return response;
    }
  },

  getRole() {
    var user = TokenService.parseToken();
    if (user && user.role.length) return user.role;
    return '';
  },

  isAdmin() {
    return this.getPermissions().indexOf("MODULO_GERAL") !== -1;
  },

  getPermissions() {
    let user = this.parseToken();
    if (!user) return [];
    return user.actort.Permissoes || user.actort.permissoes;
  },

  checkPermissions(perms = [], roles = false) {
    if (!roles) roles = this.getPermissions();

    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < perms.length; j++) {
        if (perms[j] === roles[i])
          return true;
      }
    }
    return false;
  },

  isUser() {
    return !this.isAdmin();
  },
  //  verificaToken() {
  //   let config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Accept: "application/json",
  //     },
  //   };
  //   return  axios.post(ApiService.url + 'v1/me', data, config)
  //     .then(obj => {
  //       console.log(obj);
  //       return obj
  //     }).catch(errors => {
  //       console.log(errors);
  //       return errors
  //     });

  // }

};

export {
  TokenService
}
