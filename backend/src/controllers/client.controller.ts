import express from 'express';
import UserModel from '../models/user';
import ObjectModel from '../models/object';
import JobModel from '../models/job';
import AgencyModel from '../models/agency';

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

    addComment = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.body.id}, { $set: {'comment': req.body.comment }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                AgencyModel.findOne({'id': req.body.agencyID }, (err, agency) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        const commentIndex = agency.comments.findIndex(comment => comment.jobId === req.body.id);
                        if (commentIndex != -1) {
                            agency.comments[commentIndex].comment = req.body.comment;
                        }
                        else {
                            const newComment = {
                                jobId: req.body.id,
                                comment: req.body.comment
                            };
                            agency.comments.push(newComment);
                        }
                        agency.markModified('comments');
                        agency.save((err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json();
                            }
                        })
                    }
                })
            }
        })
    }

    addRating = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.body.id}, { $set: {'rating': req.body.rating }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                AgencyModel.findOne({'id': req.body.agencyID }, (err, agency) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        const commentIndex = agency.comments.findIndex(comment => comment.jobId === req.body.id);
                        if (commentIndex != -1) {
                            agency.comments[commentIndex].rating = req.body.rating;
                        }
                        else {
                            const newComment = {
                                jobId: req.body.id,
                                rating: req.body.rating
                            };
                            agency.comments.push(newComment);
                        }
                        agency.markModified('comments');
                        agency.save((err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json();
                            }
                        })
                    }
                })
            }
        })
    }

    deleteComment = (req: express.Request, res: express.Response) => {
        let comm = {
            jobId: req.body.id,
            comment: req.body.comment,
            rating: req.body.rating
        };

        AgencyModel.updateOne({'id': req.body.agencyID }, { $pull: {'comments': comm }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                JobModel.updateOne({'id': req.body.id}, { $unset: {'comment': '', 'rating': ''}}, (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json();
                    }
                })
            }
        })
    }
}