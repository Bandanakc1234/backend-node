const { applyForCareer, getAppliedCareer, getAppliedCareerByCareer, deleteAppliedCareer } = require("../controller/applyCareer.controller")
const { requireLogin } = require("../controller/user.controller")
const pdfUpload = require("../utils/fileUpload")
const upload = require("../utils/fileUpload")
const { validate, applyCareerCheck } = require("../validation")
const router = require("express").Router()


router.post("/apply_career", upload.single("image"), pdfUpload.single("curriculum_vitae"), applyCareerCheck, validate, applyForCareer)

router.get("/view_appliedcareer",requireLogin, getAppliedCareer)

router.get("/view_appliedcareer/:id", requireLogin, getAppliedCareerByCareer)

// router.get("/view_careerdetailsbyid/:id", getCareerDetailsbyid)

// router.get("/view_careerdetailsbytitle", getCareerDetailsbytitle)

// router.put("/update_career/:id",requireLogin,careerCheck, validate, updateCareer)

router.delete("/delete_careerappliedcareer/:id",requireLogin, deleteAppliedCareer)

module.exports = router
