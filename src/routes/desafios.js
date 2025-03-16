import express from 'express';

import DesafiosController from '../controllers/desafios.js';

const desafiosRouter = express.Router();

const desafiosController = new DesafiosController();

desafiosRouter.get('/', async (req, res) => {
    const {success, statusCode, body } = await desafiosController.getDesafio();

    res.status(statusCode).send({success, statusCode, body});
})

// desafiosRouter.get('/:id', async (req, res) => {
//     const { success, statusCode, body } = await desafiosController.getDesafioDoHistorico(req.params.id);

//     res.status(statusCode).send({success, statusCode, body});
// })

desafiosRouter.get('/historico', async (req, res) => {
    const {success, statusCode, body } = await desafiosController.getHistorico();

    res.status(statusCode).send({success, statusCode, body});
})

desafiosRouter.post('/set-desafio', async (req, res) => {
    const {success, statusCode, body } = await desafiosController.setDesafio();

    res.status(statusCode).send({success, statusCode, body});
})

export default desafiosRouter;
