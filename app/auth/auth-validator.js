//importing custom module
const userDal = require('../user/user-dal');

exports.signUp = (request, response, next) => {
    request.check('name')
        .exists().withMessage('name is required');

    request.check('email')
        .exists().withMessage("email is required")
        .isEmail().withMessage("email not valid")
        .custom(async email => {
            const user = await userDal.getUsers({email: email});
            if (user.length > 0) throw new Error('Email already registered');
            else return user;
        })
        .withMessage("An account already exists with this email");

    request.check('password')
        .exists().withMessage("password is required");

    request.check('role')
        .exists().withMessage("user role is required");
    checkErrors(request, response, next);
};

exports.signIn = (request, response, next)=> {
    request.check('email')
        .exists().withMessage("email is required")
        .isEmail().withMessage("invalid credentials");

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
