import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        selected: false, //to not return password in response
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const User = mongoose.model('User', schema);

export default User;