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

AgencyRouter.route('/getWorkers').get(
    (req, res) => new AgencyController().getWorkers(req, res)
);

AgencyRouter.route('/sendVacanciesRequest').post(
    (req, res) => new AgencyController().sendVacanciesRequest(req, res)
);

AgencyRouter.route('/submitWorker').post(
    (req, res) => new AgencyController().submitWorker(req, res)
);

AgencyRouter.route('/deleteWorker').get(
    (req, res) => new AgencyController().deleteWorker(req, res)
);

AgencyRouter.route('/editWorker').post(
    (req, res) => new AgencyController().editWorker(req, res)
);

AgencyRouter.route('/getRequestedJobs').get(
    (req, res) => new AgencyController().getRequestedJobs(req, res)
);

AgencyRouter.route('/getActiveJobs').get(
    (req, res) => new AgencyController().getActiveJobs(req, res)
);

AgencyRouter.route('/getJobId').get(
    (req, res) => new AgencyController().getJobId(req, res)
);

AgencyRouter.route('/getWorkerId').get(
    (req, res) => new AgencyController().getWorkerId(req, res)
);

AgencyRouter.route('/declineJob').get(
    (req, res) => new AgencyController().declineJob(req, res)
);

AgencyRouter.route('/sendOffer').post(
    (req, res) => new AgencyController().sendOffer(req, res)
);

AgencyRouter.route('/getInactiveWorkers').get(
    (req, res) => new AgencyController().getInactiveWorkers(req, res)
);

AgencyRouter.route('/assignWorker').post(
    (req, res) => new AgencyController().assignWorker(req, res)
);

AgencyRouter.route('/updateJob').post(
    (req, res) => new AgencyController().updateJob(req, res)
);

AgencyRouter.route('/finishJob').get(
    (req, res) => new AgencyController().finishJob(req, res)
);

AgencyRouter.route('/getJobById').get(
    (req, res) => new AgencyController().getJobById(req, res)
);


export default AgencyRouter;