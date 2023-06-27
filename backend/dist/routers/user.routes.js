"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const UserRouter = express_1.default.Router();
UserRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
UserRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
UserRouter.route('/getId').get((req, res) => new user_controller_1.UserController().getId(req, res));
UserRouter.route('/images/:username').get((req, res) => new user_controller_1.UserController().getImage(req, res));
UserRouter.post('/:username/upload', (req, res) => {
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
        });
    }
    else {
        imageBlob = req.body.blob;
    }
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
});
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map