const Project = require("./../model/project.model")


//to create new project
exports.addProject = async (req, res) => {
    let project = await Project.findOne({ project_title: req.body.project_title })
    if (project) {
        return res.status(400).json({ error: "project already exists" })
    }
    if (!req.file) {
        return res.status(400).json({ error: "file not selected" })
    }
    let projectToAdd = new Project({
        project_title: req.body.project_title,
        project_image: req.file.path,
        category: req.body.category,
        language: req.body.language,
        tools: req.body.tools
    })
    projectToAdd = await projectToAdd.save()
    if (!projectToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.send(projectToAdd)
}


//to view project
exports.getProject = async (req, res) => {
    let project = await Project.find().populate('category', 'category_title')
    if (!project) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.json(project)
}

//to get project list of particular category
exports.getProjectByCategory = async (req, res) => {
    let project = await Project.find({ category: req.params.id })
    if (!project) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(project)
}


//to get project details by id
exports.getProjectDetailsbyid = async (req, res) => {
    let project = await Project.findById(req.params.id).populate('category')
    if (!project) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(project)
}

//to get project details by title
exports.getProjectDetailsBytitle = async(req, res) =>{
    let project = await Project.findOne({project_title:req.body.project_title}).populate('category')
    if(!project){
        return res.status(400).json({error: "something went wrong"})
    }
    res.send(project)
}

//to get project details by language
exports.getProjectDetailsBylanguage = async(req, res) =>{
    let project = await Project.findOne({language:req.body.language}).populate('category')
    if(!project){
        return res.status(400).json({error: "something went wrong"})
    }
    res.send(project)
}

//to update project
exports.updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id,
        req.file ?
            {
                project_title: req.body.project_title,
                category: req.body.category,
                language: req.body.language,
                project_image: req.file.path,
                tools: req.body.tools
            } :
            {
                project_title: req.body.project_title,
                category: req.body.category,
                language: req.body.language,
                tools: req.body.tools
            },
        { new: true })
    if (!project) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    else {
        return res.status(400).json({ error: "project updated successfully" })
    }
}


//delete project
exports.deleteProject = (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(400).json({ error: "project not found" })
            }
            return res.status(200).json({ message: "project deleted successfully" })
        })
        .catch(error => {
            return res.status(400).json({ error: error.message })
        })
}