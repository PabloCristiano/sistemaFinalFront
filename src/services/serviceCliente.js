import axios from "axios";
import ApiService from './api.service';

class ServiceCliente {
  async getAll() {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .get(ApiService.url + 'v1/cliente', config)
      .then((response) => {
        return response.data;
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  async storeCliente(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/cliente', data, config)
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
    return await axios.post(ApiService.url + 'v1/cliente/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async alterarCliente(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.put(ApiService.url + 'v1/cliente/' + `${data.id}`, data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async excluirCliente(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.delete(ApiService.url + 'v1/cliente/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }
}
const instance = new ServiceCliente();
export {
  instance as ServiceCliente
}
