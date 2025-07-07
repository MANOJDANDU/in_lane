const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const authController = require("../controller/authentication");
const sessionValidator = require("../helpers/sessionValidator");

router.post('/add', 
    sessionValidator.validateAdminSession,
    authController.addAdmin
);

router.post('/login', 
    authController.adminLogin
);

router.get('/user/list',
    sessionValidator.validateAdminSession,
    adminController.userList
);

router.patch('/user/update/status/:id',
    sessionValidator.validateAdminSession,
    adminController.changeUserStatus
);

module.exports = router;