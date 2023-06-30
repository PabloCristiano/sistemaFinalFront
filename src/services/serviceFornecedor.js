import axios from "axios";
import ApiService from './api.service';

class ServiceFornecedor {
    async getAll() {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      return await axios
        .get(ApiService.url + 'v1/fornecedor', config)
        .then((response) => {
          return response.data;
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  
    async storeFornecedor(data) {
      console.log(data);
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      return await axios.post(ApiService.url + 'v1/fornecedor', data, config)
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
      return await axios.post(ApiService.url + 'v1/fornecedor/' + `${id}`, config)
        .then(obj => {
          return obj
        }).catch(errors => {
          return errors
        });
    }
  
    async alterarFornecedor(data) {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": 'application/json',
          Accept: "application/json",
        },
      };
      return await axios.put(ApiService.url + 'v1/fornecedor/' + `${data.id}`, data, config)
        .then(obj => {
          return obj
        }).catch(errors => {
          return errors
        });
    }
  
    async excluirFornecedor(id) {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": 'application/json',
          Accept: "application/json",
        },
      };
      return await axios.delete(ApiService.url + 'v1/fornecedor/' + `${id}`, config)
        .then(obj => {
          return obj
        }).catch(errors => {
          return errors
        });
    }
  }
  const instance = new ServiceFornecedor();
  export {
    instance as ServiceFornecedor
  }