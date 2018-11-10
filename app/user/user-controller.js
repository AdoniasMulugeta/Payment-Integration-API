const userDal = require("../user/user-dal");

exports.getUser = async (request, response)=>{
    const user = await userDal.getById(request.params.id).catch(error => {
        response.status(500).json({
            type : "error",
            status: 500,
            error  : [
                {
                    msg : error.message
                }
            ]
        })
    });
    response.json(user);
};

exports.getUsers = async (request, response)=>{

};

exports.createUsers = async (request, response)=>{


};

exports.updateUser = async (request, response)=>{

};

exports.removeUser = async (request, response)=>{

};