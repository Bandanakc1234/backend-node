const router = require("express").Router()
const { getProject, addProject, updateProject, deleteProject, getProjectByCategory } = require("../controller/project.controller")
const { requireLogin } = require("../controller/user.controller")
const { projectCheck, validate } = require("../validation")
const upload = require('./../utils/fileUpload')



router.post("/add_project",upload.single("project_image"),requireLogin,projectCheck, validate, addProject)

router.get("/view_project", getProject)

router.get("/getproductbycategory/:id", getProjectByCategory)

router.put("/update_project/:id",upload.single("project_image"),requireLogin, updateProject)

router.delete("/delete_project/:id",requireLogin, deleteProject)

module.exports = router