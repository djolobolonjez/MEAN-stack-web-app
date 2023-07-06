"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const agency_1 = __importDefault(require("../models/agency"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UserController {
    constructor() {
        this.register = (req, res) => {
            if (req.body.type == "client") {
                this.clientRegister(req, res);
            }
            else {
                this.agencyRegister(req, res);
            }
        };
        this.clientRegister = (req, res) => {
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
        this.agencyRegister = (req, res) => {
            let agency = new agency_1.default(req.body);
            agency.valid = false;
            user_1.default.updateOne({ 'username': 'admin' }, { $push: { 'requests': agency.username } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
            });
            agency.save((err, resp) => {
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
                    if (user != null) {
                        res.json(user);
                    }
                    else {
                        agency_1.default.findOne({ 'username': username, 'password': password }, (err, agency) => {
                            if (err) {
                                console.log(err); // prijaviti gresku o pogresno unetim podacima
                            }
                            else {
                                res.json(agency);
                            }
                        });
                    }
                }
            });
        };
        this.getId = (req, res) => {
            let type = req.query.param;
            if (type == "client") {
                user_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
            else {
                agency_1.default.findOne({}).sort({ "id": -1 }).limit(1).exec((err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
        };
        this.getLoggedUser = (req, res) => {
            let param = req.query.param;
            user_1.default.findOne({ 'username': param }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user != null) {
                        res.json(user);
                    }
                    else {
                        agency_1.default.findOne({ 'username': param }, (err, agency) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json(agency);
                            }
                        });
                    }
                }
            });
        };
        this.getImage = (req, res) => {
            user_1.default.findOne({ 'username': req.params.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const imageBlob = user['profilePicture'];
                    res.status(200).json({ 'image': imageBlob });
                }
            });
        };
        this.upload = (req, res) => {
            let imageBlob;
            let type = req.body.userType;
            if (!req.body.blob) {
                let imagePath = `uploads\\default.jpg`;
                const fullPath = path_1.default.join(__dirname, '../../', imagePath);
                fs_1.default.readFile(fullPath, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Internal server error');
                    }
                    imageBlob = `data:image/jpeg;base64,` + data.toString('base64');
                    if (type == "client") {
                        this.updateClientPicture(imageBlob, req, res);
                    }
                    else {
                        this.updateAgencyPicture(imageBlob, req, res);
                    }
                });
            }
            else {
                imageBlob = req.body.blob;
                if (type == "client") {
                    this.updateClientPicture(imageBlob, req, res);
                }
                else {
                    this.updateAgencyPicture(imageBlob, req, res);
                }
            }
        };
        this.getUserById = (req, res) => {
            let id = req.body.id;
            let type = req.body.type;
            if (type == "client") {
                user_1.default.findOne({ 'id': id }, (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
            else {
                agency_1.default.findOne({ 'id': id }, (err, agency) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(agency);
                    }
                });
            }
        };
        this.getUserByUsername = (req, res) => {
            let username = req.body.username;
            let type = req.body.type;
            if (type == "client") {
                user_1.default.findOne({ 'username': username, 'type': 'client' }, (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
            else {
                agency_1.default.findOne({ 'username': username, 'type': 'agency' }, (err, agency) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(agency);
                    }
                });
            }
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = req.body.type;
            if (type == "client" || type == "admin") {
                user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            }
            else {
                agency_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            }
        };
    }
    updateClientPicture(imageBlob, req, res) {
        user_1.default.findOne({ 'username': req.params.username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                user['profilePicture'] = imageBlob;
                user.save((err, resp) => {
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
    updateAgencyPicture(imageBlob, req, res) {
        agency_1.default.findOne({ 'username': req.params.username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                user['profilePicture'] = imageBlob;
                user.save((err, resp) => {
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
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map