"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controllers/client.controller");
const ClientRouter = express_1.default.Router();
ClientRouter.route('/editUser').post((req, res) => new client_controller_1.ClientController().editUser(req, res));
ClientRouter.route('/getAllObjects').get((req, res) => new client_controller_1.ClientController().getAllObjects(req, res));
ClientRouter.route('/addObject').post((req, res) => new client_controller_1.ClientController().addObject(req, res));
ClientRouter.route('/requestJob').post((req, res) => new client_controller_1.ClientController().requestJob(req, res));
ClientRouter.route('/getAllJobs').get((req, res) => new client_controller_1.ClientController().getAllJobs(req, res));
ClientRouter.route('/getObjectById').get((req, res) => new client_controller_1.ClientController().getObjectById(req, res));
ClientRouter.route('/acceptOffer').get((req, res) => new client_controller_1.ClientController().acceptOffer(req, res));
ClientRouter.route('/declineOffer').get((req, res) => new client_controller_1.ClientController().declineOffer(req, res));
ClientRouter.route('/payForJob').get((req, res) => new client_controller_1.ClientController().payForJob(req, res));
ClientRouter.route('/addComment').post((req, res) => new client_controller_1.ClientController().addComment(req, res));
ClientRouter.route('/addRating').post((req, res) => new client_controller_1.ClientController().addRating(req, res));
ClientRouter.route('/deleteComment').post((req, res) => new client_controller_1.ClientController().deleteComment(req, res));
exports.default = ClientRouter;
//# sourceMappingURL=client.routes.js.map