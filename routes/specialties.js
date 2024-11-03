var express = require("express");
var router = express.Router();
const specialtiesController = require("../src/controller/specialties.controller");

router.get("/", specialtiesController.getAllSpecialties);


module.exports = router;
