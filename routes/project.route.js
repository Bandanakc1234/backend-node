const router = require("express").Router()
const { getProject, addProject, updateProject, deleteProject, getProjectByCategory, getProjectDetailsBytitle, getProjectDetailsBylanguage, getProjectDetailsbyid } = require("../controller/project.controller")
const { requireLogin } = require("../controller/user.controller")
// const { upload } = require("../utils/fileUpload")
const { projectCheck, validate, projectCheckOptional } = require("../validation")
const upload = require('./../utils/fileUpload')

router.post("/add_project",upload.single("project_image"),requireLogin,projectCheck, validate, addProject)

router.get("/view_project", getProject)

router.get("/getproductbycategory/:id", getProjectByCategory)

router.get("/view_projectdetailsbyid/:id", getProjectDetailsbyid)

router.get("/view_projectdetailsbytitle", getProjectDetailsBytitle)

router.get("/view_projectdetailsbylanguage", getProjectDetailsBylanguage)

router.put("/update_project/:id",upload.single("project_image"),requireLogin,projectCheckOptional,validate, updateProject)

router.delete("/delete_project/:id",requireLogin, deleteProject)

module.exports = router