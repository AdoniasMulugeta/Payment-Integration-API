//importing custom module
const CONFIG  = require('../../config');
const accountDal = require('./account-dal');

exports.createAccount = async (request, response, next) => {
    request.check('fi_id')
        .exists().withMessage("financial institution ID is required");

    checkErrors(request, response, next)
};


exports.checkAccountExists = (request, response, next) =>{
    request.check('account').custom( async account => {
        return !!(await accountDal.getAccount({name: account}));
    }).withMessage("account not found");
    checkErrors(request, response, next)
}

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
