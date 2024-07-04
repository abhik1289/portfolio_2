const mongoose = require('mongoose');

const request = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    conformed: {
        type: Boolean,
        required: true,
        default: "false",
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString(),
    },
  
    complete: {
        type: Boolean,
        required: true,
        default: "false",
    },
});

const order = mongoose.model('order', request);
module.exports = order;