"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
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
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    type: {
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
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'korisnici');
//# sourceMappingURL=user.js.map