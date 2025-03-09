import express from 'express';
import { Mongo } from "./src/database/mongo.js";
import { config } from "dotenv";
import desafiosRouter from './src/routes/desafios.js';

config();

async function main() {
    const port = 3000;

    const app = express();
    const mongoConnection = await Mongo.connect({mongoConnectionString: process.env.MONGO_CONNECTION_STRING, mongoDbName: process.env.MONGO_DATABASE_NAME});
    console.log(mongoConnection);

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send({
            success: true,
            statusCode: 200

        });
    });

    app.use('/daily', desafiosRouter)

    app.listen(port, function(err) {
        if(err) console.log("Error in server setup");

        console.log(`Servidor conectado à porta ${port}`);
    })
}

main();