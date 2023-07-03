import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ObjectSchema = new Schema({
    id: {
        type: Number
    },
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

export default mongoose.model('ObjectModel', ObjectSchema, 'objekti');