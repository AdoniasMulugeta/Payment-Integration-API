//import custom modules
const CONFIG = require("../../config");
const clientDal = require('./client-dal');

exports.getClient = async (request, response)=>{
    try{
        const client = await clientDal.getClientById(request.params.id);
        sendSuccess(response, client)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getClients = async (request, response)=>{
    try{
        const clients = await clientDal.getClients(request.body);
        sendSuccess(response, clients)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.createClient = async (request, response)=>{
    try{
        const client = await clientDal.createClient(request.body);
        sendSuccess(response, client)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.updateClient = async (request, response)=>{
    try{
        const client = await clientDal.updateClient(request.params.id, request.body);
        sendSuccess(response, client)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.removeClient = async (request, response)=>{
    try{
        const result = await clientDal.removeClient(request.params.id);
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