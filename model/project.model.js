const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projectModel = new Schema({
    project_title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    language: {
        type: String,
        trim: true
    },
    tools: {
        type: String,
        trim: true
    },
    image: [String],

},{timestamps: true})

const Project = mongoose.model("project", projectModel) 
module.exports = Project