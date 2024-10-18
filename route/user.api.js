const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginEmail);
module.exports = router;
