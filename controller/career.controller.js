const Career = require("./../model/career.model")

//to add new career
exports.addCareer = async (req, res) => {
    let career = await Career.findOne({ career_title: req.body.career_title })
    if (career) {
        return res.status(400).json({ error: "career already exist" })
    }
    let careerToAdd = new Career({
        career_title: req.body.career_title,
        vacancyNumber: req.body.vacancyNumber,
        offered_salary: req.body.offered_salary,
        job_description: req.body.job_description,
        qualification: req.body.qualification,
        posted_date: req.body.posted_date,
        deadline: req.body.deadline
    })
    careerToAdd = await careerToAdd.save()
    if (!careerToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.send(careerToAdd)
}


//to view career
exports.getCareer = async (req, res) => {
    let career = await Career.find()
    if (!career) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.json(career)
}

//to view career details by id
exports.getCareerDetailsbyid = async(req, res) =>{
    let career = await Career.findById(req.params.id)
    if(!career){
        return res.status(400).json({error: "something went wrong"})
    }
    res.json(career)
}

//to view career details by title 
exports.getCareerDetailsbytitle = async(req, res) =>{
    let career = await Career.findOne({career_title: req.body.career_title})
    if(!career){
        return res.status(400).json({error: "something went wrong"})
    }
    res.json(career)
}


//to update career
exports.updateCareer = async (req, res) => {
    const career = await Career.findByIdAndUpdate(req.params.id, {
        career_title: req.body.career_title,
        vacancyNumber: req.body.vacancyNumber,
        offered_salary: req.body.offered_salary,
        job_description: req.body.job_description,
        qualification: req.body.qualification,
        posted_date: req.body.posted_date,
        deadline: req.body.deadline
    }, { new: true })
    if (!career) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    else {
        return res.status(400).json({ error: "career updated successfully" })
    }
}



//delete career
exports.deleteCareer = async (req, res) => {
    const career = await Career.findByIdAndDelete(req.params.id)
    if (!career) {
        return res.status(400).json({ error: "career not found" })
    }
    else {
        return res.status(400).json({ error: "career deleted successfully" })
    }
}

