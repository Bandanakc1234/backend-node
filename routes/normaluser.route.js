const { submitNormalUserDetails } = require("../controller/normaluser.controller")
const router = require("express").Router()

router.post("/submit_data", submitNormalUserDetails)

module.exports = router