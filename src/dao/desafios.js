import { Mongo } from "../database/mongo";


export default class DesafiosDAO {

    async setDesafioDiario({collectionName, currentDate}) {
        const dateSet = await Mongo.db
        .collection(collectionName)
        .updateOne(
            {},
            {$addfields: {
                "date": currentDate,
            }}
        )
        .toArray();

        return dateSet;
    }

    async getDesafioDiario({collectionName}) {

        const result = await Mongo.db
        .collection(collectionName)
        .findOne()
        .toArray()

        return result;
    }


}