// const ApplyCareer = require("./../model/applyCareer.model") 
const ApplyCareerDetails = require("./../model/applyCareerDetails.model")


//apply career
// exports.applyCareer  = async(req, res) =>{
//     let applycareer = await Promise.all(
//         req.body.applycareers.map(async applycareer =>{
//             let applyCareerToAdd = new ApplyCareerDetails
//         })
//     )
// }

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