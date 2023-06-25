"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const AgencyRouter = express_1.default.Router();
AgencyRouter.route('/getAllAgencies').get((req, res) => new agency_controller_1.AgencyController().getAllAgencies(req, res));
exports.default = AgencyRouter;
//# sourceMappingURL=agency.routes.js.map