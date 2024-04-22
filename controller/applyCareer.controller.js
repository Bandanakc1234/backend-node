const ApplyCareerDetails = require("./../model/applyCareerDetails.model")

//apply for career
exports.applyForCareer = async (req, res) => {
    console.log(req.body)
    try {
        if (!req.file) {
            return res.status(400).json({ error: "file is not found" })
        }
        let applyCareer = new ApplyCareerDetails({
            career: req.body.career,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            qualification: req.body.qualification,
            experience: req.body.experience,
            image: req.file.path,
            curriculum_vitae: req.file.path,
            reference: req.body.reference
        });

        const savedApplyCareer = await applyCareer.save();

        res.status(201).json({ success: true, data: savedApplyCareer });
    }
    catch (error) {
        console.error('Error applying for career:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

//to view applied applicants list
exports.getAppliedCareer = async (req, res) => {
    let appliedcareer = await ApplyCareerDetails.find()
    if (!appliedcareer) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.json(appliedcareer)
}

// view applied applicants list by career
exports.getAppliedCareerByCareer = async (req, res) => {
    let appliedcareer = await ApplyCareerDetails.find({ career: req.params.id })
    if (!appliedcareer) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.json(appliedcareer)
}

//delete applicants form
exports.deleteAppliedCareer = (req, res) => {
    ApplyCareerDetails.findByIdAndDelete(req.params.id)
        .then(appliedcareer => {
            if (!appliedcareer) {
                return res.status(400).json({ error: "there is no applied career" })
            }
            return res.status(200).json({ msg: "Applied Careeer deleted successfully" })
        })
        .catch(error => {
            return res.status(400).json({ error: error.message })
        })

}