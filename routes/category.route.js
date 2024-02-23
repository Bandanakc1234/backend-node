const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const { categoryCheck, validate } = require("../validation")
const router = require("express").Router()


router.post("/add_category",categoryCheck, validate, addCategory)

router.get("/view_category", getCategory)

router.put("/update_category/:id", updateCategory)

router.delete("/delete_category/:id", deleteCategory)

module.exports = router