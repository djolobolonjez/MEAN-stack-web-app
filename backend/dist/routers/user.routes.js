"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const UserRouter = express_1.default.Router();
UserRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
UserRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
UserRouter.route('/getId').get((req, res) => new user_controller_1.UserController().getId(req, res));
UserRouter.route('/images/:username').get((req, res) => new user_controller_1.UserController().getImage(req, res));
UserRouter.route('/:username/upload').post((req, res) => new user_controller_1.UserController().upload(req, res));
UserRouter.route('/getLoggedUser').get((req, res) => new user_controller_1.UserController().getLoggedUser(req, res));
UserRouter.route('/getUserById').post((req, res) => new user_controller_1.UserController().getUserById(req, res));
UserRouter.route('/getUserByUsername').post((req, res) => new user_controller_1.UserController().getUserByUsername(req, res));
UserRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map