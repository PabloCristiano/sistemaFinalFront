import axios from "axios";
import ApiService from "./api.service";

class ServiceContasPagar {
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
        ApiService.url + "v1/contaspagar",
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
  async storeContasPagar(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/contaspagar", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
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
        ApiService.url + "v1/contaspagar/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async excluirContasPagar(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.delete(
        ApiService.url + "v1/contaspagar/" + `${id}`,
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
const instance = new ServiceContasPagar();
export { instance as ServiceContasPagar };
