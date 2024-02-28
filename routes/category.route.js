const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const { requireLogin } = require("../controller/user.controller")
const { categoryCheck, validate } = require("../validation")
const router = require("express").Router()


router.post("/add_category", requireLogin, categoryCheck,validate, addCategory)

router.get("/view_category", getCategory)

router.put("/update_category/:id", requireLogin, categoryCheck, validate, updateCategory)

router.delete("/delete_category/:id", requireLogin, deleteCategory)

module.exports = router