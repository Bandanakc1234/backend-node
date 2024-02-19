const router = require("express").Router()
const { addCareer, updateCareer, deleteCareer, getCareer } = require("../controller/career.controller")

router.post("/add_career", addCareer)

router.get("/view_career", getCareer)

router.put("/update_career/:id", updateCareer)

router.delete("/delete_career/:id", deleteCareer)

module.exports = router
