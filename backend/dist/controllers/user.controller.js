"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
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
        this.getId = (req, res) => {
            user_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map