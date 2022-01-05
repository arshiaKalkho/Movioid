const mongoose = require('mongoose');
let MovieSchema = new mongoose.Schema({
    genres:[
        {
            genre:String
        }
    ],
    title:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    },
    rating:  {
        rating: Number,
        required: true
    },
    comments:[{
        rating:Number,
        comment:String,
        likes:Number
    }]
})
let UserSchema = new mongoose.Schema({
    usrename:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})