const mongoose = require('mongoose');



const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_CONN)
        console.log("Conexión exitosa...!")

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la BD');
    }
}

module.exports = {
    dbConnection
}