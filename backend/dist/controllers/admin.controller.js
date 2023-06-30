"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
const agency_1 = __importDefault(require("../models/agency"));
class AdminController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': 'admin' }, (err, user) => {
                if (err) {
                    console.log(err); // prijaviti gresku o pogresno unetim podacima
                }
                else {
                    res.json(user);
                }
            });
        };
        this.getRegistrationRequests = (req, res) => {
            user_1.default.findOne({ 'username': 'admin' }, (err, admin) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(admin);
                }
            });
        };
        this.allowRegistration = (req, res) => {
            let username = req.query.param;
            user_1.default.updateOne({ 'username': username }, { $set: { 'valid': true } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
            });
            agency_1.default.updateOne({ 'username': username }, { $set: { 'valid': true } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
            });
            user_1.default.updateOne({ 'username': 'admin' }, { $pull: { 'requests': username } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.denyRegistration = (req, res) => {
            let username = req.query.param;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (user != null) {
                    user_1.default.updateOne({ 'username': 'admin' }, {
                        $pull: { 'requests': username },
                        $push: { 'invalid': { $each: [username, user.email] } }
                    }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    });
                }
                else {
                    agency_1.default.findOne({ 'username': username }, (err, user) => {
                        user_1.default.updateOne({ 'username': 'admin' }, {
                            $pull: { 'requests': username },
                            $push: { 'invalid': { $each: [username, user.email] } }
                        }, (err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            agency_1.default.deleteOne({ 'username': username }, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json({ 'message': 'ok' });
                                }
                            });
                        });
                    });
                }
            });
        };
        this.acceptVacancyRequest = (req, res) => {
            let name = req.query.param;
            user_1.default.aggregate([
                { $match: { 'username': 'admin' } },
                { $unwind: '$vacancyRequests' },
                { $match: { 'vacancyRequests.name': name } },
                { $replaceRoot: { newRoot: '$vacancyRequests' } }
            ], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    agency_1.default.updateOne({ 'agencyName': name }, { $set: { 'openVacancies': result[0].number } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            user_1.default.updateOne({ 'username': 'admin' }, { $pull: { 'vacancyRequests': { 'name': name } } }, (err, resp) => {
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
        this.deleteVacancyRequest = (req, res) => {
            let name = req.query.param;
            agency_1.default.updateOne({ 'agencyName': name }, { $set: { 'openVacancies': 0 } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user_1.default.updateOne({ 'username': 'admin' }, { $pull: { 'vacancyRequests': { 'name': name } } }, (err, resp) => {
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
        this.getAllClients = (req, res) => {
            user_1.default.find({ 'type': 'client' }, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        };
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(agencies);
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map