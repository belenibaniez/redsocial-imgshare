
const  home  = require('../controllers/home');
const  image  = require('../controllers/image');
const  user  = require('../controllers/user');
const  auth  = require('../controllers/auth');


module.exports={
    ...home,
    ...image,
    ...user,
    ...auth
    }
