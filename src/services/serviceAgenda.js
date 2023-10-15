import axios from "axios";
import ApiService from "./api.service";

class ServiceAgenda {
  async getAll() {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .get(ApiService.url + "v1/criarAgenda", config)
      .then((response) => {
        return response.data;
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  async storeAgenda(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/criarAgenda", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
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
    return await axios
      .post(ApiService.url + "v1/criarAgenda/" + `${id}`, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }

  async alterarAgenda(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    return await axios
      .put(ApiService.url + "v1/criarAgenda/" + `${data.id}`, data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }

  async excluirAgenda(id) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    return await axios
      .delete(ApiService.url + "v1/categorias/" + `${id}`, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }

  async findAgendaProfissional(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/agendaprofissional", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }

  async findCriarAgendaProfissional(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/pesquisaAgenda", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }
  async findAgendaProfissionalProximoHorario(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/agendamento/searchnexttime", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }
  async findAllAgendaProfissional(id) {
    try {
      ApiService.setHeader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        ApiService.url + "v1/allAgenda/" + `${id}`,
        config
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async AtulizarExecucaoAgenda(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(
        ApiService.url + "v1/agendamento/AtulizarExecucaoAgenda",
        data,
        config
      )
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }

  async cancelarHorario(data) {
    ApiService.setHeader();
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    return await axios
      .post(ApiService.url + "v1/agendamento/CancelarHorario", data, config)
      .then((obj) => {
        return obj;
      })
      .catch((errors) => {
        return errors;
      });
  }
}
const instance = new ServiceAgenda();
export { instance as ServiceAgenda };
