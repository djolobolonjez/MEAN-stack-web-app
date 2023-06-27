"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UserController {
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
            if (!req.body.blob) {
                let imagePath = `uploads\\default.jpg`;
                const fullPath = path_1.default.join(__dirname, '../../', imagePath);
                fs_1.default.readFile(fullPath, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Internal server error');
                    }
                    imageBlob = `data:image/jpeg;base64,` + data.toString('base64');
                    this.updateProfilePicture(imageBlob, req, res);
                });
            }
            else {
                imageBlob = req.body.blob;
                this.updateProfilePicture(imageBlob, req, res);
            }
        };
    }
    updateProfilePicture(imageBlob, req, res) {
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
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map