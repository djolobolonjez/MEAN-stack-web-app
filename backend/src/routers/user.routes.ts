import express from 'express';
import { UserController } from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);


export default UserRouter;