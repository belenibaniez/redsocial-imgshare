const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (token){
        try {
            const verified = jwt.verify(token, process.env.SECRET_KEY)
            req.user = verified
            next() 
        } catch (error) {
            res.status(400).json({error: 'token no es válido'})
        }

    }
    else{
        next()
    }
    
}

module.exports = {verifyToken};