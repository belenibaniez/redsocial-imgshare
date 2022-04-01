require ('dotenv').config();
require('./database');
const Server = require('./servers/config');

const server= new Server();
server.listen()