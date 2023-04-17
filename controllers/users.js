const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) =>{

    const { limite= 5, desde=0} = req.query;

    const query = {estado: true};

    /* const users = await User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await User.countDocuments(query);   */ 

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    res.json({
        total,
        users
    })
}
const postUsers = async (req, res) =>{

   
    const { nombre, correo, contrasena, rol } = req.body;

    const user = new User({nombre, correo, contrasena, rol})
    
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user.contrasena = bcrypt.hashSync(contrasena, salt )

    //Guardar user
    await user.save();
    
    res.json({
        msg: "User Added",
        user
    })
}
const putUsers = async (req, res) =>{
    const  { id } = req.params;
    const { __id, contrasena, google, correo, ...resto } = req.body;

    //Encriptar contraseña
    if( contrasena ) {
        const salt = bcrypt.genSaltSync(10);
        resto.contrasena = bcrypt.hashSync(contrasena, salt )
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: "Put Users",
        user
    })
}
const deleteUsers = async (req, res) =>{

    const { id } = req.params;
    
    //const user = await User.findByIdAndRemove(id)


    const user = await User.findByIdAndUpdate(id, { estado: false })
    res.json({
        msg: "Delete Users",
        user
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}