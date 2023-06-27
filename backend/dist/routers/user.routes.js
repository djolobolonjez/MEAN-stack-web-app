"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_controller_1 = require("../controllers/user.controller");
const user_1 = __importDefault(require("../models/user"));
const UserRouter = express_1.default.Router();
let uploadImage = () => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads');
        },
        filename: (req, file, callback) => {
            callback(null, req.params.username + '_' + file.originalname);
        }
    });
    const imageFilter = (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return callback(new Error('You can upload only images!'), false);
        }
        callback(null, true);
    };
    return (0, multer_1.default)({ imageFilter, storage });
};
UserRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
UserRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
UserRouter.route('/getId').get((req, res) => new user_controller_1.UserController().getId(req, res));
UserRouter.post('/:username/upload', uploadImage().single('profilePicture'), (req, res) => {
    const file = req.file;
    user_1.default.findOne({ 'username': req.params.username }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            user['profilePicture'] = file.path;
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