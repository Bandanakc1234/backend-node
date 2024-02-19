const router = require("express").Router()
const { getProject, addProject } = require("../controller/project.controller")


router.post("/add_project", addProject)

router.get("/view_project", getProject)

module.exports = router