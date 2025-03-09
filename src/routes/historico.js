import express from 'express';

import DesafiosController from '../controllers/desafios.js';

const historicoRouter = express.Router();

const desafiosController = new DesafiosController();

historicoRouter.get('/', async (req, res) => {
    const {success, statusCode, body } = await desafiosController.getDesafio();

    res.status(statusCode).send({success, statusCode, body});
})

historicoRouter.post('/:id', async (req, res) => {
    const {success, statusCode, body } = await desafiosController.setDesafio();

    res.status(statusCode).send({success, statusCode, body});
})

export default historicoRouter;
