const  { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})



userSchema.methods.toJSON = function () {
    const { __v, contrasena, ...user } = this.toObject();
    return user;
}


module.exports = model('user', userSchema)