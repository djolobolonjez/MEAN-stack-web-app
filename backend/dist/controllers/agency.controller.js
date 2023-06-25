"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const user_1 = __importDefault(require("../models/user"));
const search_type_1 = require("../types/search.type");
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
        this.search = (req, res, searchType) => {
            if (searchType == search_type_1.SearchType.AddressSearch) {
                let address = req.query.param;
                user_1.default.find({ 'type': "agency", 'address': { $regex: address, $options: "i" } }, (err, users) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
            else if (searchType == search_type_1.SearchType.NameSearch) {
                let name = req.query.param;
                user_1.default.find({ 'type': "agency", 'agencyName': { $regex: name, $options: "i" } }, (err, users) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
            else {
                let name = req.query.name;
                let address = req.query.address;
                user_1.default.find({ 'type': "agency", 'agencyName': { $regex: name, $options: "i" },
                    'address': { $regex: address, $options: "i" } }, (err, users) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map