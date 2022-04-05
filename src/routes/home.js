const { check } = require('express-validator');

const {Router}=require('express');
const router= Router()
const home= require('../controllers/home')
const {validarCampos , verifyToken}= require('../middlewares')


router.get('/',[
check('token', "The token").optional({ nullable: true }),
validarCampos,
verifyToken
], home.index  )


module.exports=router