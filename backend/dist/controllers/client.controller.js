"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const user_1 = __importDefault(require("../models/user"));
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
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map