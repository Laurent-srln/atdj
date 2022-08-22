const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//Auth routes
router.post('/register', authController.setPassword);
router.post('/forgotten-password', authController.getNewToken);
router.post('/login', authController.submitLogin);

//Users routes
router.post('/new-user', userController.addUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id(\\d+)', userController.getUserById);
router.put('/users/:id(\\d+)', userController.editUser);
router.delete('/users/:id(\\d+)', userController.deleteUser);



module.exports = router;