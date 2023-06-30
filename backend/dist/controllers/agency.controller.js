"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
const user_1 = __importDefault(require("../models/user"));
const worker_1 = __importDefault(require("../models/worker"));
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
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map