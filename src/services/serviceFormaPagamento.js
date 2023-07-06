import axios from "axios";
import ApiService from './api.service';

class ServiceFormaPagamento {
    async getAll() {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.get(ApiService.url + 'v1/formapagamento', config)
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
            const response = await axios.post(ApiService.url + 'v1/formapagamento/' + `${id}`, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error
        }
    }
    async storeFormaPagamento(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
            const response = await axios.post(ApiService.url + 'v1/formapagamento', data, config)
            if (response) {
                return response
            }
        } catch (error) {
            return error;
        }
    }

    async alterarFormaPagamento(data) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.put(ApiService.url + 'v1/formapagamento/' + `${data.id}`, data, config)
            if (response) {
                return response
            }

        } catch (error) {
            return error;
        }
    }

    async excluirFormaPagamento(id) {
        try {
            ApiService.setHeader();
            let config = {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                },
            }
            const response = await axios.delete(ApiService.url + 'v1/formapagamento/' + `${id}`, config)
            if (response) {
                return response;
            }
        } catch (error) {
            return error;
        }
    }
}
const instance = new ServiceFormaPagamento();
export {
    instance as ServiceFormaPagamento
}