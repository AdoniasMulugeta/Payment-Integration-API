exports.error = (response, error)=>{
    //todo perform outgoing logs here
    if(!Array.isArray(error)) error = [error];
    response.json({
        status: response.status,
        type  : "error",
        errors: error
    })
};

exports.success = (response, data)=>{
    //todo perform outgoing logs here
    if(!Array.isArray(data)) data = [data];
    response.json({
        status: response.status,
        type  : "success",
        data: data
    })
};