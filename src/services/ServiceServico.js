import axios from "axios";
import ApiService from './api.service';

class ServiceServico {
    async getAll() {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.get(ApiService.url + 'v1/servico', config)
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.log(error)
            // return error;
        }
    }
    async getById(id) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.post(ApiService.url + 'v1/servico/' + `${id}`, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error
        }
    }
    async storeServico(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.post(ApiService.url + 'v1/servico', data, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error;
        }
    }

    async alterarServico(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.put(ApiService.url + 'v1/servico/' + `${data.id}`, data, config)
            if (response) {
                return response
            }

        } catch (error) {
            return error;
        }
    }

    async excluirServico(id) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.delete(ApiService.url + 'v1/servico/' + `${id}`, config)
            if (response) {
                return response;
            }
        } catch (error) {
            return error;
        }
    }
}

const instance = new ServiceServico();
export {
    instance as ServiceServico
}