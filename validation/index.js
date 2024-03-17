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

    check('job_description').optional({
        nullable: true
    })
    .isLength({ min: 10 }).withMessage(" job description must be at least 3 character"),

    check('qualification').optional({
        nullable: true
    })
        .isLength({ min: 10 }).withMessage("qualification must be at least 10 character"),

    check('posted_date').optional({
        nullable: true
    })
        .isDate().withMessage("posted date must be in date"),

    check('deadline').optional({
        nullable: true
    })
        .isDate().withMessage("deadline must be in date")
]

exports.projectCheck = [
    check('project_title', 'project title is required').notEmpty()
        .isLength({ min: 3 }).withMessage("project name must be at least 3 character"),

    check('category', 'category is  required').notEmpty(),

    check('language').notEmpty()
        .isLength({ min: 2 }).withMessage("language must be at least 2 character."),

    check('tools').notEmpty()
        .isLength({ min: 2 }).withMessage("tools must be at least 2 character.")

]

exports.userCheck = [
    check('first_name', 'Enter your first name').notEmpty(),

    check('last_name', 'Enter your last name.').notEmpty(),

    check('username', 'username is required').notEmpty()
        .matches(/^[a-zA-Z]/).withMessage("Username must start with alphabet.")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters."),

    check('email', 'Email is required').notEmpty()
        .isEmail().withMessage("Email format is incorrect."),

    check('password', 'Password is required').notEmpty()
        .matches(/[a-z]/).withMessage("Password must contain at least one Lowercase character.")
        .matches(/[A-Z]/).withMessage("Password must contain at least one Uppercase character.")
        .matches(/[0-9]/).withMessage("Password must contain at least one Number.")
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).withMessage("Password must contain at least one Special character.")
        .isLength({ min: 8 }).withMessage("Password must contain at least 8 characters"),

    check("confirm_password").notEmpty()
        .withMessage("Confirm password is required.")
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true;
            }
            return false;
        })
        .withMessage("Passwords do not match."),

    check('gender', 'Gender is required.').notEmpty(),

    check('age', 'Age is required').notEmpty()
        .matches(/^[0-9]{2}$/).withMessage("Age must be in number.")
        .not().matches(/[a-zA-z]/).withMessage("Alphabets are not allowed in age.")
        .not().matches(/[_\-\.@!#$%^&*/+]/).withMessage("Special character are not allowed in age"),

    check('phone_number', 'Phone number is required').notEmpty()
        .matches(/^9\d{9}$/).withMessage("Phone number must start with 9 and contain 10 digits."),

    check('permanent_address', 'Permanent address is required').notEmpty()

]
