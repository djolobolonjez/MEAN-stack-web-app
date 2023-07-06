import express from 'express';
import UserModel from '../models/user';
import ObjectModel from '../models/object';
import JobModel from '../models/job';

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
        let obj = new ObjectModel(req.body);

        obj.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        })
    }

    requestJob = (req: express.Request, res: express.Response) => {
        let job = new JobModel(req.body);
        job.pay = false;

        job.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }

    getAllJobs = (req: express.Request, res: express.Response) => {
        JobModel.find({'clientID': req.query.param}, (err, jobs) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(jobs);
            }
        })
    }
    
    getObjectById = (req: express.Request, res: express.Response) => {
        ObjectModel.findOne({'id': req.query.param}, (err, obj) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(obj);
            }
        })
    }

    acceptOffer = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.query.param}, { $set: {'status': 'active' }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json();
            }
        })
    }

    declineOffer = (req: express.Request, res: express.Response) => {
        JobModel.deleteOne({'id': req.query.param}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json();
            }
        })
    }

    payForJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.query.param }, { $set: {'status': 'finished' }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json();
            }
        })
    }
}