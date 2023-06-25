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
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map