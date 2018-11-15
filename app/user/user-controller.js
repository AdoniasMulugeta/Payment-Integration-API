const userDal = require("../user/user-dal");

exports.getUser = async (request, response)=>{
    const user = await userDal.getUserById(request.params.id);
    user ? sendSuccess(response, user) : sendError(response, 404, "user with that id doesn't exist.")
};

exports.getUsers = async (request, response)=>{
    const users = await userDal.getUsers(request.body);
    sendSuccess(response, users)
};

exports.searchUsers = async  (request, response)=>{

};

exports.updateUser = async (request, response)=>{
    const user = await userDal.updateUser(request.params.id, request.body);
    user ? sendSuccess(response, user) : sendError(response, 404, "user with that id doesn't exist.")
};

exports.removeUser = async (request, response)=>{
    const result = await userDal.removeUser(request.params.id)
    result ? sendSuccess(response, result) : sendError(response, 500, "Failed to remove user");

};

//helper functions
function sendError(response, status, error) {
    response.status(status).json({
        type : "error",
        status: status,
        errors  : [
            {
                msg : error
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