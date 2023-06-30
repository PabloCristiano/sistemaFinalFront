import axios from "axios";
import ApiService from './api.service'
class ServicePais {
  async getAll() {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = axios.get(ApiService.url + 'v1/pais', config)
      if (response) {
        return response;
      }
    } catch (errors) {
      return console.log(errors.response.status);
    }
  }

  async salvarPais(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/pais', data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async getById(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/pais/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async alterarPAis(data) {
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.put(ApiService.url + 'v1/pais/' + `${data.id}`, data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async excluirPais(id) {
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.delete(ApiService.url + 'v1/pais/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

}

const instance = new ServicePais();
export {
  instance as ServicePais
}