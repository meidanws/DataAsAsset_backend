const mongoose = require('mongoose')

const LoginTemplate = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

 