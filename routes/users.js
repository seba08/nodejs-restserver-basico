const { Router } = require('express');

const router = Router();

const { getUsers, 
        postUsers, 
        putUsers, 
        deleteUsers } = require('../controllers/users');

const { esRoleValido, correoExiste, ExistById } = require('../helpers/db-validators');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/', getUsers);
router.post('/',
check('nombre', "El nombre es obligatorio").not().isEmpty(),
check('correo', "Este no es un correo válido").isEmail(),
check('correo').custom( correoExiste ),
check('contrasena', "La contraseña deber ser más de 6 caracteres").isLength({min: 6}),
//check('rol', "No es un Rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
check('rol').custom( esRoleValido),
validarCampos,
postUsers);
router.put('/:id', [
check('id', 'No es un ID de mongo válido'),
check('id').custom( ExistById ),
validarCampos
],
putUsers);
router.delete('/:id', [
check('id', 'No es un ID de mongo válido').isMongoId(),
check('id').custom( ExistById ),
validarCampos
], deleteUsers);

module.exports = router;