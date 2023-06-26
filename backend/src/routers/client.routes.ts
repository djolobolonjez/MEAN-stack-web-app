import express from 'express';
import { ClientController } from '../controllers/client.controller';

const ClientRouter = express.Router();

ClientRouter.route('/getLoggedUser').get(
    (req, res) => new ClientController().getLoggedUser(req, res)
);

ClientRouter.route('/editUser').post(
    (req, res) => new ClientController().editUser(req, res)
);

export default ClientRouter;