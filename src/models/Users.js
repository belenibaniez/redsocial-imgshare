const mongoose=require('mongoose')
const path=require('path')
const { boolean } = require('webidl-conversions')
const { Schema , ObjectId}=mongoose

const UserSchema=new Schema({
    nombre:{type:String},
    apellido:{type:String},
    nick:{type:String},
    email:{type:String},
    pasword:{type:String},
    perfil:{type:String},
    images:[{type:ObjectId,
    ref:"Image" }],
    state:{
        type:boolean,
        default:true
    }
})


module.exports=mongoose.model('User',UserSchema)