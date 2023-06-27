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

export default AdminRouter;