import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
})

export default mongoose.model('WorkerModel', Worker, 'radnici');