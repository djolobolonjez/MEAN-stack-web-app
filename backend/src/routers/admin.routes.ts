import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const AdminRouter = express.Router();

AdminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);


export default AdminRouter;