//importing custom module
const CONFIG  = require('../../config');

exports.create = async (request, response, next) => {
    request.check('name')
        .exists().withMessage("name is required");
    checkErrors(request, response, next)
};

exports.update = async (request, response, next) => {
    request.check('name')
        .exists().withMessage("name is required");
    checkErrors(request, response, next)
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