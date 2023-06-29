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
    requests: {
        type: Array
    },
    vacancyRequests: {
        type: Array
    },
    valid: {
        type: Boolean
    },
    invalid: {
        type: Array
    },
    profilePicture: {
        type: String
    }
});

export default mongoose.model('UserModel', User, 'korisnici');