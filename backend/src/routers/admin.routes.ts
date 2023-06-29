import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const AdminRouter = express.Router();

AdminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);

AdminRouter.route('/getRegistrationRequests').get(
    (req, res) => new AdminController().getRegistrationRequests(req, res)
);

AdminRouter.route('/allowRegistration').get(
    (req, res) => new AdminController().allowRegistration(req, res)
);

AdminRouter.route('/denyRegistration').get(
    (req, res) => new AdminController().denyRegistration(req, res)
);

AdminRouter.route('/acceptVacancyRequest').get(
    (req, res) => new AdminController().acceptVacancyRequest(req, res)
);

AdminRouter.route('/deleteVacancyRequest').get(
    (req, res) => new AdminController().deleteVacancyRequest(req, res)
);

AdminRouter.route('/getAllClients').get(
    (req, res) => new AdminController().getAllClients(req, res)
);

export default AdminRouter;