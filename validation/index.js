const { check, validationResult } = require('express-validator')

exports.categoryCheck = [
    check('category_title', 'category title is required').notEmpty()
        .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters")
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
}

exports.projectCheck = [
    check('project_title', 'project title is required').notEmpty()
        .isLength({ min: 3 }).withMessage("project name must be at least 3 character"),

    check('category', 'category is  required').notEmpty(),

    check('language').optional({
        nullable: true
    })
        .isLength({ min: 2 }).withMessage("language must be at least 2 character"),

    check('tools').optional({
        nullable: true
    })
        .isLength({ min: 2 }).withMessage("tools must be at least 2 character")
]

exports.careerCheck = [
    check('career_title', 'career title is required').notEmpty()
        .isLength({ min: 3 }).withMessage("career name must be at least 3 character"),

    check('vacancyNumber').optional({
        nullable: true
    })
        .isNumeric().withMessage("vacancy number must be number"),

    check('offered_salary').optional({
        nullable: true
    })
        .isNumeric().withMessage("salary must be number"),

    check('posted_date').optional({
        nullable: true
    })
        .isDate().withMessage("posted date must be in date"),

    check('deadline').optional({
        nullable: true
    })
        .isDate().withMessage("deadline must be in date")
]