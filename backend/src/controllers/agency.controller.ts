import express from 'express';
import AgencyModel from '../models/agency';
import UserModel from '../models/user'
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
                agency['openVacancies'] = -1;
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
                )
            }
            
        });
    }

    submitWorker = (req: express.Request, res: express.Response) => {
        let agency = req.body.agency;

        AgencyModel.updateOne({'id': agency}, 
            { $push: {'workers': req.body}, 
              $inc: {'openVacancies': -1} 
            }, 
            (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({'message': 'ok'});
                }
        })
    }

    getWorkers = (req: express.Request, res: express.Response) => {
        let id = parseInt(req.query.param as string);

        AgencyModel.findOne({'id': id}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(user.workers);
            }
        })
    }
}