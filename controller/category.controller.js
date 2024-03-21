const { findOne } = require("../model/project.model")
const Category = require("./../model/category.model")

exports.addCategory = async (req, res) =>{
    let category = await Category.findOne({ category_title: req.body.category_title})
    if(category) {
        return res.status(400).json({error: "category already exists" })
    }
    let categoryToAdd = new Category({
        category_title: req.body.category_title
    })
    categoryToAdd = await categoryToAdd.save()
    if(!categoryToAdd){
        return res.status(400).json({error: "something went wrong"})
    }
    return res.send(categoryToAdd)
}

//to view category
exports.getCategory = async (req, res) => {
    let category = await Category.find()
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.json(category)
}

//to view category details by id
exports.getCategoryDetailsbyid = async (req, res) =>{
    let category = await Category.findById(req.params.id)
    if (!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.json(category)
}


//to view category details by title
exports.getCategoryDetailsbytitle = async(req, res) =>{
    let category = await Category.findOne({category_title: req.body.category_title})
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.json(category)
}


//to update category
exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        category_title: req.body.category_title
    }, { new: true })
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    else {
        return res.status(200).json({ msg: "category updated successfully" })
    }
}


//delete category
// exports.deleteCategory = async (req, res) => {
//     const category = await Category.findByIdAndDelete(req.params.id)
//     if (!category) {
//         return res.status(400).json({ error: "category not found" })
//     }
//     else {
//         return res.status(400).json({ error: "category deleted successfully" })
//     }
// }



exports.deleteCategory = (req, res) =>{
    Category.findByIdAndDelete(req.params.id)
    .then(category =>{
        if(!category){
            return res.status(400).json
            ({error:"Category not found"})
        }
        res.status(200).json({msg:"categgory deleted successfully"})
    })
    .catch(error =>res.status(400).json({error: error.message}))
}
