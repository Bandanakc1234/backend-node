const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoryModel = new Schema({
    category_title: {
        type: String,
        required: true,
        trim: true
    },
    icon:{
        type: String,
        // required:true,
        // trim:true
    },
    description:{
        type:String,
        // required: true,
        // trim: true
    }
}, {timestamps: true})

const Category = mongoose.model("Category", categoryModel)
module.exports = Category