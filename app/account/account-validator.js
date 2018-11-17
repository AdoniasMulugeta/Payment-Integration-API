//importing custom module
const CONFIG  = require('../../config');
const accountDal = require('./account-dal');

exports.createAccount = async (request, response, next) => {
    request.check('name')
        .exists().withMessage("name is required");
    checkErrors()
};


exports.checkAccount = (request, response, next) => {
    request.ckeck('account').custom( async account => {
        return !!(await accountDal.getAccount({name: account}));
    });
    checkErrors()
};

async function checkErrors (request) {
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
