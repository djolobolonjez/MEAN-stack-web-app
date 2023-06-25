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

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user) => {
            if (err) {
                console.log(err); // prijaviti gresku o pogresno unetim podacima
            }
            else {
                res.json(user);
            }
        })
    }

    getId = (req: express.Request, res: express.Response) => {
        UserModel.findOne({}).sort({"id": -1}).limit(1).exec((err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }
 
}