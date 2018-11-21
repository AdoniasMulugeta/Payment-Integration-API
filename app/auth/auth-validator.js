//importing custom module
const userDal = require('../user/user-dal');

exports.signUp = (request, response, next) => {
    request.check('email')
        .exists().withMessage("email is required")
        .isEmail().withMessage("email not valid")
        .custom(async email => {
            const user = await userDal.getUsers({email: email});
            if (user.length > 0) throw new Error();
            else return user;
        })
        .withMessage("An account already exists with this email")
        .isLength({min: 3}).withMessage("email should be a minimum of 3 characters");

    request.check('password')
        .exists().withMessage("password is required")
        .isLength({min: 6}).withMessage("password should be a minimum of 6 characters");

    checkErrors(request, response, next);
};

exports.signIn = (request, response, next)=> {
    request.check('email')
        .exists().withMessage("email is required");

    request.check('password')
        .exists().withMessage("password is required");


    checkErrors(request, response, next);
};

async function checkErrors (request, response, next) {
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
}
