var express = require("express");
var router = express.Router();
const specialtiesController = require("../src/controller/specialties.controller");

router.get("/", specialtiesController.getAllSpecialties);
router.post("/specialty", specialtiesController.addNewSpecialty);
router.put("/specialty/:id", specialtiesController.updateSpecialty);
router.delete("/specialty/:id", specialtiesController.deleteSpecialty);


module.exports = router;
