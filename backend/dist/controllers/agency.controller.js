"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
const user_1 = __importDefault(require("../models/user"));
const worker_1 = __importDefault(require("../models/worker"));
const job_1 = __importDefault(require("../models/job"));
const search_type_1 = require("../types/search.type");
class AgencyController {
    constructor() {
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({ 'type': "agency" }, (err, agencies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(agencies);
                }
            });
        };
        this.search = (req, res, searchType) => {
            if (searchType == search_type_1.SearchType.AddressSearch) {
                let address = req.query.param;
                agency_1.default.find({ 'address': { $regex: address, $options: "i" } }, (err, users) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
            else if (searchType == search_type_1.SearchType.NameSearch) {
                let name = req.query.param;
                agency_1.default.find({ 'agencyName': { $regex: name, $options: "i" } }, (err, users) => {
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
                agency_1.default.find({ 'agencyName': { $regex: name, $options: "i" },
                    'address': { $regex: address, $options: "i" } }, (err, users) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
        };
        this.editUser = (req, res) => {
            let username = req.body.username;
            let agencyName = req.body.agencyName;
            let address = req.body.address;
            let email = req.body.email;
            let phone = req.body.phone;
            let description = req.body.description;
            let image = req.body.image;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'agencyName': agencyName,
                    'address': address,
                    'email': email,
                    'phone': phone,
                    'description': description,
                    'profilePicture': image } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.sendVacanciesRequest = (req, res) => {
            let id = req.body.id;
            let number = req.body.numberOfVacancies;
            agency_1.default.findOne({ 'id': id }, (err, agency) => {
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
                            user_1.default.updateOne({ 'username': 'admin' }, { $push: { 'vacancyRequests': { 'name': agency.agencyName, 'number': number }, }
                            }, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json({ 'message': 'ok' });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.submitWorker = (req, res) => {
            let worker = new worker_1.default(req.body);
            worker.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    agency_1.default.updateOne({ 'id': req.body.agency }, { $inc: { 'openVacancies': -1 } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.getWorkers = (req, res) => {
            let id = parseInt(req.query.param);
            worker_1.default.find({ 'agency': id }, (err, workers) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(workers);
                }
            });
        };
        this.deleteWorker = (req, res) => {
            let email = req.query.param;
            worker_1.default.findOne({ 'email': email }, (err, worker) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let agencyId = worker.agency;
                    agency_1.default.updateOne({ 'id': agencyId }, {
                        $inc: { 'openVacancies': 1 }
                    }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            worker_1.default.deleteOne({ 'email': email }, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json();
                                }
                            });
                        }
                    });
                }
            });
        };
        this.editWorker = (req, res) => {
            let editMail = req.body.editMail;
            let email = req.body.email;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let phone = req.body.phone;
            let specialization = req.body.specialization;
            worker_1.default.updateOne({ 'email': editMail }, { $set: {
                    'firstname': firstname,
                    'lastname': lastname,
                    'email': email,
                    'phone': phone,
                    'specialization': specialization
                } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getRequestedJobs = (req, res) => {
            job_1.default.find({ 'status': 'requested', 'agencyID': req.query.param }, (err, jobs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(jobs);
                }
            });
        };
        this.getActiveJobs = (req, res) => {
            job_1.default.find({ 'status': 'active', 'agencyID': req.query.param }, (err, jobs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(jobs);
                }
            });
        };
        this.getJobId = (req, res) => {
            job_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, job) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(job);
                }
            });
        };
        this.getWorkerId = (req, res) => {
            worker_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, worker) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(worker);
                }
            });
        };
        this.declineJob = (req, res) => {
            job_1.default.updateOne({ 'id': req.query.param }, { $set: { 'status': 'declined' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.sendOffer = (req, res) => {
            job_1.default.updateOne({ 'id': req.body.id }, { $set: { 'price': req.body.price, 'status': 'accepted' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getInactiveWorkers = (req, res) => {
            worker_1.default.find({ 'agency': req.query.param, 'status': 'inactive' }, (err, workers) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(workers);
                }
            });
        };
        this.assignWorker = (req, res) => {
            let job = req.body.job;
            let id = req.body.id;
            worker_1.default.updateOne({ 'id': id }, { $set: { 'status': 'active' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    job_1.default.updateOne({ 'id': job.id }, { $set: { 'roomOneStatus': job.roomOneStatus,
                            'roomTwoStatus': job.roomTwoStatus,
                            'roomThreeStatus': job.roomThreeStatus,
                            'roomOneWorkers': job.roomOneWorkers,
                            'roomTwoWorkers': job.roomTwoWorkers,
                            'roomThreeWorkers': job.roomThreeWorkers, } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.updateJob = (req, res) => {
            job_1.default.updateOne({ 'id': req.body.id }, { $set: { 'roomOneStatus': req.body.roomOneStatus,
                    'roomTwoStatus': req.body.roomTwoStatus,
                    'roomThreeStatus': req.body.roomThreeStatus } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.finishJob = (req, res) => {
            job_1.default.updateOne({ 'id': req.query.param }, { $set: { 'pay': true } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json();
                }
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map