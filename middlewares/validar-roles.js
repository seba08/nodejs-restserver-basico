const { request, response } = require("express");



const esAdminRole = (req = request, res= response, next) => {

    if( !req.user ){
        return res.status(500).json({
            msg: "Se quiere validar el Role antes de validar el JWT"
        })
    }

    const { rol, nombre } = req.user;

    if(rol !== "ADMIN_ROLE"){

        return res.status(401).json({
            msg: `El ${nombre} no es administrador - No puede eliminar`
        })
    }
 
    next();
}


const tieneRole = ( ...roles ) => {

    return (req, res, next) =>{

        if( !req.user ){
            return res.status(500).json({
                msg: "Se quiere validar el Role antes de validar el JWT"
            })
        }

        if( !roles.includes(req.user.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos Role: ${ roles }`
            })
        }
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}



