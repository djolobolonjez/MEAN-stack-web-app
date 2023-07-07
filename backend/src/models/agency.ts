import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    },
    comments: {
        type: Array
    }
});

export default mongoose.model('AgencyModel', Agency, 'agencije');