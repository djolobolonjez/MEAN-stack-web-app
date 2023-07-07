"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Job = new Schema({
    id: {
        type: Number
    },
    clientID: {
        type: Number
    },
    objectID: {
        type: Number
    },
    agencyID: {
        type: Number
    },
    completionDate: {
        type: String
    },
    status: {
        type: String
    },
    price: {
        type: Number
    },
    roomOneWorkers: {
        type: Array
    },
    roomTwoWorkers: {
        type: Array
    },
    roomThreeWorkers: {
        type: Array
    },
    roomOneStatus: {
        type: String
    },
    roomTwoStatus: {
        type: String
    },
    roomThreeStatus: {
        type: String
    },
    pay: {
        type: Boolean
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('JobModel', Job, 'poslovi');
//# sourceMappingURL=job.js.map