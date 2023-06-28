import express from 'express';
import { AgencyController } from '../controllers/agency.controller';
import { SearchType } from '../types/search.type';

const AgencyRouter = express.Router();

AgencyRouter.route('/getAllAgencies').get(
    (req, res) => new AgencyController().getAllAgencies(req, res)
);

AgencyRouter.route('/searchByName').get(
    (req, res) => new AgencyController().search(req, res, SearchType.NameSearch)   
);

AgencyRouter.route('/searchByAddress').get(
    (req, res) => new AgencyController().search(req, res, SearchType.AddressSearch)
);

AgencyRouter.route('/advancedSearch').get(
    (req, res) => new AgencyController().search(req, res, SearchType.AdvancedSearch)
);

AgencyRouter.route('/editUser').post(
    (req, res) => new AgencyController().editUser(req, res)
);

export default AgencyRouter;