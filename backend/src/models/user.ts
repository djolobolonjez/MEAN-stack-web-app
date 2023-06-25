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
    }
});

export default mongoose.model('UserModel', User, 'korisnici');