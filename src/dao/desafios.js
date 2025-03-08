import { Mongo } from "../database/mongo.js";


export default class DesafiosDAO {

    async setDesafioDiario() {

        const validacaoDesafio = await Mongo.db
        .collection('historico')
        .findOne(
            {
                data: {$eq: new Date().toLocaleDateString("en-GB")}
            }
        )

        if(validacaoDesafio){
            throw new Error("Desafio do dia já foi adicionado.")
        }

        const desafio = await Mongo.db
        .collection('desenho')
        .findOne();

        if(!desafio._id) {
            throw new Error("Não foi possível atualizar o desafio.")
        }

        const result = await Mongo.db
        .collection('historico')
        .insertOne({
            "desafioId": desafio._id,
            "data": new Date().toLocaleDateString("en-GB")
        })

        if(!result.insertedId) {
            throw new Error("Não foi possível adicionar o desafio ao Histórico.")
        }

        return result;

    }

    async getDesafioDiario() {

        const result = await Mongo.db
        .collection("historico")
        .aggregate([
            { $match: {data: new Date().toLocaleDateString("en-GB")}},
            { $lookup: {
                from: 'desenho',
                localField: 'desafioId',
                foreignField: '_id',
                as: 'desafio'
            }},
            {
                $unwind: {
                    path: "$desafio"
                }
            }
        ])
        .toArray();

        if(result.length == 0) {
            throw new Error("Não foi possível resgatar o desafio.")
        }

        return result;
    }


}