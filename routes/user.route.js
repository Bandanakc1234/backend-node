const router = require("express").Router()
const { Register, verifyEmail, resendVerification, forgetPassword, resetPassword, getUserList, getUserDetails, updateUser, Login, Logout, DeleteUser, requireLogin } = require("../controller/user.controller")
const upload = require("../utils/fileUpload")
const { userCheck, validate, userCheckOptional } = require("../validation")
// const { authentication } = require("../model/user.model")


router.post('/register', upload.single('image'), userCheck, validate, Register)
router.get(`/verifyEmail/:token`, verifyEmail)
router.post('/resendVerification', resendVerification)
router.post("/forgetpassword", forgetPassword)
router.post("/resetpassword/:token", userCheck, validate, resetPassword)
router.get("/userList", getUserList)
router.get("/userDetails/:id", requireLogin, getUserDetails)
router.put("/updateUser/:id", upload.single("image"), requireLogin, userCheckOptional, validate, updateUser)
router.post("/login", Login)
router.get("/logout", Logout)
router.delete("/delete_user/:id", requireLogin, DeleteUser)

module.exports = router