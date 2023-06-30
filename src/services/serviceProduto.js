import axios from "axios";
import ApiService from './api.service';

class ServiceProduto {
    async getAll() {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.get(ApiService.url + 'v1/produto', config)
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
            const response = await axios.post(ApiService.url + 'v1/produto/' + `${id}`, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error
        }
    }
    async storeProduto(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.post(ApiService.url + 'v1/produto', data, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error;
        }
    }

    async alterarProduto(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.put(ApiService.url + 'v1/produto/' + `${data.id}`, data, config)
            if (response) {
                return response
            }

        } catch (error) {
            return error;
        }
    }

    async excluirProduto(id) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.delete(ApiService.url + 'v1/produto/' + `${id}`, config)
            if (response) {
                return response;
            }
        } catch (error) {
            return error;
        }
    }
}

const instance = new ServiceProduto();
export {
    instance as ServiceProduto
}