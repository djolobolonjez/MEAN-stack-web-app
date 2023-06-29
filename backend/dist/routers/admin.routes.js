"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const AdminRouter = express_1.default.Router();
AdminRouter.route('/login').post((req, res) => new admin_controller_1.AdminController().login(req, res));
AdminRouter.route('/getRegistrationRequests').get((req, res) => new admin_controller_1.AdminController().getRegistrationRequests(req, res));
AdminRouter.route('/allowRegistration').get((req, res) => new admin_controller_1.AdminController().allowRegistration(req, res));
AdminRouter.route('/denyRegistration').get((req, res) => new admin_controller_1.AdminController().denyRegistration(req, res));
AdminRouter.route('/acceptVacancyRequest').get((req, res) => new admin_controller_1.AdminController().acceptVacancyRequest(req, res));
AdminRouter.route('/deleteVacancyRequest').get((req, res) => new admin_controller_1.AdminController().deleteVacancyRequest(req, res));
AdminRouter.route('/getAllClients').get((req, res) => new admin_controller_1.AdminController().getAllClients(req, res));
exports.default = AdminRouter;
//# sourceMappingURL=admin.routes.js.map