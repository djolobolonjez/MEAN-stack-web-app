"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const user_1 = __importDefault(require("../models/user"));
const object_1 = __importDefault(require("../models/object"));
const job_1 = __importDefault(require("../models/job"));
const agency_1 = __importDefault(require("../models/agency"));
class ClientController {
    constructor() {
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
            user.valid = false;
            user_1.default.updateOne({ 'username': 'admin' }, { $push: { 'requests': user.username } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err); // prijaviti nekako drugacije gresku
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        };
        this.editUser = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let email = req.body.email;
            let phone = req.body.phone;
            let image = req.body.image;
            user_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname,
                    'lastname': lastname,
                    'email': email,
                    'phone': phone,
                    'profilePicture': image } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getAllObjects = (req, res) => {
            object_1.default.find({ 'owner': req.query.param }, (err, objects) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(objects);
                }
            });
        };
        this.getObjectId = (req, res) => {
            object_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, obj) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(obj);
                }
            });
        };
        this.addObject = (req, res) => {
            let obj = new object_1.default(req.body);
            obj.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.requestJob = (req, res) => {
            let job = new job_1.default(req.body);
            job.pay = false;
            job.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getAllJobs = (req, res) => {
            job_1.default.find({ 'clientID': req.query.param }, (err, jobs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(jobs);
                }
            });
        };
        this.getObjectById = (req, res) => {
            object_1.default.findOne({ 'id': req.query.param }, (err, obj) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(obj);
                }
            });
        };
        this.acceptOffer = (req, res) => {
            job_1.default.updateOne({ 'id': req.query.param }, { $set: { 'status': 'active' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json();
                }
            });
        };
        this.declineOffer = (req, res) => {
            job_1.default.deleteOne({ 'id': req.query.param }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json();
                }
            });
        };
        this.payForJob = (req, res) => {
            job_1.default.updateOne({ 'id': req.query.param }, { $set: { 'status': 'finished' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json();
                }
            });
        };
        this.addComment = (req, res) => {
            job_1.default.updateOne({ 'id': req.body.id }, { $set: { 'comment': req.body.comment } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    agency_1.default.findOne({ 'id': req.body.agencyID }, (err, agency) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const commentIndex = agency.comments.findIndex(comment => comment.jobId === req.body.id);
                            if (commentIndex != -1) {
                                agency.comments[commentIndex].comment = req.body.comment;
                            }
                            else {
                                const newComment = {
                                    jobId: req.body.id,
                                    comment: req.body.comment
                                };
                                agency.comments.push(newComment);
                            }
                            agency.markModified('comments');
                            agency.save((err, resp) => {
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
        this.addRating = (req, res) => {
            job_1.default.updateOne({ 'id': req.body.id }, { $set: { 'rating': req.body.rating } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    agency_1.default.findOne({ 'id': req.body.agencyID }, (err, agency) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const commentIndex = agency.comments.findIndex(comment => comment.jobId === req.body.id);
                            if (commentIndex != -1) {
                                agency.comments[commentIndex].rating = req.body.rating;
                            }
                            else {
                                const newComment = {
                                    jobId: req.body.id,
                                    rating: req.body.rating
                                };
                                agency.comments.push(newComment);
                            }
                            agency.markModified('comments');
                            agency.save((err, resp) => {
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
        this.deleteComment = (req, res) => {
            let comm = {
                jobId: req.body.id,
                comment: req.body.comment,
                rating: req.body.rating
            };
            agency_1.default.updateOne({ 'id': req.body.agencyID }, { $pull: { 'comments': comm } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    job_1.default.updateOne({ 'id': req.body.id }, { $unset: { 'comment': '', 'rating': '' } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json();
                        }
                    });
                }
            });
        };
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map