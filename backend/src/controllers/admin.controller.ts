import express from 'express';
import UserModel from '../models/user';
import AgencyModel from '../models/agency';

export class AdminController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password, 'type': 'admin'}, (err, user) => {
            if (err) {
                console.log(err); // prijaviti gresku o pogresno unetim podacima
            }
            else {
                res.json(user);
            }
        })
    }

    getRegistrationRequests = (req: express.Request, res: express.Response) => {
        UserModel.findOne({'username': 'admin'}, (err, admin) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(admin);
            }
        })
    }

    allowRegistration = (req: express.Request, res: express.Response) => {
        let username = req.query.param;

        UserModel.updateOne({'username': username}, {$set: {'valid': true}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        AgencyModel.updateOne({'username': username}, {$set: {'valid': true}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        UserModel.updateOne({'username': 'admin'}, {$pull: {'requests': username}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }

    denyRegistration = (req: express.Request, res: express.Response) => {
        let username = req.query.param;

        UserModel.findOne({'username': username}, (err, user) => {
            if (user != null) {
                UserModel.updateOne({'username': 'admin'},
                {
                    $pull: {'requests': username}, 
                    $push: {'invalid': {$each: [username, user.email]}}
                },
                (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    UserModel.deleteOne({'username': username}, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({'message': 'ok'});
                        }
                    });
                });
            }
            else {
                AgencyModel.findOne({'username': username}, (err, user) => {
                    UserModel.updateOne({'username': 'admin'},
                {
                    $pull: {'requests': username}, 
                    $push: {'invalid': {$each: [username, user.email]}}
                },
                (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    AgencyModel.deleteOne({'username': username}, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({'message': 'ok'});
                        }
                    });
                });
                })
            }
            
        });
    }
}