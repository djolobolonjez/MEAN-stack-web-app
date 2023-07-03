import express from 'express';
import { ClientController } from '../controllers/client.controller';

const ClientRouter = express.Router();

ClientRouter.route('/editUser').post(
    (req, res) => new ClientController().editUser(req, res)
);

ClientRouter.route('/getAllObjects').get(
    (req, res) => new ClientController().getAllObjects(req, res)
);

ClientRouter.route('/addObject').post(
    (req, res) => new ClientController().addObject(req, res)
);

ClientRouter.route('/requestJob').post(
    (req, res) => new ClientController().requestJob(req, res)
);

ClientRouter.route('/getAllJobs').get(
    (req, res) => new ClientController().getAllJobs(req, res)
);

ClientRouter.route('/getObjectById').get(
    (req, res) => new ClientController().getObjectById(req, res)
);

export default ClientRouter;