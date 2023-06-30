import axios from "axios";
import ApiService from './api.service';

class ServiceEstado {
  async getAll() {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .get(ApiService.url + 'v1/estado', config)
      .then((response) => {
        return response.data;
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  async storeEstado(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/estado', data, config)
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
    return await axios.post(ApiService.url + 'v1/estado/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async alterarEstado(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.put(ApiService.url + 'v1/estado/' + `${data.id}`, data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async excluirEstado(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.delete(ApiService.url + 'v1/estado/' + `${id}`,config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }
}
const instance = new ServiceEstado();
export {
  instance as ServiceEstado
}
