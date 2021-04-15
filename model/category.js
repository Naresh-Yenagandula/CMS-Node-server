const mongoose = require('mongoose');
const { db } = require('./User');
const categoryScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
})
let model ={
    getCategories: (offset, limit,cb) => {
      categoryScheme.find({}).skip(offset).limit(limit);
    },
    getTotalCategories: ()=>{
        categoryScheme.find({}).count();
    }}

module.exports  = mongoose.model('categories',categoryScheme);