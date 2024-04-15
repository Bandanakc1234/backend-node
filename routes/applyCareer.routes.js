const { applyForCareer } = require("../controller/applyCareer.controller")
const upload = require("../utils/fileUpload")
const router = require("express").Router()



router.post("/apply_career", upload.single("image"), applyForCareer)

// router.get("/view_career", getCareer)

// router.get("/view_careerdetailsbyid/:id", getCareerDetailsbyid)

// router.get("/view_careerdetailsbytitle", getCareerDetailsbytitle)

// router.put("/update_career/:id",requireLogin,careerCheck, validate, updateCareer)

// router.delete("/delete_career/:id",requireLogin, deleteCareer)

module.exports = router
