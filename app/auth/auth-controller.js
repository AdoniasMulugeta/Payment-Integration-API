

//importing third-party modules
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

//importing custom modules
const CONFIG = require('../../config');
const CONSTANTS = require('../../lib/constatnts');
const userDal = require('../user/user-dal');
const sendError = require('../../lib/res').error;

//middleware to handle user Login
exports.signIn  = async (request, response) => {
    const data = request.body;
    let user = await userDal.getUserWithPassword({email : data.email});
    if(!user) {
        sendError(response, {
            status:400,
            location: "internal",
            msg:"authentication failed",
            param:"email",
            value:data.email
        });
        return;
    }
    var passwordsMatch = await bcrypt.compare(data.password, user.password);

    if(!passwordsMatch){
        sendError(response, {
            status:400,
            location: null,
            msg:"authentication failed",
            param:null,
            value:null
        });
        return
    }

    const token = jwt.sign({_id: user._id}, CONFIG.JWT_SECRET,{expiresIn: 120*60*60 });//expires in 1 hour

    response.status(200).json({
        status : 200,
        type : "Success",
        data : {
            _id:   user._id,
            name:  user.name,
            email: user.email,
            role:  user.role,
            token: token,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    });
};

//middleware to handle user sign-up
exports.signUp = async (request, response) => {
    let data      = request.body;
    data.password = await bcrypt.hash(data.password, CONFIG.SALT_ROUNDS);
    const user    = await userDal.createUser(data);
    response.status(201).json({
        status: 201,
        type: "success",
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    });
};

//middleware to validate incoming token and attach the user id on the request object
exports.tokenValidator = async (request, response, next)=>{
    const token = request.headers['authorization'];
    if(!token){
        sendError(response, {
            status:400,
            location: "header",
            msg:"No authentication token found in header",
            param:"authorization",
            value:null
        });
        return;
    }
    try{
        const payload = await jwt.verify(token.split(' ')[1],CONFIG.JWT_SECRET);
        request._id  = request.params.id || payload._id;
        const user = await userDal.getUserById(request._id);
        if(!user){
            sendError(response, {
                status:404,
                location: "uri",
                msg  :"user not found",
                param:"id",
                value:request.id
            });
            return;
        }
        request.role = user.role;
        next();
    }
    catch(error) {
        sendError(response, {
            status:400,
            location: "internal",
            msg:error.message,
            param:"authorization",
            value:token
        });
    }
};

exports.userExists = async (request, response, next)=>{
    if(request.client_id){
        uid =  request.client_id;
        await userDal.getUserById(uid) ?  next() : sendError(response, {
            status:404,
            location: "url param",
            msg  :"user not found",
            param:"uid",
            value:request.client_id
        });
    }
    else {
        sendError(request, response);
    }

};
