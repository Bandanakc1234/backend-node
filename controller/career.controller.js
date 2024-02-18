const Career = require("./../model/career.model")

//to add new career
exports.addCareer = async (req, res) => {
    let career = await Career.findOne({ career_title: req.body.career_title })
    if (career) {
        return res.status(400).json({ error: "career already exist" })
    }
    let careerToAdd = new Career({
        career_title: req.body.career_title
    })
    careerToAdd = await careerToAdd.save()
    if (!careerToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.send(careerToAdd)
}



//to edit new career
exports.updateCareer = async (req, res, next) => {
    const career = await Career.findByIdAndUpdate({career_title: req.body.career_title})
    if(!career){
        const career = new Career({
            career_title: req.body.career_title
        })
        await career.save()
        if(!career) {
            return next({
                msg: "something went wrong",
                status: 400
            })
        }
        res.json({
            msg: "career updated successfully",
            status: 400
        })
    }
    else{
        return next({
            msg: "career already saved",
            status: 400
        })
    }
}


//delete career
exports.deleteCareer = (req, res, next) =>{
    Career.findByIdAndDelete (req.params.id)
    .then(career =>{
        if(!career){
            return next({
                msg: "career not found",
                status: 400
            })
        }
        res.json({
            msg: "career deleted successfully",
            deleted_career : career
        })
    })
    .catch(err => next(err))
}

