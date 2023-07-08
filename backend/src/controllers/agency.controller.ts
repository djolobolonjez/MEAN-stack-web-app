import express from 'express';
import AgencyModel from '../models/agency';
import UserModel from '../models/user';
import WorkerModel from '../models/worker';
import JobModel from '../models/job';
import { SearchType } from '../types/search.type';

export class AgencyController {
    getAllAgencies = (req: express.Request, res: express.Response) => {
        AgencyModel.find({'type': "agency"}, (err, agencies) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(agencies);
            }
        })
    }

    search = (req: express.Request, res: express.Response, searchType: SearchType) => {
        if (searchType == SearchType.AddressSearch) {
            let address = req.query.param;
            AgencyModel.find({'address': {$regex: address, $options: "i"}}, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        }
        else if (searchType == SearchType.NameSearch) {
            let name = req.query.param;
            AgencyModel.find({'agencyName': {$regex: name, $options: "i"}}, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        }
        else {
            let name = req.query.name;
            let address = req.query.address;
            AgencyModel.find({'agencyName': {$regex: name, $options: "i"},
             'address': {$regex: address, $options: "i"}}, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        }        
    }

    editUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let agencyName = req.body.agencyName;
        let address = req.body.address;
        let email = req.body.email;
        let phone = req.body.phone;
        let description = req.body.description;
        let image = req.body.image;

        AgencyModel.updateOne({'username': username},
        {$set: {'agencyName': agencyName,
        'address': address,
        'email': email, 
        'phone': phone,
        'description': description,
        'profilePicture': image}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }

    sendVacanciesRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let number = req.body.numberOfVacancies;
        
        AgencyModel.findOne({'id': id}, (err, agency) => {
            if (err) {
                console.log(err);
            }
            else {
                agency.openVacancies = -1;
                agency.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        UserModel.updateOne({'username': 'admin'},
                            {$push: 
                                {'vacancyRequests': { 'name': agency.agencyName, 'number': number },}
                            },
                            (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json({'message': 'ok'});
                                }
                            }
                        );
                    }
                })
                
            }
            
        });
    }

    submitWorker = (req: express.Request, res: express.Response) => {
        let worker = new WorkerModel(req.body);

        worker.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                AgencyModel.updateOne({'id': req.body.agency}, 
                {$inc: {'openVacancies': -1}}, 
                (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({'message': 'ok'});
                    }
                });
            }
        });
        
    }

    getWorkers = (req: express.Request, res: express.Response) => {
        let id = parseInt(req.query.param as string);

        WorkerModel.find({'agency': id}, (err, workers) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(workers);
            }
        })
    }

    deleteWorker = (req: express.Request, res: express.Response) => {
        let email = req.query.param;
        WorkerModel.findOne({'email': email}, (err, worker) => {
            if (err) {
                console.log(err);
            }
            else {
                let agencyId = worker.agency;
                AgencyModel.updateOne({'id': agencyId},
                    {
                        $inc: {'openVacancies': 1}
                    },
                    (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            WorkerModel.deleteOne({'email': email}, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json();
                                }
                            })
                        }
                    }
                )
            }
        })
        
    }

    editWorker = (req: express.Request, res: express.Response) => {
        let editMail = req.body.editMail;
        let email = req.body.email;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let specialization = req.body.specialization;

        WorkerModel.updateOne({'email': editMail},
        {   $set: {
            'firstname': firstname,
            'lastname': lastname,
            'email': email, 
            'phone': phone,
            'specialization': specialization}},
            (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        }); 
    }

    getRequestedJobs = (req: express.Request, res: express.Response) => {
        JobModel.find({'status': 'requested', 'agencyID': req.query.param}, (err, jobs) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(jobs);
            }
        })
    }

    getActiveJobs = (req: express.Request, res: express.Response) => {
        JobModel.find({'status': 'active', 'agencyID': req.query.param}, (err, jobs) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(jobs);
            }
        })
    }
s
    getJobId = (req: express.Request, res: express.Response) => {
        JobModel.findOne({}).sort({"id": -1}).limit(1).exec((err, job) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(job);
            }
        })
    }

    getWorkerId = (req: express.Request, res: express.Response) => {
        WorkerModel.findOne({}).sort({"id": -1}).limit(1).exec((err, worker) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(worker);
            }
        })
    }

    declineJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.query.param}, { $set: {'status': 'declined' }}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({'message': 'ok'});
            }
        })
    }

    sendOffer = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.body.id}, { $set: {'price': req.body.price, 'status': 'accepted'}},
                            (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json({'message': 'ok'});
                                }
                            })
    }

    getInactiveWorkers = (req: express.Request, res: express.Response) => {
        WorkerModel.find({'agency': req.query.param, 'status': 'inactive'}, (err, workers) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(workers);
            }
        })
    }

    assignWorker = (req: express.Request, res: express.Response) => {
        let job = req.body.job;
        let id = req.body.id;

        WorkerModel.updateOne({'id': id}, { $set: {'status': 'active'}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                JobModel.updateOne(
                    {'id': job.id},
                    { $set: {'roomOneStatus': job.roomOneStatus, 
                             'roomTwoStatus': job.roomTwoStatus,
                             'roomThreeStatus': job.roomThreeStatus,
                             'roomOneWorkers': job.roomOneWorkers,
                             'roomTwoWorkers': job.roomTwoWorkers,
                             'roomThreeWorkers': job.roomThreeWorkers,}},
                    (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({'message': 'ok'});
                        }
                    }
                )
            }
        })
    }

    updateJob = (req: express.Request, res: express.Response) => {
        let job = req.body.job;
        let target = req.body.target;

        JobModel.updateOne(
            {'id': job.id}, 
            { $set: {'roomOneStatus': job.roomOneStatus,
                     'roomTwoStatus': job.roomTwoStatus,
                     'roomThreeStatus': job.roomThreeStatus,
                     'roomOneWorkers': job.roomOneWorkers,
                     'roomTwoWorkers': job.roomTwoWorkers,
                     'roomThreeWorkers': job.roomThreeWorkers,}},
            (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    WorkerModel.updateMany({'id': {$in: target}}, {$set: {'status': 'inactive'}}, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({'message': 'ok'});
                        }
                    })
                    
                }
            }  
        )
    }

    finishJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({'id': req.query.param }, { $set: {'pay': true}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json();
            }
        })
    }

    getJobById = (req: express.Request, res: express.Response) => {
        JobModel.findOne({'id': req.query.param }, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(resp);
            }
        })
    }
}