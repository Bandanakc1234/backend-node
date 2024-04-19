const User = require("./../model/user.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Token = require("./../model/token.model")
const crypto = require("crypto");
const sendEmail = require("../utils/set.email");
const jwt = require("jsonwebtoken")
const { expressjwt } = require("express-jwt")

const createToken = (user) => {
    var token = jwt.sign({
        username: user.username,
        _id: user._id,
        role: user.role
    }, process.env.JWT_SECRET_KEY)
    return token;
}

UserInformation = (user, reqData) => {
    if (reqData.first_name) {
        user.firstname = reqData.first_name
    }
    if (reqData.last_name) {
        user.lastname = reqData.last_name
    }
    if (reqData.username) {
        user.username = reqData.username
    }
    if (reqData.email) {
        user.email = reqData.email
    }
    if (reqData.password) {
        user.password = reqData.password
    }
    if (reqData.confirm_password) {
        user.confirmpassword = reqData.confirm_password
    }
    if (reqData.gender) {
        user.gender = reqData.gender
    }
    if (reqData.age) {
        user.age = reqData.age
    }
    if (reqData.phone_number) {
        user.phonenumber = reqData.phone_number
    }
    user.address = {}
    if (reqData.temporary_address) {
        user.address.tempAddress = reqData.temporary_address.split(",")
    }
    if (reqData.permanent_address) {
        user.address.permanentAddress = reqData.permanent_address
    }
    if (reqData.position) {
        user.position = reqData.position
    }
    if (reqData.image) {
        user.image = reqData.image
    }
    if (reqData.about) {
        user.about = reqData.about
    }
    if (reqData.role) {
        user.role = reqData.role
    }
    if (reqData.isVerified) {
        user.isVerified = reqData.isVerified
    }
}

//user register
exports.Register = async (req, res) => {
    //checked if email already registered
    const email = req.body.email;
    const user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json({ error: "Email already exists." })
    }
    //for file
    if (!req.file) {
        return res.status(400).json({ error: "File not Selected." })
    }
    let newUser = new User({
        image: req.file.path,
    })
    //created unique password
    UserInformation(newUser, req.body)
    let salt = await bcrypt.genSalt(saltRounds)
    newUser.password = await bcrypt.hash(req.body.password, salt)
    //added user to the database
    newUser = await newUser.save()
    if (!newUser) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    // Generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: newUser._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "fail to generate token." })
    }
    // send token in email
    const url = `${process.env.FRONTEND_URL}/verifyEmail/${token.token}`
    sendEmail({
        from: "noreplay@something.com",
        to: newUser.email,
        subject: "Verification email",
        text: `Click on the following link or copy paste it in browser to verify your email. paste it in browser to verify your email.${url}`,
        html: `<a href="${url}"><button>Verify Email</button></a>`
    })
    res.send(newUser)
}

//to verify user
exports.verifyEmail = async (req, res) => {
    //check token
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may have expired." })
    }
    //find user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found." })
    }
    // check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified. Login to continue." })
    }
    //verify user
    user.isVerified = true
    user = await user.save();
    if (!user) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send({
        msg: "User Verified successfully."
    })
}

//to resend verification email
exports.resendVerification = async (req, res) => {
    //check if email is registered or not
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    //check if already verified 
    if (user.isVerified) {
        return res.status(400).json({ error: "Email/User already verfied" })
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString(`hex`),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something Went Wrong." })
    }
    // send token in email
    const url = `http://localhost:8000/api/user/verifyEmail/${token.token}`
    sendEmail({
        from: "noreplay@something.com",
        to: user.email,
        subject: "Verification email",
        text: `Click on the following link or copy paste it in browser to verify your email.${url}`,
        html: `<a href="${url}"><button>Verify Email</button></a>`
    })
    res.send({
        msg: "Verification link has been send to your email."
    })
}

//forget password
exports.forgetPassword = async (req, res) => {
    // check email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered." })
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString(`hex`),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    //send email
    const url = `http://localhost:8000/api/user/resetpassword/${token.token}`
    sendEmail({
        from: "noreplay@something.com",
        to: user.email,
        subject: "Password reset email",
        text: `Click on the link to reset password.${url}`,
        html: `<a href="${url}"><button>Reset password</button></a>`
    })
    return res.send({
        msg: "Password reset link has sent to your email."
    })
}

// to reset password
exports.resetPassword = async (req, res) => {
    //check token
    const token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may have expired" })
    }
    //find user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    user.password = req.body.password
    user.confirmpassword = req.body.confirm_password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send({
        msg: "Password reset successfully"
    })
}

// to get userList
exports.getUserList = async (req, res) => {
    let users = await User.find()
    if (!users) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(users)
}

// to get userList in client side
exports.getUserListClient = async(req,res) =>{
    let users = await User.find().select('firstname lastname position image')
    if (!users) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(users)
}

// to get user Details
exports.getUserDetails = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(user)
}

// update user
exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id,
        req.file ?
            {
                firstname: req.body.first_name,
                lastname: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                age: req.body.age,
                phonenumber: req.body.phone_number,
                position: req.body.position,
                tempAddress: req.body.temporary_address,
                permanentAddress: req.body.permanent_address,
                about: req.body.about,
                image: req.file.path

            } :
            {
                firstname: req.body.first_name,
                lastname: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                age: req.body.age,
                position: req.body.position,
                tempAddress: req.body.temporary_address,
                permanentAddress: req.body.permanent_address,
                about: req.body.about,
                phonenumber: req.body.phone_number
            },
        { new: true })
    if (!user) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    else {
        return res.status(400).json({ msg: "User updated Successfully" })
    }
}

//user Login
exports.Login = async (req, res) => {
    console.log(req.body)
    let { email, password } = req.body;
    // Check email
    let user = await User.findOne({
        $or: [
            { username: req.body.email },
            { email: req.body.email }
        ]
    });
    if (!user) {
        return res.status(400).json({ error: "Email not registered." });
    }
    if (!password) {
        return res.status(400).json({ error: "Please enter your password" })
    }
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(400).json({ error: "Email and password do not match" });
    }

    // Check if verified
    if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified." });
    }

    // Create login token
    let token = createToken({ user: user._id, role: user.role })

    // Set cookie
    res.cookie('myCookie', token, { expire: Date.now() + 86400 });

    // Return info to frontend
    let { _id, username, role, image } = user;
    res.status(200).json({ token, user: { _id, username, email, role, image } });
}

//logout
exports.Logout = async (req, res) => {
    await res.clearCookie("myCookie")
    res.send({ msg: "Signed out successfully" })
}

//delete user
exports.DeleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(400).json({ error: "user not found!!" })
            }
            return res.status(200).json({ message: "User deleted successfully" })
        })
        .catch(error => {
            return res.status(400).json({ error: error.message })
        })
}




//for authorizaion 
exports.requireLogin = expressjwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET_KEY
})