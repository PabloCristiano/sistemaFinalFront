import axios from "axios";
import ApiService from "./api.service";

class ServiceCompra {
  async getAll() {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.get(ApiService.url + "v1/compra", config);
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
        ApiService.url + "v1/compra/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  async storeCompra(data) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        ApiService.url + "v1/compra",
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

  async alterarCompra(data) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.put(
        ApiService.url + "v1/compra/" + `${data.id}`,
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

  async excluirCompra(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.delete(
        ApiService.url + "v1/compra/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  async validaNumNota(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        ApiService.url + "v1/compra/validaNumNota/" + `${id}`,
        { numero_nota: id },
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
const instance = new ServiceCompra();
export { instance as ServiceCompra };
