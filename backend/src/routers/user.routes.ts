import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import UserModel from '../models/user';
import path from 'path';
import fs from 'fs';

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

UserRouter.post('/:username/upload', (req: Request, res: Response) => {
    let imageBlob: any;

    if (!req.body.blob) {
        let imagePath = `uploads\\default.jpg`;
        const fullPath = path.join(__dirname, '../../', imagePath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            imageBlob = `data:image/jpeg;base64,` + data.toString('base64');
        })
    }
    else {
        imageBlob = req.body.blob;
    }
    UserModel.findOne({'username': req.params.username}, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            user['profilePicture'] = imageBlob;
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({'message': 'ok'});
                }
            })
        }
    })

});

export default UserRouter;