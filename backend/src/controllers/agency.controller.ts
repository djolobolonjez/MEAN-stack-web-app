import express from 'express';
import UserModel from '../models/user';

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
}