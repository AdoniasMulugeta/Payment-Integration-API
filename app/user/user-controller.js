//import custom modules
const CONFIG = require("../../config");
const responseFormatter = require('../../lib/respond');
const userDal = require("./user-dal");
const bcrypt = require('bcryptjs');

exports.getRole = async id => {
    const user = await userDal.getUser(id);
    return user.role || CONFIG.DEFAULT_ROLE;
};

exports.getUser = async (request, response)=>{
    try{
        const user = await userDal.getUserById(request.params.id);
        sendSuccess(response, user)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getUsers = async (request, response)=>{
    try{
        const users = await userDal.getUsers(request.body);
        sendSuccess(response, users)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.updateUser = async (request, response)=>{
    try{
        if(request.body.password){
            request.body.password = await bcrypt.hash(request.body.password, CONFIG.SALT_ROUNDS);
        }
        const user = await userDal.updateUser(request.params.id, request.body);
        sendSuccess(response, user)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.removeUser = async (request, response)=>{
    try{
        const result = await userDal.removeUser(request.params.id);
        if(!result) throw new Error('No user found with id');
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
                type : "internal server error",
                msg : "failed to execute operation: "+error.msg,
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