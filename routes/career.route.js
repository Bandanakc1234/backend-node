const router = require("express").Router()
const { addCareer, updateCareer, deleteCareer, getCareer } = require("../controller/career.controller")
const { requireLogin } = require("../controller/user.controller")
// const { authentication } = require("../model/user.model")

router.post("/add_career", requireLogin, addCareer)

router.get("/view_career", getCareer)

router.put("/update_career/:id",requireLogin, updateCareer)

router.delete("/delete_career/:id",requireLogin, deleteCareer)

module.exports = router
