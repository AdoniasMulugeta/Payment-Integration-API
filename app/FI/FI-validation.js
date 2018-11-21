
exports.create = async (request, response, next) => {
    request.check('name')
        .exists().withMessage("name is required")
        .isLength({min: 1, max: 50})
        .withMessage("name should be a min of 1 character and a max of 50 characters");

    request.check('api')
        .exists().withMessage("api uri is required")
        .isLength({min: 5}).withMessage("api uri should be min of 5 characters")
        // .isDataURI().withMessage("api uri is not valid url");


    checkErrors(request, response, next)
};

exports.update = async (request, response, next) => {
    if(request.body.name !== undefined) {
        request.check('name')
            .isLength({min: 1, max: 50})
            .withMessage("name should be min 1 character and max 50 characters")
    }

    if(request.body.api !== undefined){
        request.check('api')
            .isLength({min: 5})
            .withMessage("api uri should be min of 5 characters")
            // .isURL().withMessage("api uri is not valid url")
    }

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