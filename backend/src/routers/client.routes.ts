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

ClientRouter.route('/acceptOffer').get(
    (req, res) => new ClientController().acceptOffer(req, res)
);

ClientRouter.route('/declineOffer').get(
    (req, res) => new ClientController().declineOffer(req, res)
);

ClientRouter.route('/payForJob').get(
    (req, res) => new ClientController().payForJob(req, res)
);

ClientRouter.route('/addComment').post(
    (req, res) => new ClientController().addComment(req, res)
);

ClientRouter.route('/addRating').post(
    (req, res) => new ClientController().addRating(req, res)
);

ClientRouter.route('/deleteComment').post(
    (req, res) => new ClientController().deleteComment(req, res)
);

ClientRouter.route('/getObjectId').get(
    (req, res) => new ClientController().getObjectId(req, res)
);

export default ClientRouter;