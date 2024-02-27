const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_title', 'category title is required').notEmpty()
    .isLength({min:3}).withMessage("Category name must be at least 3 characters")
]

exports.validate = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
} 

exports.projectCheck = [
    check('project_title', 'project title is required').notEmpty()
    .isLength({min:3}).withMessage("project name must be at least 3 character"),

    check('category', 'category is  required').notEmpty(),

    check('language').notEmpty()
    .isLength({min:2}).withMessage("language must be at least 2 character"),

    check('tools').notEmpty()
    .isLength({min:2}).withMessage("tools must be at least 2 character")

]