const mongoose = require('mongoose');

const userSchema =  mongoose.Schema(
    {
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    },
    {
        timestamps:true
    }
    )

const userDetails = mongoose.model('User',userSchema)

module.exports = userDetails;