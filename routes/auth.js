const express = require('express');
const userController = require('../controllers/auth');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/register', userController.register); 
router.post('/login', userController.login); 

module.exports = router;
