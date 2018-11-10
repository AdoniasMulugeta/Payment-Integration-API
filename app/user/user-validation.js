

//check for validation errors
exports.errorHandler = (request, response, next)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.status(422).json({
            type: "Error",
            errors:{
                body: errors.array()
            }
        });
    }
    else{
        next();
    }
};
