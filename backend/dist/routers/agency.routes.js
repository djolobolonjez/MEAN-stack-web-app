"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const search_type_1 = require("../types/search.type");
const AgencyRouter = express_1.default.Router();
AgencyRouter.route('/getAllAgencies').get((req, res) => new agency_controller_1.AgencyController().getAllAgencies(req, res));
AgencyRouter.route('/searchByName').get((req, res) => new agency_controller_1.AgencyController().search(req, res, search_type_1.SearchType.NameSearch));
AgencyRouter.route('/searchByAddress').get((req, res) => new agency_controller_1.AgencyController().search(req, res, search_type_1.SearchType.AddressSearch));
AgencyRouter.route('/advancedSearch').get((req, res) => new agency_controller_1.AgencyController().search(req, res, search_type_1.SearchType.AdvancedSearch));
AgencyRouter.route('/editUser').post((req, res) => new agency_controller_1.AgencyController().editUser(req, res));
AgencyRouter.route('/getWorkers').get((req, res) => new agency_controller_1.AgencyController().getWorkers(req, res));
AgencyRouter.route('/sendVacanciesRequest').post((req, res) => new agency_controller_1.AgencyController().sendVacanciesRequest(req, res));
AgencyRouter.route('/submitWorker').post((req, res) => new agency_controller_1.AgencyController().submitWorker(req, res));
AgencyRouter.route('/deleteWorker').get((req, res) => new agency_controller_1.AgencyController().deleteWorker(req, res));
AgencyRouter.route('/editWorker').post((req, res) => new agency_controller_1.AgencyController().editWorker(req, res));
AgencyRouter.route('/getRequestedJobs').get((req, res) => new agency_controller_1.AgencyController().getRequestedJobs(req, res));
AgencyRouter.route('/getActiveJobs').get((req, res) => new agency_controller_1.AgencyController().getActiveJobs(req, res));
AgencyRouter.route('/getJobId').get((req, res) => new agency_controller_1.AgencyController().getJobId(req, res));
AgencyRouter.route('/getWorkerId').get((req, res) => new agency_controller_1.AgencyController().getWorkerId(req, res));
AgencyRouter.route('/declineJob').get((req, res) => new agency_controller_1.AgencyController().declineJob(req, res));
AgencyRouter.route('/sendOffer').post((req, res) => new agency_controller_1.AgencyController().sendOffer(req, res));
AgencyRouter.route('/getInactiveWorkers').get((req, res) => new agency_controller_1.AgencyController().getInactiveWorkers(req, res));
AgencyRouter.route('/assignWorker').post((req, res) => new agency_controller_1.AgencyController().assignWorker(req, res));
AgencyRouter.route('/updateJob').post((req, res) => new agency_controller_1.AgencyController().updateJob(req, res));
AgencyRouter.route('/finishJob').get((req, res) => new agency_controller_1.AgencyController().finishJob(req, res));
AgencyRouter.route('/getJobById').get((req, res) => new agency_controller_1.AgencyController().getJobById(req, res));
exports.default = AgencyRouter;
//# sourceMappingURL=agency.routes.js.map