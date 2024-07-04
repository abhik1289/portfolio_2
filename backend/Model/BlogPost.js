const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    file:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    vissable: {
        type: Boolean,
        required: true,
        default:true
    },
    lock: {
        type: Boolean,
        required: false,
        default:false
    },
    date: {
        type: String,
        required: true,
        default:new Date().toLocaleDateString()
    },
    time: {
        type: String,
        required: true,
        default:new Date().toLocaleTimeString()
    },
    lastModify: {
        type: String,
        required: true,
        default:"no"
    },
});

const blogPost = mongoose.model('blogPost', blog);
module.exports = blogPost;