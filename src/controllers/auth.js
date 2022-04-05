const path=require('path')
const utils= require('../helpers')
const md5= require('md5')
const {User}=require('../models')
const {jwt}=require('../helpers')

const bcrypt = require('bcrypt');

const uiregister=(req,res)=>{
    res.render('register')

}
const uilogin=(req,res)=>{
    res.render('login')

}
const logout=(req,res)=>{
    res.clearCookie("token");
    res.redirect('/')

}


const register= async (req,res)=>{
        const {...user}= req.body;


        const userFindByNick=await User.findOne({nick:user.nick})
        const userFindByEmail=await User.findOne({email:user.email})

        if (userFindByNick){
       
            res.status(401).json({success:false, error:'The nick already exist'})
     
        }
         
         if(userFindByEmail){
            res.status(401).json({success:false, error:'The email already register'})

         }
         const salt=await bcrypt.genSalt(10);
         const password = await bcrypt.hash(user.password, salt);

         try{
            const newUser=new User({
                name:user.name,
                lastname:user.lastname,
                nick:user.nick,
                email:user.email,
                password:password
                })
    
                await newUser.save()

                res.redirect('/')


         } catch(err){
             res.status(400).json(err)
         }

}



const login= async (req,res)=>{

    
    const {email, password }= req.body;

    const userFindByEmail=await User.findOne({email})

     if(!userFindByEmail){
        res.status(401).json({success:false, error:'The email no exist'})

     }
     const validPasword=  bcrypt.compareSync(password,userFindByEmail.password)

     if(!validPasword){
        return res.status(400).json({
            msg: ' Usuarios/password no son correctos- passwrod'
        })        

     }
     const token= await jwt.generarJWT( userFindByEmail.id );

     res.cookie("token", token);
     res.status(302).redirect('/')
     

}


module.exports={ uiregister,register, uilogin,login , logout}