const router = require("express").Router()
const { getProject, addProject, updateProject, deleteProject, getProjectByCategory } = require("../controller/project.controller")
const upload = require('./../utils/fileUpload')



router.post("/add_project",upload.single("project_image"), addProject)

router.get("/view_project", getProject)

router.get("/getproductbycategory/:id", getProjectByCategory)

router.put("/update_project/:id",upload.single("project_image"), updateProject)

router.delete("/delete_project/:id", deleteProject)

module.exports = router