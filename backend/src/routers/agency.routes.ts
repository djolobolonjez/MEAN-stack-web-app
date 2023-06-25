import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const AgencyRouter = express.Router();

AgencyRouter.route('/getAllAgencies').get(
    (req, res) => new AgencyController().getAllAgencies(req, res)
);

export default AgencyRouter;