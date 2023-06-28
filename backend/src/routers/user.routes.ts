import express, { Request, Response } from 'express';
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

UserRouter.route('/images/:username').get(
    (req, res) => new UserController().getImage(req, res)
);

UserRouter.route('/:username/upload').post(
    (req, res) => new UserController().upload(req, res)
);

UserRouter.route('/getLoggedUser').get(
    (req, res) => new UserController().getLoggedUser(req, res)
);

export default UserRouter;