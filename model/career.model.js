const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CareerModel = new Schema({
    career_title : {
        type: String,
        required: true,
        trim: true
    },
    vacancyNumber: {
        type: Number,
        // required: true,
        trim: true
    },
    offered_salary: {
        types: Number,
        // required: true,
        // trim: true
    },
    posted_date: {
        types: Date,
        // required: true,
        // trim: true
    },
    deadline: {
        types: Date,
        // required: true,
        // trim: true
    },

},{timestamps: true})

const Career = mongoose.model("Career", CareerModel)
module.exports = Career
