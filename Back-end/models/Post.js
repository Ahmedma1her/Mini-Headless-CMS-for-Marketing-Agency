const mongoose = require('mongoose');
const schema= new mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 2359ced37a5bdc60b20352d1778ed98f07d213a5
})
module.exports = mongoose.model('post',schema);