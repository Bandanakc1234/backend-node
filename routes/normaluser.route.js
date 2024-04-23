const { submitNormalUserDetails } = require("../controller/normaluser.controller")
const router = require("express").Router()

router.post("/submit_normaluserdetails", submitNormalUserDetails)

module.exports = router