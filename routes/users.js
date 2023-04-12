const { Router } = require('express');

const router = Router();

const { getUsers, 
        postUsers, 
        putUsers, 
        deleteUsers } = require('../controllers/users')

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/:id', putUsers);
router.delete('/', deleteUsers);

module.exports = router;