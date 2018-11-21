//importing custom module
const { check, validationResult } = require('express-validator/check');

//importing custom module
const CONFIG  = require('../../config');
const userDal = require('../user/user-dal');

//todo: make password validation more thorough, password should include [number(s), char(s), symbol(s) and have length >= 8]
exports.update = async (request, response, next) => {
    if(request.body.name !== undefined) {
        request.check('name')
            .isLength({min: 1, max: 50})
            .withMessage("name should be min 1 character and max 50 characters")
    }

    if(request.body.email !== undefined){
        request.check('email')
            .isEmail().withMessage("email not valid")
            .custom(async email => {
                const user = await userDal.getUsers({email: email});
                if (user.length > 0) throw new Error();
                else return user;
            })
            .withMessage("An account already exists with this email");
    }
    if(request.body.password !== undefined) {
        request.check('password')
            .exists().withMessage("password is required")
            .isLength({min: 6}).withMessage("password should be a minimum of 6 characters");
    }
    if(request.body.role) {
        request.check('role')
            .custom(role => {
                if (CONFIG.ROLES.includes(role)) {
                    return role
                }
                return false;
            }).withMessage(`role must be from one of these (${CONFIG.ROLES})`);
    }
    errorHandler(request, response, next)
};

async function errorHandler (request, response, next) {
    const errors = await request.getValidationResult();
    if(!errors.isEmpty()){
        response.status(400).json({
            status : 400,
            type: "error",
            errors: errors.array()
        });
    }
    else{
        next();
    }
};