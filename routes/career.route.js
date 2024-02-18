const router = require("express").Router()
const { addCareer, updateCareer } = require("../controller/career.controller")

router.post("/addcareer", addCareer)

router.put("/update_career/:id", updateCareer)

module.exports = router
