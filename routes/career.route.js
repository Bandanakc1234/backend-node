const router = require("express").Router()
const { addCareer, updateCareer, deleteCareer, getCareer, getCareerDetailsbyid, getCareerDetailsbytitle, } = require("../controller/career.controller")
const { requireLogin } = require("../controller/user.controller")
const { careerCheck, validate } = require("../validation")

router.post("/add_career", requireLogin, careerCheck, validate, addCareer)

router.get("/view_career", getCareer)

router.get("/view_careerdetailsbyid/:id", getCareerDetailsbyid)

router.get("/view_careerdetailsbytitle", getCareerDetailsbytitle)

router.put("/update_career/:id",requireLogin,careerCheck, validate, updateCareer)

router.delete("/delete_career/:id",requireLogin, deleteCareer)

module.exports = router
