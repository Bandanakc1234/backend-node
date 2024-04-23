const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema

const applyCareerDetailsModel = new Schema({
    career:{
        type: ObjectId,
        ref: "Career",
        required: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        // required:true,
        // trim:true
    },
    email:{
        type:String,
        // required: true,
        // trim: true
    },
    phone_number:{
        type: String,
        // required: true
    },
    qualification:{
        type: String,
        // required: true
    },
    experience:{
        type: String,
        // required: true
    },
    // curriculum_vitae: String,
    image: String,
    reference:{
        type: String,
        // required: true
    },
    status:{
        type:String,
        default:"pending",
        required:true
    }
}, {timestamps: true})

const ApplyCareerDetails = mongoose.model("ApplyCareer", applyCareerDetailsModel)
module.exports = ApplyCareerDetails