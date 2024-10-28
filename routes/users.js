var express = require("express");
var router = express.Router();
const usersController = require("../src/controller/users.controller");

router.get("/", usersController.getAllUsers);
router.get("/user/:id", usersController.getAllUsersByID);
router.post("/user", usersController.addNewUser);

module.exports = router;
