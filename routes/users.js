const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); */

const {
        validarCampos, validarJWT, tieneRole
} = require('../middlewares')

const { esRoleValido, correoExiste, ExistById } = require('../helpers/db-validators');
const { getUsers, 
        postUsers, 
        putUsers, 
        deleteUsers } = require('../controllers/users');



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
validarJWT,
//esAdminRole,
tieneRole("ADMIN_ROLE", "USER_ROLE"),
check('id', 'No es un ID de mongo válido').isMongoId(),
check('id').custom( ExistById ),
validarCampos
], deleteUsers);

module.exports = router;