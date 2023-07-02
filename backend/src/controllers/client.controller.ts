import express from 'express';
import UserModel from '../models/user';
import ObjectModel from '../models/object';

export class ClientController {
        
    register = (req: express.Request, res: express.Response) => {
        let user = new UserModel(req.body);
        user.valid = false;

        UserModel.updateOne({'username': 'admin'}, {$push: {'requests': user.username}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        user.save((err, resp) => {
            if (err) {
                console.log(err); // prijaviti nekako drugacije gresku
            }
            else {
                res.json({'message': 'ok'});
            }
        });
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

    editUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone = req.body.phone;
        let image = req.body.image;

        UserModel.updateOne({'username': username},
        {$set: {'firstname': firstname,
        'lastname': lastname,
        'email': email, 
        'phone': phone,
        'profilePicture': image}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }

    getAllObjects = (req: express.Request, res: express.Response) => {
        ObjectModel.find({'owner': req.query.param}, (err, objects) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(objects);
            }
        })
    }

    addObject = (req: express.Request, res: express.Response) => {
        console.log("tuu");
        let obj = new ObjectModel(req.body);
        console.log(obj);

        obj.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        })
    }
}