const mongoose = require('mongoose');
const { db } = require('./User');
const categoryScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
})


module.exports  = mongoose.model('categories',categoryScheme);