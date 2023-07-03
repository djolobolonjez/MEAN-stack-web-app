"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const user_1 = __importDefault(require("../models/user"));
const object_1 = __importDefault(require("../models/object"));
const job_1 = __importDefault(require("../models/job"));
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
                    console.log(err); // prijaviti gresku o pogresno unetim podacima
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
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map