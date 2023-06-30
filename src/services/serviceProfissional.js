import axios from "axios";
import ApiService from './api.service';

class ServiceProfissional {
    async getAll() {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.get(ApiService.url + 'v1/profissional', config)
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
            const response = await axios.post(ApiService.url + 'v1/profissional/' + `${id}`, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error
        }
    }
    async storeProfissional(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.post(ApiService.url + 'v1/profissional', data, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error;
        }
    }

    async alterarProfissional(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.put(ApiService.url + 'v1/profissional/' + `${data.id}`, data, config)
            if (response) {
                return response
            }

        } catch (error) {
            return error;
        }
    }

    async excluirProfissional(id) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.delete(ApiService.url + 'v1/profissional/' + `${id}`, config)
            if (response) {
                return response;
            }
        } catch (error) {
            return error;
        }
    }
}

const instance = new ServiceProfissional();
export {
    instance as ServiceProfissional
}