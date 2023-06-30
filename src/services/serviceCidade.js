import axios from "axios";
import ApiService from './api.service';

class ServiceCidade {
  async getAll() {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .get(ApiService.url + 'v1/cidade', config)
      .then((response) => {
        return response.data;
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  async storeCidade(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios.post(ApiService.url + 'v1/cidade', data, config)
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
    return await axios.post(ApiService.url + 'v1/cidade/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async alterarCidade(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.put(ApiService.url + 'v1/cidade/' + `${data.id}`, data, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }

  async excluirCidade(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": 'application/json',
        Accept: "application/json",
      },
    };
    return await axios.delete(ApiService.url + 'v1/cidade/' + `${id}`, config)
      .then(obj => {
        return obj
      }).catch(errors => {
        return errors
      });
  }
}
const instance = new ServiceCidade();
export {
  instance as ServiceCidade
}
