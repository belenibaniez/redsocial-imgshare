const express=require('express')
const cors = require('cors');
const logger  = require('morgan');
const multer= require('multer')
const  path = require('path');
const exphbs=require('express-handlebars');
const erroHandler=require('errorhandler')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

class Server{
    constructor (){
        this.app =express();
        this.homePath=''
        this.imagePath='/images'
        this.app.set('view engine','.hbs')
        this.app.set('views', path.join(__dirname, '../views'));

        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            extname:'.hbs',        
            helpers: require('./helpers'),
            handlebars: allowInsecurePrototypeAccess(Handlebars)

          }));



        this.port= process.env.PORT

     


        //Middlewares

        this.middlewares()

        //rutas de la app

        this.routes();
    }


    middlewares(){
        //directorio publico
        this.app.use(logger('dev'));
        this.app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('fileImage'));

        this.app.use(cors());
        this.app.use('/public',express.static(path.join(__dirname,'../public')));
        this.app.use(express.urlencoded({ extended: true })); //para recibir datos que vienen desde formularios
        this.app.use(express.json());

      
    }




    routes(){
        this.app.use( this.homePath, require('../routes/home'))
        this.app.use( this.imagePath, require('../routes/image'))

               


    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server on port 4000', this.port);
        });
    }



}

module.exports= Server
