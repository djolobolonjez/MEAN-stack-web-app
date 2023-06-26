"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const user_1 = __importDefault(require("../models/user"));
class ClientController {
    constructor() {
        this.getLoggedUser = (req, res) => {
            let param = req.query.param;
            user_1.default.findOne({ 'username': param }, (err, user) => {
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
            user_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname,
                    'lastname': lastname,
                    'email': email,
                    'phone': phone } }, (err, resp) => {
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