import DesafiosDAO from "../dao/desafios";
import { serverError, success } from "../helper/httpResponse";


export default class DesafiosController {
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
}