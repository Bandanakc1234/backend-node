const mongoose = require("mongoose")
// const uuidv1 = require("uuidv1")
const Schema = mongoose.Schema;
// const crypto = require("crypto")
// const jwt = require("jsonwebtoken")


const UserModel = new Schema({
    firstname:{
        type: String,
        // required: true,
        trim: true
    },
    lastname:{
        type: String,
        // required: true,
        trim: true
    },
    username: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    confirmpassword: {
        type: String,
        // required: true
    },
    // salt: String,
    gender: {
        type: String,
        // required: true,
        enum: ['male', 'female', 'others']
    },
    age:{
        type: Number,
        // require: true
    },
    phonenumber:{
        type: Number,
        // require: true
    },
    address: {
        tempAddress: [String],
        permanentAddress: {
            type: String,
            // required: true
        }
    },
    position: String,
    image: String,
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number, //0-normal user, 1-admin user, 2-super admin user
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", UserModel)




// //vertual field
// UserModel.virtual('password')
//     .set(function (password) {
//         this._password = password
//         this.salt = uuidv1()
//         this.hashed_password = this.encryptPassword(this._password)
//     })
//     .get(function () {
//         return this._password
//     })


// //method
// UserModel.methods = {
//     encryptPassword: function (password) {
//         if (password == "") {
//             return ""
//         }
//         try {
//             return this.hashed_password = crypto.createHmac('sha256', this.salt).update(password).digest('hex')
//         }
//         catch {
//             return ""
//         }
//     },
// authenticate: function(password){
//     return this.password === this.encryptPassword(password)
// }
// }

