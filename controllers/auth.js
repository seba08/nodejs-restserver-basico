const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res) => {

    const { correo, contrasena } = req.body

    try {

        //Validar si el correo existe en la bd
        const usuario = await User.findOne({ correo })
        if( !usuario){
            
            return res.status(400).json({
                msg: "El correo / contraseá no son correcto - Correo"
            })
        }
        //Validar que el usuario esté activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: "El correo / contraseá no son correcto - Estado: false"
            })  
        }
        //Validar que las contraseñas coinciden
        const validarContrasena = bcrypt.compareSync(contrasena, usuario.contrasena);
        
        if( !validarContrasena){
            return res.status(400).json({
                msg: "El correo / contraseá no son correcto - Contraseña"
            })
        }

        //Generar JWT

        const token  = await generarJWT( usuario.id)

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "Algo salió mal"
        })
    }


}


module.exports = {
    login
}