const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../data/config');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'


        //Conectar a base de datos
        this.connectionDB()
        
        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Json
        this.app.use(express.json())
        this.app.set('json spaces', 2)

        //Carpeta pública
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Server is running on port: ${this.port}`))
    }
}

module.exports = Server;