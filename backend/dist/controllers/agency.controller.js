"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AgencyController {
    constructor() {
        this.getAllAgencies = (req, res) => {
            let result = user_1.default.find({ 'type': "agency" }, (err, agencies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(agencies);
                }
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map