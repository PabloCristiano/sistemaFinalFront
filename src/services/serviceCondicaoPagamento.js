import axios from "axios";
import ApiService from "./api.service";

class ServiceCondicaoPagamento {
  async getAll() {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.get(
        ApiService.url + "v1/condicaopagemento",
        config
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      // return error;
    }
  }
  async getById(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
         // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        ApiService.url + "v1/condicaopagemento/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  async storeCondicaoPagemento(data) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        ApiService.url + "v1/condicaopagemento",
        data,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async alterarCondicaoPagemento(data) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.put(
        ApiService.url + "v1/condicaopagemento/" + `${data.id}`,
        data,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async excluirCondicaoPagemento(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.delete(
        ApiService.url + "v1/condicaopagemento/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
}
const instance = new ServiceCondicaoPagamento();
export { instance as ServiceCondicaoPagamento };
