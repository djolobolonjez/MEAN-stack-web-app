import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Worker = new Schema({
    id: {
        type: Number
    },
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
    },
    status: {
        type: String
    }
})

export default mongoose.model('WorkerModel', Worker, 'radnici');