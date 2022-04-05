const {Router}=require('express');
const router= Router()
const {validarCampos}= require('../middlewares')

const auth= require('../controllers')
const {check}=require('express-validator');

router.get('/register',auth.uiregister)

router.post('/register',[
    check('email', 'No es un mail Valido').notEmpty().isEmail(),
    check('nick', 'No es un nick Valido').isLength({min:6}),
    validarCampos

],auth.register)

router.get('/login',auth.uilogin)

router.post('/login',[
    check('email', 'No es un email Valido').notEmpty().isEmail(),
    check('password', 'No es un nick Valido').isLength({min:6}),
    validarCampos

],auth.login)


router.get('/logout',auth.logout)



module.exports=router