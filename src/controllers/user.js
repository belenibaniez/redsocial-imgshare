
const path=require('path')
const utils= require('../helpers')
const fs=require('fs')
const md5= require('md5')
const {User}=require('../models')

const createUser = async(req,res)=>{
   const {...user}= req.body;

   const userFindByNick=await User.findOne({nick:user.nick})

   if (!userFindByNick){
    const userFindByMail=await User.findOne({mail:user.mail})
    if(!userFindByMail){

        const newUser=new User({
            nombre:user.nombre,
            apellido:user.apellido,
            nick:user.nick,
            email:user.email,
            password:user.password,
            perfil:user.perfil
            })

            await newUser.save()


    }else{
        res.status(401).json({success:false, error:'The email already register'})

    }



  
    
   }else
   {

    res.status(401).json({success:false, error:'The nick already exist'})

   }

  
  
}

const getUserById=(req,res)=>{

}
const getUsers=(req,res)=>{

}
const removeUserById=(req,res)=>{

}
const bannedUser=(req,res)=>{

}


module.exports={getUserById,createUser,getUsers,removeUserById,bannedUser}