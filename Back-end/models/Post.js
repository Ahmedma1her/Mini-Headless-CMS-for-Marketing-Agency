const mongoose = require('mongoose');
const postSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['draft','published'],
        default:'draft',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

 title:{
 type:String,
 required:true,
 },
 description:{
 type:String,
 required:true,
 },
 category:{
 type:String,
 required:true,
 },
 status:{
 type:String,
 enum:['draft','published'],
 default:'draft',
 },
 createdAt:{
 type:Date,
 default:Date.now,
 },

})
module.exports = mongoose.model('post',postSchema);
