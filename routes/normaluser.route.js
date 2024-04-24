const { submitNormalUserDetails } = require("../controller/normaluser.controller")
const { normalUserCheck, validate } = require("../validation")
const router = require("express").Router()

router.post("/submit_normaluserdetails", submitNormalUserDetails)

module.exports = router