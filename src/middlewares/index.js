
const  validarCampos  = require('../middlewares/validar-campos');
const  validateToken  = require('../middlewares/validate-token');

module.exports={
    ...validarCampos,
    ...validateToken
  
}