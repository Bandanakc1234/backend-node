const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema


const projectModel = new Schema({
    project_title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
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
    project_image: String,

}, { timestamps: true })

// const Project = mongoose.model("Project", projectModel)
// module.exports = Project
module.exports = mongoose.model("Project", projectModel)