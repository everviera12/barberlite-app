var express = require('express');
var router = express.Router();
const usersController = require("../src/controller/users.controller");

router.get("/", usersController.getAllUsers);


module.exports = router;
