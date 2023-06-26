import express from 'express';
import multer from 'multer';
import { UserController } from '../controllers/user.controller';

const UserRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, 'Image_${file.originalname}');
    }
});

let upload = multer({
    storage: storage
});

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