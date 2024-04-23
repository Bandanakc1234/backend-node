const NormalUser = require("./../model/normaluser.model")

//to add the user
exports.submitNormalUserDetails = async (req, res) => {
    try {
        let normalUserDetails = new NormalUser({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        const savedNormalUserDetails = await normalUserDetails.save();

        res.status(201).json({
            success: true,
            data: savedNormalUserDetails
        });
    }
    catch (error) {
        console.error("error in sending message:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}