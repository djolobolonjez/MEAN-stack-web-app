import express from 'express';
import UserModel from '../models/user';

export class UserController {

    register = (req: express.Request, res: express.Response) => {
        let user = new UserModel(req.body);
        user.save((err, resp) => {
            if (err) {
                console.log(err); // prijaviti nekako drugacije gresku
            }
            else {
                res.json({'message': 'ok'});
            }
        })
    }

}