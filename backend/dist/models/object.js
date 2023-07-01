"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ObjectSchema = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    numberOfRooms: {
        type: Number
    },
    size: {
        type: Number
    },
    owner: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ObjectModel', ObjectSchema, 'objekti');
//# sourceMappingURL=object.js.map