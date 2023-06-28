"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
const search_type_1 = require("../types/search.type");
class AgencyController {
    constructor() {
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({ 'type': "agency" }, (err, agencies) => {
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
                agency_1.default.find({ 'address': { $regex: address, $options: "i" } }, (err, users) => {
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
                agency_1.default.find({ 'agencyName': { $regex: name, $options: "i" } }, (err, users) => {
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
                agency_1.default.find({ 'agencyName': { $regex: name, $options: "i" },
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
        this.editUser = (req, res) => {
            let username = req.body.username;
            let agencyName = req.body.agencyName;
            let address = req.body.address;
            let email = req.body.email;
            let phone = req.body.phone;
            let description = req.body.description;
            let image = req.body.image;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'agencyName': agencyName,
                    'address': address,
                    'email': email,
                    'phone': phone,
                    'description': description,
                    'profilePicture': image } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map