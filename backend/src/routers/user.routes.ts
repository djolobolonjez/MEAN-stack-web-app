import express from 'express';
import { UserController } from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

UserRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);


UserRouter.route('/getId').get(
    (req, res) => new UserController().getId(req, res)
);


export default UserRouter;