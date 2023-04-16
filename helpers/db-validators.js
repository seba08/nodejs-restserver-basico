
const User = require('../models/user')
const Role = require('../models/role')

const esRoleValido = async (rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ) {
        throw new Error(`El rol ${ rol } no existe en la BD`);
    }
}


const correoExiste = async( correo = '' ) => {
    const existeCorreo = await User.findOne({ correo })
    if( existeCorreo ){
        throw new Error(`El correo ${ correo } ya está en uso`)
    }

}


const ExistById = async ( id ) => {
    const existe = await User.findById( id );

    if( !existe ) {
        throw new Error(`El id: ${ id } no existe...!`)
    }
}



module.exports = {
    esRoleValido,
    correoExiste,
    ExistById
}