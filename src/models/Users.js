const mongoose=require('mongoose')
const path=require('path')
const { boolean } = require('webidl-conversions')
const { Schema , ObjectId}=mongoose

const UserSchema=new Schema({
    name:{type:String},
    lastname:{type:String},
    gravatar:{type:String},
    nick:{type:String},
    email:{type:String},
    password:{type:String},
    perfil:{type:String},
    states:{
        type:Boolean,
        default:true
    },
    images:[{type:ObjectId,
    ref:"Image" }]
   
})


module.exports=mongoose.model('User',UserSchema)