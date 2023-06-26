"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controllers/client.controller");
const ClientRouter = express_1.default.Router();
ClientRouter.route('/getLoggedUser').get((req, res) => new client_controller_1.ClientController().getLoggedUser(req, res));
ClientRouter.route('/editUser').post((req, res) => new client_controller_1.ClientController().editUser(req, res));
exports.default = ClientRouter;
//# sourceMappingURL=client.routes.js.map