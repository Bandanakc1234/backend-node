const router = require("express").Router()
const { Register, verifyEmail, resendVerification, forgetPassword, resetPassword, getUserList, getUserDetails, updateUser, Login, Logout } = require("../controller/user.controller")


router.post('/register', Register)
router.get(`/verifyEmail/:token`,verifyEmail)
router.post('/resendVerification', resendVerification)
router.post("/forgetpassword", forgetPassword)
router.post("/resetpassword/:token", resetPassword)
router.get("/userList", getUserList)
router.get("/userDetails/:id", getUserDetails)
router.put("/updateUser/:id", updateUser)
router.post("/login", Login)
router.get("/logout", Logout)

module.exports = router