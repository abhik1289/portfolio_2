const mongoose = require("mongoose");

const socalMedia = mongoose.Schema({
    fburl:{
        type:String,
        require:true,
    },
    fbname:{
        type:String,
        require:true,
    },
    twurl:{
        type:String,
        require:true,
    },
    twname:{
        type:String,
        require:true,
    },
    inurl:{
        type:String,
        require:true,
    },
    inname:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    favicon:{
        type:String,
        require:true,
    },
    logo:{
        type:String,
        require:true,
    }
});

const socal = mongoose.model('socalMedia', socalMedia);
module.exports = socal;