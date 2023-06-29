"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Agency = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    agencyName: {
        type: String
    },
    address: {
        type: String
    },
    uniqueNumber: {
        type: String
    },
    description: {
        type: String
    },
    profilePicture: {
        type: String
    },
    valid: {
        type: Boolean
    },
    type: {
        type: String
    },
    workers: {
        type: Array
    },
    openVacancies: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('AgencyModel', Agency, 'agencije');
//# sourceMappingURL=agency.js.map