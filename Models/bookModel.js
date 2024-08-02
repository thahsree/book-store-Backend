const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        publishedYear:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
);

const bookDetails = mongoose.model('Books',bookSchema);

module.exports = bookDetails;