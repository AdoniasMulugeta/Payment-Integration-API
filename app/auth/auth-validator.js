//importing custom module
const { check, validationResult } = require('express-validator/check');

//importing custom module
const userDal = require('../user/user-dal');

exports.signUp = [
    check('name')
        .exists().withMessage('name is required'),

    check('email')
        .exists().withMessage("email is required")
        .isEmail().withMessage("email not valid")
        .custom(async email => !await userDal.getUsers({email: email}).length )
        .withMessage("An account already exists with this email"),

    check('password')
        .exists().withMessage("password is required"),

    check('role')
        .exists().withMessage("user role is required")
];

exports.logIn = [
    check('email')
        .exists().withMessage("email is required")
        .isEmail().withMessage("invalid credentials"),

    check('password')
        .exists().withMessage("password is required")
];

exports.errorHandler = (request, response, next)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.status(422).json({
            status : 422,
            type: "error",
            message: "authentication failed",
            errors: errors.array()
        });
    }
    else{
        next();
    }
};