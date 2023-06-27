"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
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
                console.log(user.email);
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
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map