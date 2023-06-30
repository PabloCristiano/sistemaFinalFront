import axios from "axios";
import ApiService from './api.service';

class ServiceCategorias {
  async getAll() {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .get(ApiService.url + 'v1/categorias', config)
      .then((response) => {
        return response.data;
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  async storeCategoria(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/categorias', data, config)
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
    return await axios.post(ApiService.url + 'v1/categorias/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async alterarCategoria(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.put(ApiService.url + 'v1/categorias/' + `${data.id}`, data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async excluirCategoria(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.delete(ApiService.url + 'v1/categorias/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }
}
const instance = new ServiceCategorias();
export {
  instance as ServiceCategorias
}
