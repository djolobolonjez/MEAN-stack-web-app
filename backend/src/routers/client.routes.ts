import express from 'express';
import { ClientController } from '../controllers/client.controller';

const ClientRouter = express.Router();

ClientRouter.route('/editUser').post(
    (req, res) => new ClientController().editUser(req, res)
);

export default ClientRouter;