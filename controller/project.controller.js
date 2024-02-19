const Project = require("./../model/project.model")


//to create new project
exports.addProject = async (req, res) => {
    let project = await Project.findOne({ project_title: req.body.project_title })
    if (project) {
        return res.status(400).json({ error: "project already exists" })
    }
    //category.categoery_name = req.body.category_name
    let projectToAdd = new Project({
        title: req.body.title
    })
    projectToAdd = await projectToAdd.save()
    if (!projectToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.send(projectToAdd)
}


//to update project
exports.getProject = async (req, res) => {
    let project = await Project.find()
    if (!project) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.json(project)
}