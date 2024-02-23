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