const userDal = require("../user/user-dal");

exports.getUser = async (request, response)=>{
    const user = await userDal.getUserById(request.params.id);
    sendSuccess(response, user)
};

exports.getUsers = async (request, response)=>{
    const users = await userDal.getUsers(request.body);
    sendSuccess(response, users)
};

exports.searchUsers = async  (request, response)=>{

};

exports.createUsers = async (request, response)=>{


};

exports.updateUser = async (request, response)=>{
    const user = await userDal.updateUser(request.body)
    sendSuccess(response, user)
};

exports.removeUser = async (request, response)=>{

};

//helper functions
function sendError(response, error, custom_err) {
    response.status(500).json({
        type : "error",
        status: 500,
        error  : [
            {
                msg : custom_err || error.message
            }
        ]
    })
}
function sendSuccess(response, data) {
    response.status(200).json({
      type: "success",
      status: 200,
      data:data
    })
}