import DesafiosDAO from "../dao/desafios.js";
import { serverError, success } from "../helper/httpResponse.js";


export default class HistoricoController {
    constructor() {
        this.dataAcess = new DesafiosDAO();
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
}