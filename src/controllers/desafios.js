import DesafiosDAO from "../dao/desafios.js";
import { serverError, success } from "../helper/httpResponse.js";


export default class DesafiosController {
    constructor() {
        this.dataAcess = new DesafiosDAO();
    }
    
    async getDesafioDoHistorico(id) {
        try {
            const result = await this.dataAcess.getDesafioPorId(id)

            return success(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async getDesafio() {
        try {
            const result = await this.dataAcess.getDesafioDiario();

            return success(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async setDesafio() {
        try {
            const result = await this.dataAcess.setDesafioDiario();

            return success(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async getHistorico() {
        try {
            const result = await this.dataAcess.getHistorico();

            return success(result);
        } catch (error) {
            return serverError(error);
        }
    }
}