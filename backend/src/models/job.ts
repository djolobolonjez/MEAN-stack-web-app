import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model('JobModel', Job, 'poslovi');