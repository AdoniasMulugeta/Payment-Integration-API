exports.error = (response, error)=>{
    response.status(error.status).json({
        status: error.status,
        type  : "error",
        errors: [
            {
                location : error.location,
                msg      : error.message || error.msg,
                param    : error.param,
                value    : error.value
            }
        ]
    })
};