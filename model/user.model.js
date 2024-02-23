const mongoose = require("mongoose")
// const uuidv1 = require("uuidv1")
const Schema = mongoose.Schema;
// const crypto = require("crypto")
const jwt = require("jsonwebtoken")


const UserModel = new Schema({
    username: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true,
    },
    // salt: String,
    gender: {
        type: String,
        // required: true,
        enum: ['male', 'female', 'others']
    },
    address: {
        tempAddress: [String],
        permanentAddress: {
            type: String,
            // required: true
        }
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


//authentication
exports.authentication = async (req, res) => {
        let token;
    
        if (req.headers['authorization']) {
            token = req.headers["authorization"];
        } else if (req.query.authorization) {
            token = req.query.authorization;
        }
    
        if (!token) {
            return res.status(400).json({ error: "Token not provided. Token verification failed. You don't have access."});
        }
    
        try {
            const user = jwt.verify(token, JWT_SECRET_KEY);
    
            // Find user by ID
            const foundUser = await user.findById(user._id);
    
            if (!foundUser) {
                return res.status(400).json({error: "User not found or user removed from the system"});
            }
            req.user = foundUser;
            next();
        } catch {
            return res.status(400).json({error: "Internal Server Error"});
        }
    };

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

module.exports = mongoose.model("User", UserModel)