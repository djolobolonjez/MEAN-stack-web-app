import express from 'express';
import UserModel from '../models/user';

export class ClientController {
    getLoggedUser = (req: express.Request, res: express.Response) => {
        let param = req.query.param;

        UserModel.findOne({'username': param}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }

    editUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone = req.body.phone;

        UserModel.updateOne({'username': username},
        {$set: {'firstname': firstname,
        'lastname': lastname,
        'email': email, 
        'phone': phone}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }
}