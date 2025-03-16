import { DateTime } from "luxon";
import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


export default class DesafiosDAO {

    async getDesafioPorId() {
        const result = await Mongo.db
        .collection("historico")
        .aggregate([
            { $match: {_id: _id}},
            { $lookup: {
                from: 'desafios',
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
            throw new Error("Desafio diário  não foi escolhido até o momento.")
        }

        return result;
    }

    async encontrarNovoDesafio() {
        const result = await Mongo.db
        .collection('desafios')
        .findOne(
            {historico_id: {$exists: false}},
        );

        return result;
    }

    async setHistoricoId(desafio) {
        const result = await Mongo.db
        .collection('desafios')
        .updateOne(
            { _id: desafio._id},
            {
                $set: {"historico_id": insertHistorico.insertedId}
            }
        );

        return result;
    }

    async insertDesafioHistorico(desafioId, data) {
        const result = await Mongo.db
        .collection('historico')
        .insertOne({
            "desafioId": desafioId,
            "data": data
        })

        return result;
    }

    async getDesafioPorData(data) {

        const result = await Mongo.db
        .collection('historico')
        .findOne(
            {
                data: {$eq: data}
            }
        )

        return result;
    }

    async setDesafioDiario() {

        const data = DateTime.local().setZone('America/Sao_paulo').setLocale('pt-br').toLocaleString();

        const validacaoDesafio = await this.getDesafioPorData(data)

        if(validacaoDesafio){
            throw new Error("Desafio do dia já foi adicionado.")
        }

        const desafio = await Mongo.db
        .collection('desafios')
        .findOne(
            {historico_id: {$exists: false}},
        )

        if(!desafio._id) {
            throw new Error("Não foi possível atualizar o desafio.")
        }

        const insertHistorico = await this.insertDesafioHistorico(desafio._id, data);

        if(!insertHistorico.insertedId) {
            throw new Error("Não foi possível adicionar o desafio ao Histórico.")
        }
        
        const result = await Mongo.db
        .collection('desafios')
        .updateOne(
            { _id: desafio._id},
            {
                $set: {"historico_id": insertHistorico.insertedId}
            }
        );

        return result;
    }

    async getHistorico() {
        const result = await Mongo.db
        .collection('historico')
        .aggregate([
            { $lookup :{
                from: 'desafios',
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
            throw new Error("Não há registros.")
        }

        return result;
    }

    async getDesafioDiario() {

        const result = await Mongo.db
        .collection("historico")
        .aggregate([
            { $match: {data: DateTime.local().setZone('America/Sao_paulo').setLocale('pt-br').toLocaleString()}},
            { $lookup: {
                from: 'desafios',
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
            throw new Error("Desafio diário  não foi escolhido até o momento.")
        }

        return result;
    }


}