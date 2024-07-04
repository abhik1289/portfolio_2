const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        default:""
    },
    token: {
        type: String,
    },
    otp: {
        type: String,
        required:true
    },
    active: {
        type: String,
        default:"inactive"
    },
    block: {
        type: Boolean,
        default:false
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString(),
    },
    lastModify: {
        type: String,
        required: true,
        default: "No",
    },
});

const data = mongoose.model('user', user);
module.exports = data;