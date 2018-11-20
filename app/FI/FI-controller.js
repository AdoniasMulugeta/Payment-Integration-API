//import custom modules
const CONFIG = require("../../config");
const FIDal = require('./FI-dal');

exports.getFI = async (request, response)=>{
    try{
        const FI = await FIDal.getFIById(request.params.id);
        sendSuccess(response, FI)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getFIs = async (request, response)=>{
    try{
        const FIs = await FIDal.getFIs(request.body);
        sendSuccess(response, FIs)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.createFI = async (request, response)=>{
    try{
        const FI = await FIDal.createFI(request.body);
        sendSuccess(response, FI)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.updateFI = async (request, response)=>{
    try{
        const FI = await FIDal.updateFI(request.params.id, request.body);
        sendSuccess(response, FI)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.removeFI = async (request, response)=>{
    try{
        const result = await FIDal.removeFI(request.params.id);
        sendSuccess(response, result)
    }
    catch(error){
        sendError(response, error)
    }
};


//helper functions
function sendError(response, error) {
    response.status(500).json({
        type : "error",
        status: 500,
        errors  : [
            {
                type : "Internal Error",
                msg : "failed to execute operation:"+error.message,
            }
        ]
    })
}
function sendSuccess(response, data) {
    if(!Array.isArray(data)) data = [data];
    response.status(200).json({
        type: "success",
        status: 200,
        data:data
    })
}