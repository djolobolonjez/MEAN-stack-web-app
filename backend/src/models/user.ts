import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    },
    profilePicture: {
        type: String
    },
    requests: {
        type: Array
    },
    valid: {
        type: Boolean
    }
});

export default mongoose.model('UserModel', User, 'korisnici');