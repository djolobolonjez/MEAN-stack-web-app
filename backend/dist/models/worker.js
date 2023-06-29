"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Worker = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    specialization: {
        type: String
    },
    agency: {
        type: String
    }
});
exports.default = mongoose_1.default.model('WorkerModel', Worker, 'radnici');
//# sourceMappingURL=worker.js.map