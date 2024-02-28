const router = require("express").Router()
const { Register, verifyEmail, resendVerification, forgetPassword, resetPassword, getUserList, getUserDetails, updateUser, Login, Logout, DeleteUser, requireLogin } = require("../controller/user.controller")
const { userCheck, validate } = require("../validation")
// const { authentication } = require("../model/user.model")


router.post('/register',userCheck,validate, Register)
router.get(`/verifyEmail/:token`,verifyEmail)
router.post('/resendVerification', resendVerification)
router.post("/forgetpassword", forgetPassword)
router.post("/resetpassword/:token",userCheck,validate, resetPassword)
router.get("/userList",requireLogin, getUserList)
router.get("/userDetails/:id",requireLogin, getUserDetails)
router.put("/updateUser/:id",requireLogin, updateUser)
router.post("/login", Login)
router.get("/logout", Logout)
router.delete("/delete_user/:id",requireLogin, DeleteUser)

module.exports = router