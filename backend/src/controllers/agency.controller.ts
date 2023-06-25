import express from 'express';
import UserModel from '../models/user';
import { SearchType } from '../types/search.type';

export class AgencyController {
    getAllAgencies = (req: express.Request, res: express.Response) => {
        let result = UserModel.find({'type': "agency"}, (err, agencies) => {
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
            UserModel.find({'address': {$regex: address}}, (err, users) => {
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
            UserModel.find({'name': {$regex: name}}, (err, users) => {
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
            UserModel.find({'name': {$regex: name}, 'address': {$regex: address}}, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        }        
    }
}