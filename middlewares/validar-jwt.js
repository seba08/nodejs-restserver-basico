const {request, response } = require('express');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

const validarJWT = async (req = request, res = response, next)=> {

    const token = req.header('x-token')

    if( !token) {
        res.status(401).json({
            msg: "No hay token en la petición"
        })
    }
    
    try {

        const { uid } =  jwt.verify(token, "llaveSecreta")

        //Leer el usuario por su uid
        const user = await User.findById(uid)

        //Validar si existe el usuario en la BD
        if( !user){
            return res.status(404).json({
                msg: "El usario no existe en la BD"
            })
        }

        //Validar que el usuario esté activo
        if( !user.estado ){
            return res.status(401).json({
                msg: "El usuario está inactivo"
            })
        }

        req.user =  user;
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}


module.exports = {
    validarJWT
}